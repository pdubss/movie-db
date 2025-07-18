import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shows/genre/$genreId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/shows/genre/$genreId"!</div>
}
