'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SketchFormData } from '@/types/sketch'
import { store } from '@/lib/store'

export default function SubmitPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<SketchFormData>({
    title: '',
    description: '',
    author: '',
    tags: [],
    file: null as unknown as File,
  })
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, we would upload the file to a server here
      const fileUrl = URL.createObjectURL(formData.file)
      
      store.addSketch({
        ...formData,
        fileUrl,
      })

      router.push('/sketches')
    } catch (error) {
      console.error('Error submitting sketch:', error)
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, file }))
    }
  }

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault()
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit a Sketch</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.title}
            onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.description}
            onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            Author Name
          </label>
          <input
            type="text"
            id="author"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.author}
            onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (Press Enter to add)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-primary text-white"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 hover:text-gray-200"
                  onClick={() => removeTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            Sketch File (.pde)
          </label>
          <input
            type="file"
            id="file"
            required
            accept=".pde"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Sketch'}
        </button>
      </form>
    </div>
  )
} 