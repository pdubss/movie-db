import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shows/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="text-white">Hello "/shows/"!</div>;
}
