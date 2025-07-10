import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/movies/$movieId/videos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/movies/$movieId/videos"!</div>
}
