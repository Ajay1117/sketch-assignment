import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Processing Sketch Manager
        </h1>
        <p className="text-gray-600">
          A platform for managing and previewing community-submitted Processing sketches
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/submit"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-primary mb-2">Submit a Sketch</h2>
          <p className="text-gray-600">
            Upload your Processing sketch and share it with the community
          </p>
        </Link>

        <Link
          href="/sketches"
          className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h2 className="text-2xl font-semibold text-primary mb-2">View Sketches</h2>
          <p className="text-gray-600">
            Browse through submitted sketches and their details
          </p>
        </Link>
      </div>
    </div>
  )
}
