import { motion, AnimatePresence } from "framer-motion";

interface OverlayProps {
  children: React.ReactNode;
  setOpenOverlay: (x: boolean) => void;
}

export default function Overlay({ children, setOpenOverlay }: OverlayProps) {
  return (
    <AnimatePresence>
      <motion.div
        onClick={() => setOpenOverlay(false)}
        className="fixed inset-0 z-10 flex h-full w-full items-center justify-center bg-black/75"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
          <button
            onClick={() => setOpenOverlay(false)}
            className="absolute top-2 right-2 cursor-pointer rounded-md border border-red-500 bg-black px-2 text-2xl text-red-500 hover:bg-[#282828]"
          >
            X
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
