import React from 'react'

// Spinner component
export function Spinner({ size = 'md', color = 'blue' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  const colorClasses = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    cyan: 'text-cyan-400',
    white: 'text-white'
  }

  return (
    <div className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}

// Full page loading
export function PageLoading({ message = 'Loading...' }) {
  return (
    <div className="min-h-screen app-bg flex items-center justify-center">
      <div className="text-center">
        <Spinner size="xl" color="blue" />
        <p className="text-muted mt-4 text-lg">{message}</p>
      </div>
    </div>
  )
}

// Inline loading for components
export function InlineLoading({ message = 'Loading...', size = 'md' }) {
  return (
    <div className="flex items-center justify-center gap-3 p-6 min-h-96">
      <Spinner size={size} color="blue" />
      <span className="text-muted">{message}</span>
    </div>
  )
}

// Card/section loading
export function CardLoading({ message = 'Loading...', className = '' }) {
  return (
    <div className={`bg-surface panel-border rounded-xl p-6 ${className}`}>
      <div className="flex items-center justify-center gap-3">
        <Spinner size="md" color="blue" />
        <span className="text-muted">{message}</span>
      </div>
    </div>
  )
}

// Button loading state
export function ButtonLoading({ size = 'sm' }) {
  return <Spinner size={size} color="white" />
}

// Default export for convenience
export default function Loading({ 
  type = 'inline', 
  message = 'Loading...', 
  size = 'md',
  className = '' 
}) {
  switch (type) {
    case 'page':
      return <PageLoading message={message} />
    case 'card':
      return <CardLoading message={message} className={className} />
    case 'button':
      return <ButtonLoading size={size} />
    case 'inline':
    default:
      return <InlineLoading message={message} size={size} />
  }
}
