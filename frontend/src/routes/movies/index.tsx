import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-white">Hello "/movies/"!</div>;
}
