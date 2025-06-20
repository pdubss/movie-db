import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col h-screen w-screen">
      <nav className="p-2 h-14 bg-[rgb(17,17,17)] text-yellow-400">
        <Link to="/">home</Link>
        <Link to="/about">about me</Link>
      </nav>
      <div className="flex-1 bg-black p-2">
        <main className="mx-auto w-2/3 h-full">
          <Outlet />
        </main>
      </div>
      <footer className="p-2 bg-[rgb(17,17,17)] text-center text-white h-12">
        Hello my footer
      </footer>
      <TanStackRouterDevtools />
    </div>
  ),
});
