import React, { useMemo, useState } from 'react'

function levenshtein(a, b){
  const m=a.length, n=b.length
  const dp=Array.from({length:m+1},()=>Array(n+1).fill(0))
  for(let i=0;i<=m;i++) dp[i][0]=i
  for(let j=0;j<=n;j++) dp[0][j]=j
  for(let i=1;i<=m;i++){
    for(let j=1;j<=n;j++){
      const cost=a[i-1]===b[j-1]?0:1
      dp[i][j]=Math.min(
        dp[i-1][j]+1,
        dp[i][j-1]+1,
        dp[i-1][j-1]+cost
      )
    }
  }
  return dp[m][n]
}

export default function StringSimilarity(){
  const [a,setA]=useState('kitten')
  const [b,setB]=useState('sitting')
  const dist=useMemo(()=>levenshtein(a,b),[a,b])
  const similarity=useMemo(()=>{
    const maxLen=Math.max(a.length,b.length) || 1
    return ((maxLen - dist)/maxLen).toFixed(3)
  },[a,b,dist])
  return (
    <div className="h-full p-6 text-var overflow-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="panel panel-border p-4 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold">String Similarity (Levenshtein)</h2>
          <input value={a} onChange={(e)=>setA(e.target.value)} className="w-full bg-surface panel-border rounded p-2 font-mono" />
          <input value={b} onChange={(e)=>setB(e.target.value)} className="w-full bg-surface panel-border rounded p-2 font-mono" />
        </div>
        <div className="panel panel-border p-4 rounded-xl">
          <div>Distance: <span className="font-mono">{dist}</span></div>
          <div>Similarity: <span className="font-mono">{similarity}</span></div>
        </div>
      </div>
    </div>
  )
}

