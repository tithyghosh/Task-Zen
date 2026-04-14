import React from 'react';
import { FiChevronDown, FiSearch, FiX } from 'react-icons/fi';

const Search = ({ onSearch, onSortChange, resultCount, searchTerm, sortBy, totalCount }) => {
  return (
    <div className="mb-6 rounded-2xl border border-white/6 bg-black/20 p-4 backdrop-blur-xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-md">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Board controls</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {searchTerm
              ? `${resultCount} of ${totalCount} tasks match "${searchTerm}".`
              : 'Search titles, descriptions, and tags, then sort the list the way you work.'}
          </p>
        </div>

        <div className="grid w-full gap-3 md:grid-cols-[minmax(0,1fr)_200px] lg:max-w-3xl">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              className="h-12 w-full rounded-2xl border border-white/8 bg-[#0b1016] pl-11 pr-11 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-sky-400/30 focus:bg-[#0d121a]"
              placeholder="Search by title, description, or tag"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => onSearch('')}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 transition hover:bg-white/6 hover:text-white"
                aria-label="Clear search"
              >
                <FiX size={14} />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-white/8 bg-[#0b1016] px-4 pr-10 text-sm text-slate-200 outline-none transition focus:border-sky-400/30 focus:bg-[#0d121a]"
            >
              <option value="recent">Newest first</option>
              <option value="due">Due date</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">A to Z</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
