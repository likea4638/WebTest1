import React, { useState, useEffect } from 'react'
import Card from './Card'
import { hackerNewsAIData } from '../data/mockData'
import { fetchHackerNewsAI } from '../services/api'

function HackerNewsAI() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchHackerNewsAI()
      setPosts(data)
      setLastUpdate(new Date())
    } catch (err) {
      console.error('Failed to load Hacker News AI:', err)
      setError('加载失败，使用示例数据')
      setPosts(hackerNewsAIData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    
    // 每30分钟自动刷新一次
    const interval = setInterval(() => {
      loadData()
    }, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <Card 
      title="Hacker News · AI 板块" 
      lastUpdate={lastUpdate}
      onRefresh={loadData}
    >
      {loading ? (
        <div className="text-center py-8 text-slate-400">加载中...</div>
      ) : error ? (
        <div className="text-center py-4 text-yellow-400 text-sm">{error}</div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors border border-slate-600/30"
            >
              <h3 className="text-slate-100 font-medium mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-400 text-xs mb-2 line-clamp-2">
                {post.summary}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>▲ {post.points}</span>
                <span>💬 {post.comments}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </Card>
  )
}

export default HackerNewsAI
