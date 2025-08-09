import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smile, Frown } from "lucide-react";

export default function StatusBanner({ won, alive, onRestart }) {
  return (
    <AnimatePresence>
      {(!alive || won) && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          className={`mb-4 rounded-2xl border p-3 sm:p-4 flex items-center gap-3 shadow-sm ${
            won
              ? "bg-green-50/80 border-green-200 text-green-800 dark:bg-green-900/30 dark:border-green-700 dark:text-green-100"
              : "bg-rose-50/80 border-rose-200 text-rose-800 dark:bg-rose-900/30 dark:border-rose-700 dark:text-rose-100"
          }`}
        >
          {won ? <Smile className="w-5 h-5" /> : <Frown className="w-5 h-5" />}
          <div className="font-medium">
            {won ? "You win! All safe cells revealed." : "Boom! You hit a mine. Try again."}
          </div>
          <div className="ml-auto">
            <button onClick={onRestart} className="px-3 py-1.5 rounded-lg border bg-white/70 dark:bg-zinc-800/70">
              Play again
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
