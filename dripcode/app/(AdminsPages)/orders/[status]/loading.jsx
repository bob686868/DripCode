import React from 'react'

const Loading = () => {
  return (
    <div className='min-h-screen bg-neutral-950 p-6'>
      
      {/* --- HEADER SKELETON (Matching Title & Stats Cards) --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          {/* Title Placeholder */}
          <div className="h-10 w-32 bg-neutral-900 rounded-lg animate-pulse mb-2"></div>
          {/* Subtitle Placeholder */}
          <div className="h-4 w-64 bg-neutral-900/50 rounded animate-pulse"></div>
        </div>

        {/* Stats Cards Placeholders */}
        <div className="flex gap-4">
          <div className="h-20 w-[160px] bg-neutral-900 border border-neutral-800 rounded-2xl animate-pulse"></div>
          <div className="h-20 w-[200px] bg-neutral-900 border border-neutral-800 rounded-2xl animate-pulse"></div>
        </div>
      </div>

      {/* --- CONTROLS SKELETON (Matching Nav Bar) --- */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 border-b border-neutral-800 pb-6">
        {/* Tab Bar Container */}
        <div className="h-11 w-[400px] bg-neutral-900 rounded-xl border border-neutral-800 animate-pulse"></div>
        {/* Results Info Placeholder */}
        <div className="h-4 w-40 bg-neutral-900/50 rounded animate-pulse"></div>
      </div>

      {/* --- DATA TABLE SKELETON --- */}
      <div className="bg-neutral-900/20 rounded-3xl border border-neutral-800 overflow-hidden p-1">
        {/* Header Row Placeholder */}
        <div className="h-14 w-full bg-neutral-900/50 mb-1 border-b border-neutral-800 animate-pulse"></div>
        
        {/* Row Placeholders */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className='h-16 w-full bg-neutral-900/30 mb-2 rounded-xl animate-pulse'
            style={{ opacity: 1 - (i * 0.1) }} // Subtle fade-out effect for the bottom rows
          ></div>
        ))}
      </div>

    </div>
  )
}

export default Loading