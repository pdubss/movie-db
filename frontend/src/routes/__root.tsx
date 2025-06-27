import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Logo from "../assets/tmdb_logo.svg";

import Header from "@/components/header";

export const Route = createRootRoute({
  component: () => {
    const queryClient = new QueryClient();
    return (
      <div className="flex flex-col h-screen w-screen">
        <QueryClientProvider client={queryClient}>
          <Header />
          <div className="flex-1 bg-black p-2 overflow-auto">
            <main className="mx-auto w-2/3 h-full">
              <Outlet />
            </main>
          </div>
        </QueryClientProvider>
        <footer className="gap-2 flex items-center bg-[rgb(17,17,17)] justify-center text-white h-12">
          <span>Powered By</span>
          <a href="https://www.themoviedb.org">
            <img src={Logo} className="h-3" />
          </a>
        </footer>
        <TanStackRouterDevtools />
      </div>
    );
  },
});
