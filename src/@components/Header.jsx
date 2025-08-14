import React from 'react'
import { Sun, Moon, Github, Linkedin, Users, GitPullRequest } from 'lucide-react'
import { HOMEPAGE_CONFIG } from '../@config/homepage'

export default function Header({ theme, onToggleTheme, visitorCount }) {
  return (
    <header className="mb-12">
      {/* Stats and controls bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Left side - Visitor count and theme toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-surface/50 rounded-full border border-white/10">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-muted">Visitors:</span>
            <span className="text-sm font-semibold text-blue-400">
              {visitorCount.toLocaleString()}
            </span>
          </div>

          <button
            onClick={onToggleTheme}
            className="p-2.5 rounded-full bg-surface/50 border border-white/10 hover:border-white/30 hover:bg-surface transition-all duration-200"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-yellow-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-500" />
            )}
          </button>
        </div>

        {/* Right side - Created by and social links */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted">Created by {HOMEPAGE_CONFIG.USER.NAME}</span>
          <div className="flex items-center gap-3">
            <a
              href={HOMEPAGE_CONFIG.USER.GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface/30 hover:bg-surface border border-white/10 hover:border-white/30 transition-all duration-200 group"
              title="GitHub"
            >
              <Github className="w-4 h-4 text-muted group-hover:text-white" />
            </a>
            <a
              href={HOMEPAGE_CONFIG.USER.LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface/30 hover:bg-surface border border-white/10 hover:border-white/30 transition-all duration-200 group"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-muted group-hover:text-blue-400" />
            </a>
            <a
              href={`${HOMEPAGE_CONFIG.USER.GITHUB_URL}/axGaming/pulls`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-2 rounded-lg bg-surface/30 hover:bg-surface border border-white/10 hover:border-white/30 transition-all duration-200 group"
              title="Contribute"
            >
              <GitPullRequest className="w-4 h-4 text-muted group-hover:text-green-400" />
              <span className="text-sm text-muted group-hover:text-green-400"></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {HOMEPAGE_CONFIG.UI.TITLE}
          </span>
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Professional tools and utilities for developers and creators
        </p>
      </div>
    </header>
  )
}
