import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bomb, Flag } from "lucide-react";
import { adjacentColor } from "../utils/colors.js";
import useLongPress from "../hooks/useLongPress.js";

export default function Cell({ cell, r, c, focused, onReveal, onFlag }) {
  const content = useMemo(() => {
    if (!cell.isRevealed) return null;
    if (cell.isMine) return <Bomb className="w-5 h-5" />;
    if (cell.adjacent === 0) return null;
    return <span className={`font-bold ${adjacentColor(cell.adjacent)}`}>{cell.adjacent}</span>;
  }, [cell]);

  const lpHandlers = useLongPress(
    () => onFlag(r, c),
    () => onReveal(r, c)
  );

  return (
    <motion.button
      aria-label={`Row ${r + 1} Column ${c + 1}`}
      className={`relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md border text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 ${
        cell.isRevealed
          ? "bg-white/90 dark:bg-zinc-800/90 border-zinc-200 dark:border-zinc-700"
          : "bg-zinc-100/80 dark:bg-zinc-900/60 border-zinc-300/70 dark:border-zinc-700 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/70"
      } ${focused ? "ring-2 ring-indigo-400" : ""}`}
      onContextMenu={(e) => {
        e.preventDefault();
        onFlag(r, c);
      }}
      onClick={() => onReveal(r, c)}
      {...lpHandlers}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence mode="popLayout">
        {!cell.isRevealed && cell.isFlagged && (
          <motion.div key="flag" initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 6, opacity: 0 }}>
            <Flag className="w-5 h-5" />
          </motion.div>
        )}
        {cell.isRevealed && <motion.div key="content" layout>{content}</motion.div>}
      </AnimatePresence>
    </motion.button>
  );
}
