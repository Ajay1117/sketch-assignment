export type SketchStatus = 'pending' | 'approved' | 'rejected'

export interface Sketch {
  id: string
  title: string
  description: string
  author: string
  tags: string[]
  status: SketchStatus
  submissionDate: string
  fileUrl: string
  moderationComment?: string
}

export interface SketchFormData {
  title: string
  description: string
  author: string
  tags: string[]
  file: File
} 