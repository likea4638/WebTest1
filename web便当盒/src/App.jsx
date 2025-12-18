import React from 'react'
import GitHubTrending from './components/GitHubTrending'
import HackerNewsAI from './components/HackerNewsAI'

function App() {
  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">
            Web 便当盒
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            每日精选 · 极简阅读
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-2 lg:col-span-2">
            <GitHubTrending />
          </div>
          <div className="md:col-span-1">
            <HackerNewsAI />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
