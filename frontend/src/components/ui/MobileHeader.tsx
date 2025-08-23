import { Link } from "@tanstack/react-router";
import { useState } from "react";
import SlideUpMenu from "./SlideUpMenu";
import useAuthStatus from "@/hooks/useAuthStatus";

function MobileHeader() {
  const { user, profile } = useAuthStatus();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="flex h-10 shrink-0 items-center justify-between bg-[#282828] px-4">
      <button
        onClick={() => setShowMenu((value) => !value)}
        className="cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {user && profile ? (
        <span className="capitalize">{`Welcome, ${profile.name}`}</span>
      ) : (
        <Link to="/login" className="cursor-pointer font-semibold">
          LOGIN
        </Link>
      )}

      {showMenu && (
        <SlideUpMenu isOpen={showMenu} onClose={() => setShowMenu(false)} />
      )}
    </div>
  );
}

export default MobileHeader;
