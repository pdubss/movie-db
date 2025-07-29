import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

interface SlideUpMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function SlideUpMenu({ isOpen, onClose }: SlideUpMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed right-0 bottom-0 left-0 z-50 flex h-1/2 w-full flex-col items-center justify-around bg-black"
        >
          <Link className="font-semibold" to="/">
            HOME
          </Link>
          <Link className="font-semibold" to="/movies">
            MOVIES
          </Link>
          <Link className="font-semibold" to="/shows">
            SHOWS
          </Link>
          <Link className="font-semibold" to="/about">
            ABOUT
          </Link>
          <Link className="font-semibold" to="/watchlist">
            WATCHLIST
          </Link>
          <button className="font-semibold text-red-500" onClick={onClose}>
            CLOSE
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SlideUpMenu;
