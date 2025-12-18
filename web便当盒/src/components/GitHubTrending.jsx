import React, { useState, useEffect } from 'react'
import Card from './Card'
import { githubTrendingData } from '../data/mockData'
import { fetchGitHubTrending } from '../services/api'

function GitHubTrending() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchGitHubTrending()
      setRepos(data)
      setLastUpdate(new Date())
    } catch (err) {
      console.error('Failed to load GitHub trending:', err)
      setError('加载失败，使用示例数据')
      setRepos(githubTrendingData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    
    // 每小时自动刷新一次
    const interval = setInterval(() => {
      loadData()
    }, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <Card 
      title="GitHub 今日热榜" 
      lastUpdate={lastUpdate}
      onRefresh={loadData}
    >
      {loading ? (
        <div className="text-center py-8 text-slate-400">加载中...</div>
      ) : error ? (
        <div className="text-center py-4 text-yellow-400 text-sm">{error}</div>
      ) : (
        <div className="space-y-3">
          {repos.map((repo, index) => (
            <a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-600/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-slate-200">
                      #{index + 1}
                    </span>
                    <h3 className="text-slate-100 font-semibold truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-2 line-clamp-2">
                    {repo.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: repo.languageColor }}
                      ></span>
                      {repo.language}
                    </span>
                    <span>⭐ {repo.stars}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </Card>
  )
}

export default GitHubTrending
