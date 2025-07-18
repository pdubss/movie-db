import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shows/$showId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/shows/$showId/"!</div>
}
