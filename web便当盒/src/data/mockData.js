// 模拟数据，用于 API 失败时的降级方案

export const githubTrendingData = [
  {
    id: 1,
    name: 'example/repo1',
    description: 'Example repository description',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '1.2k',
    url: 'https://github.com/example/repo1'
  },
  {
    id: 2,
    name: 'example/repo2',
    description: 'Another example repository',
    language: 'TypeScript',
    languageColor: '#2b7489',
    stars: '856',
    url: 'https://github.com/example/repo2'
  }
]

export const hackerNewsAIData = [
  {
    id: 1,
    title: 'Example AI Article',
    summary: 'AI-related discussion and insights from the tech community.',
    points: 123,
    comments: 45,
    url: 'https://news.ycombinator.com/item?id=1'
  },
  {
    id: 2,
    title: 'Another AI Topic',
    summary: 'Latest developments in large language models and AI technology.',
    points: 98,
    comments: 32,
    url: 'https://news.ycombinator.com/item?id=2'
  }
]
