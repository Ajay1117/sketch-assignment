import { Sketch } from '@/types/sketch'

// Mock data for initial sketches
const mockSketches: Sketch[] = [
  {
    id: '1',
    title: 'Interactive Circle',
    description: 'A simple interactive circle that follows the mouse',
    author: 'John Doe',
    tags: ['interactive', 'basics'],
    status: 'approved',
    submissionDate: '2024-03-15T10:00:00Z',
    fileUrl: '/sketches/circle.pde',
  },
  {
    id: '2',
    title: 'Particle System',
    description: 'A beautiful particle system with physics',
    author: 'Jane Smith',
    tags: ['particles', 'physics', 'advanced'],
    status: 'pending',
    submissionDate: '2024-03-16T15:30:00Z',
    fileUrl: '/sketches/particles.pde',
  },
]

// In-memory store
let sketches = [...mockSketches]

export const store = {
  getSketches: () => sketches,
  
  getSketch: (id: string) => sketches.find(sketch => sketch.id === id),
  
  addSketch: (sketch: Omit<Sketch, 'id' | 'status' | 'submissionDate'>) => {
    const newSketch: Sketch = {
      ...sketch,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      submissionDate: new Date().toISOString(),
    }
    sketches.push(newSketch)
    return newSketch
  },
  
  updateSketchStatus: (id: string, status: Sketch['status'], moderationComment?: string) => {
    const sketch = sketches.find(s => s.id === id)
    if (sketch) {
      sketch.status = status
      if (moderationComment) {
        sketch.moderationComment = moderationComment
      }
    }
    return sketch
  },
  
  filterSketches: (status?: Sketch['status']) => {
    if (!status) return sketches
    return sketches.filter(sketch => sketch.status === status)
  },
} 