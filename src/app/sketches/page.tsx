'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sketch, SketchStatus } from '@/types/sketch'
import { store } from '@/lib/store'

export default function SketchesPage() {
  const [statusFilter, setStatusFilter] = useState<SketchStatus | ''>('')
  const sketches = store.filterSketches(statusFilter || undefined)

  const getStatusColor = (status: SketchStatus) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Submitted Sketches</h1>
        <Link
          href="/submit"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Submit New Sketch
        </Link>
      </div>

      <div className="mb-6">
        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Status
        </label>
        <select
          id="status-filter"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as SketchStatus | '')}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sketches.map(sketch => (
          <div
            key={sketch.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{sketch.title}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  sketch.status
                )}`}
              >
                {sketch.status}
              </span>
            </div>

            <p className="text-gray-600 mb-4">{sketch.description}</p>

            <div className="space-y-2 text-sm text-gray-500">
              <p>Author: {sketch.author}</p>
              <p>Submitted: {new Date(sketch.submissionDate).toLocaleDateString()}</p>
              {sketch.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {sketch.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 rounded-md text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Link
                href={`/sketches/${sketch.id}`}
                className="px-3 py-1 text-sm text-primary hover:text-primary/80"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {sketches.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No sketches found.</p>
        </div>
      )}
    </div>
  )
} 