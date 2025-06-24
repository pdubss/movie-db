import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Header from "@/components/header";

export const Route = createRootRoute({
  component: () => {
    const queryClient = new QueryClient();
    return (
      <div className="flex flex-col h-screen w-screen">
        <QueryClientProvider client={queryClient}>
          <Header />
          <div className="flex-1 bg-black p-2">
            <main className="mx-auto w-2/3 h-full">
              <Outlet />
            </main>
          </div>
        </QueryClientProvider>
        <footer className="p-2 bg-[rgb(17,17,17)] text-center text-white h-12">
          Hello my footer
        </footer>
        <TanStackRouterDevtools />
      </div>
    );
  },
});
