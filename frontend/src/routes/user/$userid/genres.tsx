import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$userid/genres')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/$userid/genres"!</div>
}
