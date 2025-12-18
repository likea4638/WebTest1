// GitHub Trending API (使用 GitHub Search API 获取热门仓库)
export async function fetchGitHubTrending() {
  try {
    // 使用 GitHub Search API 获取今日热门仓库
    const date = new Date()
    date.setDate(date.getDate() - 1)
    const since = date.toISOString().split('T')[0]
    
    const response = await fetch(
      `https://api.github.com/search/repositories?q=created:>${since}&sort=stars&order=desc&per_page=10`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub trending')
    }
    
    const data = await response.json()
    
    return data.items.map((repo, index) => ({
      id: repo.id,
      name: repo.full_name,
      description: repo.description || 'No description',
      language: repo.language || 'Unknown',
      languageColor: getLanguageColor(repo.language),
      stars: formatStars(repo.stargazers_count),
      url: repo.html_url
    }))
  } catch (error) {
    console.error('Error fetching GitHub trending:', error)
    throw error
  }
}

// Hacker News API - 获取 AI 相关热门帖子
export async function fetchHackerNewsAI() {
  try {
    // 获取热门帖子 ID
    const topStoriesResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
    if (!topStoriesResponse.ok) {
      throw new Error('Failed to fetch Hacker News stories')
    }
    
    const topStoryIds = await topStoriesResponse.json()
    const top20Ids = topStoryIds.slice(0, 20)
    
    // 获取帖子详情
    const storyPromises = top20Ids.map(id =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(res => res.json())
    )
    
    const stories = await Promise.all(storyPromises)
    
    // 过滤 AI 相关帖子（标题或 URL 包含 AI 关键词）
    const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'llm', 'gpt', 'neural', 'deep learning', 'openai', 'chatgpt']
    const aiStories = stories
      .filter(story => story && story.title && (
        aiKeywords.some(keyword => 
          story.title.toLowerCase().includes(keyword) ||
          (story.url && story.url.toLowerCase().includes(keyword))
        )
      ))
      .slice(0, 8)
      .map(story => ({
        id: story.id,
        title: story.title,
        summary: generateSummary(story.title, story.url),
        points: story.score || 0,
        comments: story.descendants || 0,
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`
      }))
    
    return aiStories
  } catch (error) {
    console.error('Error fetching Hacker News AI:', error)
    throw error
  }
}

// 辅助函数：格式化 Star 数
function formatStars(count) {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'k'
  }
  return count.toString()
}

// 辅助函数：获取语言颜色
function getLanguageColor(language) {
  const colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#2b7489',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C': '#555555',
    'CSS': '#563d7c',
    'HTML': '#e34c26',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Swift': '#fa7343',
    'Kotlin': '#A97BFF',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Shell': '#89e051',
    'Unknown': '#6e7681'
  }
  return colors[language] || colors['Unknown']
}

// 辅助函数：生成摘要（基于标题和 URL）
function generateSummary(title, url) {
  // 简单的摘要生成逻辑，实际可以使用 AI API 生成更好的摘要
  const keywords = title.toLowerCase()
  if (keywords.includes('gpt') || keywords.includes('llm')) {
    return 'Latest developments in large language models and AI technology.'
  }
  if (keywords.includes('machine learning') || keywords.includes('deep learning')) {
    return 'Insights and updates on machine learning research and applications.'
  }
  if (keywords.includes('openai') || keywords.includes('anthropic')) {
    return 'News and updates from leading AI research organizations.'
  }
  return 'AI-related discussion and insights from the tech community.'
}
