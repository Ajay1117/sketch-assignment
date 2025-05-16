import SketchDetail from '@/components/SketchDetail'

type PageProps = {
  params: {
    id: string
  }
}

export default function SketchDetailPage({ params }: PageProps) {
  return <SketchDetail id={params.id} />
}
