import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Logo from "../assets/tmdb_logo.svg";

import Header from "@/components/Header";
import MobileHeader from "@/components/ui/MobileHeader";
import useMediaQuery from "@/hooks/useMediaQuery";

export const Route = createRootRoute({
  component: () => {
    const queryClient = new QueryClient();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isMobile = useMediaQuery("(max-width:1280px)");
    return (
      <div className="flex h-screen w-screen flex-col text-white">
        <QueryClientProvider client={queryClient}>
          {isMobile ? <MobileHeader /> : <Header />}

          <div className="flex-1 bg-black">
            <main className="mx-auto h-full w-2/3 py-4">
              <Outlet />
            </main>
          </div>
        </QueryClientProvider>
        <footer className="flex h-12 shrink-0 items-center justify-center gap-2 bg-[rgb(17,17,17)] text-white">
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
