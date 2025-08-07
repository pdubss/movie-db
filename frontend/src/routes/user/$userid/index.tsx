import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/$userid/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/$userid/"!</div>
}
