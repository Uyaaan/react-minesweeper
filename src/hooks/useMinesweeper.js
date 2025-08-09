import { useCallback, useEffect, useRef, useState } from "react";
import { createEmptyBoard, placeMines } from "../utils/board.js";

export default function useMinesweeper({ rows, cols, mines }) {
  const [board, setBoard] = useState(() => createEmptyBoard(rows, cols));
  const [started, setStarted] = useState(false);
  const [alive, setAlive] = useState(true);
  const [won, setWon] = useState(false);
  const [flags, setFlags] = useState(0);
  const firstClickRef = useRef(true);

  const remainingMines = Math.max(0, mines - flags);
  const revealedCount = board.flat().filter((c) => c.isRevealed).length;
  const totalSafe = rows * cols - mines;

  useEffect(() => {
    if (alive && !won && revealedCount === totalSafe && started) {
      setWon(true);
      setAlive(false);
    }
  }, [alive, won, revealedCount, totalSafe, started]);

  const reset = useCallback(() => {
    setBoard(createEmptyBoard(rows, cols));
    setStarted(false);
    setAlive(true);
    setWon(false);
    setFlags(0);
    firstClickRef.current = true;
  }, [rows, cols]);

  const revealZerosBFS = useCallback((b, r, c, neighbors) => {
    const q = [[r, c]];
    while (q.length) {
      const [cr, cc] = q.shift();
      const cell = b[cr][cc];
      if (cell.isRevealed || cell.isFlagged) continue;
      cell.isRevealed = true;
      if (cell.adjacent === 0 && !cell.isMine) {
        neighbors(cr, cc).forEach(([nr, nc]) => {
          const n = b[nr][nc];
          if (!n.isRevealed && !n.isFlagged) q.push([nr, nc]);
        });
      }
    }
  }, []);

  const reveal = useCallback((r, c, neighbors) => {
    if (!alive || won) return;
    setBoard((prev) => {
      const b = prev.map((row) => row.map((cell) => ({ ...cell })));
      const cell = b[r][c];
      if (cell.isFlagged || cell.isRevealed) return prev;

      if (firstClickRef.current) {
        // ensure first-click safety
        placeMines(b, rows, cols, mines, r, c);
        firstClickRef.current = false;
        setStarted(true);
      }

      if (b[r][c].isMine) {
        // reveal all mines
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (b[i][j].isMine) b[i][j].isRevealed = true;
          }
        }
        setAlive(false);
        return b;
      }

      if (cell.adjacent === 0) revealZerosBFS(b, r, c, neighbors);
      else b[r][c].isRevealed = true;

      return b;
    });
  }, [alive, won, rows, cols, mines, revealZerosBFS]);

  const toggleFlag = useCallback((r, c) => {
    if (!alive || won) return;
    setBoard((prev) => {
      const b = prev.map((row) => row.map((cell) => ({ ...cell })));
      const cell = b[r][c];
      if (cell.isRevealed) return prev;
      const next = !cell.isFlagged;
      if (next && flags >= mines) return prev; // optional cap
      cell.isFlagged = next;
      setFlags((f) => f + (next ? 1 : -1));
      return b;
    });
  }, [alive, won, flags, mines]);

  return { board, reveal, toggleFlag, reset, alive, won, started, remainingMines };
}
