'use client';

import React, { useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKey?: keyof T | ((item: T) => string);
  searchPlaceholder?: string;
  pageSize?: number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  toolbarActions?: React.ReactNode;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchKey,
  searchPlaceholder = 'Search records...',
  pageSize = 10,
  onRowClick,
  emptyMessage = 'No matching industrial records found',
  toolbarActions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Search filtering
  const filteredData = data.filter((item) => {
    if (!searchTerm) return true;
    if (typeof searchKey === 'function') {
      return searchKey(item).toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (searchKey) {
      const val = item[searchKey];
      return String(val ?? '').toLowerCase().includes(searchTerm.toLowerCase());
    }
    // Search across all string/number fields
    return Object.values(item).some((val) =>
      String(val ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (aVal === bVal) return 0;
    if (aVal == null) return 1;
    if (bVal == null) return -1;
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return sortAsc
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: string) => {
    if (sortField === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(key);
      setSortAsc(true);
    }
  };

  return (
    <div className="w-full bg-[#070e1e]/90 rounded-lg border border-slate-800/80 overflow-hidden shadow-xl">
      {/* Search & Actions Bar */}
      <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a1224]/70">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/90 text-slate-200 placeholder-slate-500 text-xs font-mono rounded border border-slate-800 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {toolbarActions}
          <div className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
            Showing {Math.min(sortedData.length, (currentPage - 1) * pageSize + 1)}-
            {Math.min(sortedData.length, currentPage * pageSize)} of {sortedData.length} records
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={`p-3.5 font-semibold tracking-wider ${
                    col.sortable
                      ? 'cursor-pointer hover:text-cyan-400 select-none'
                      : ''
                  } ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <ArrowUpDown className="w-3 h-3 text-slate-600 hover:text-cyan-400" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-slate-500 font-mono text-xs"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`transition-colors duration-150 ${
                    onRowClick
                      ? 'cursor-pointer hover:bg-cyan-950/20'
                      : 'hover:bg-slate-900/40'
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`p-3.5 text-slate-300 ${col.className || ''}`}
                    >
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="p-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono bg-[#0a1224]/50">
          <span className="text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2.5 py-1 rounded text-xs ${
                    currentPage === page
                      ? 'bg-cyan-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
