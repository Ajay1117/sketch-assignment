'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Sketch, SketchStatus } from '@/types/sketch'
import { store } from '@/lib/store'

export default function SketchDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const sketch = store.getSketch(params.id)
  const [moderationComment, setModerationComment] = useState(sketch?.moderationComment || '')
  const [isModerating, setIsModerating] = useState(false)

  if (!sketch) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sketch Not Found</h1>
          <Link href="/sketches" className="text-primary hover:text-primary/80">
            Back to Sketches
          </Link>
        </div>
      </div>
    )
  }

  const handleModeration = async (status: SketchStatus) => {
    setIsModerating(true)
    try {
      store.updateSketchStatus(sketch.id, status, moderationComment)
      router.push('/sketches')
    } catch (error) {
      console.error('Error moderating sketch:', error)
      setIsModerating(false)
    }
  }

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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{sketch.title}</h1>
          <Link
            href="/sketches"
            className="text-primary hover:text-primary/80"
          >
            Back to Sketches
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
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
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                sketch.status
              )}`}
            >
              {sketch.status}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-xl font-semibold mb-4">Moderation</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="moderation-comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Moderation Comment
                </label>
                <textarea
                  id="moderation-comment"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={moderationComment}
                  onChange={e => setModerationComment(e.target.value)}
                  placeholder="Add a comment about your decision..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleModeration('approved')}
                  disabled={isModerating || sketch.status === 'approved'}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleModeration('rejected')}
                  disabled={isModerating || sketch.status === 'rejected'}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 