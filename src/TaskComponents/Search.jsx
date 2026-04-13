import React, { useState } from 'react'

const Search = ({onSearch, searchTerm}) => {
	
  return (
    <div className="mb-4 flex justify-end">
      <div className="relative w-full md:max-w-md">
 
        {/* Search icon */}
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
 
        {/* Controlled input — value from parent, change reported to parent */}
        <input
          type="search"
          className="w-full rounded-xl border border-white/10 bg-[#1D212B] py-2.5 pl-10 pr-10 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20"
          placeholder="Search by title, tag or description…"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
 
        {/* Clear button — only visible when there is something to clear */}
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-white"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
 
      </div>
    </div>
  )
}

export default Search
