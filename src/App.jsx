import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { DIFFICULTIES } from "./constants/difficulties.js";
import useTimer from "./hooks/useTimer.js";
import useMinesweeper from "./hooks/useMinesweeper.js";
import { clamp, neighbors } from "./utils/board.js";
import Header from "./components/Header.jsx";
import StatusBanner from "./components/StatusBanner.jsx";
import Cell from "./components/Cell.jsx";

export default function App() {
  const [difficulty, setDifficulty] = useState("Easy");
  const config = DIFFICULTIES[difficulty];
  const { board, reveal, toggleFlag, reset, alive, won, started, remainingMines } = useMinesweeper(config);
  const { seconds, reset: resetTimer } = useTimer(started && alive && !won);

  useEffect(() => { reset(); resetTimer(); }, [difficulty]);

  // keyboard nav
  const [focusPos, setFocusPos] = useState([0, 0]);
  const rows = config.rows, cols = config.cols;
  const onKeyDown = useCallback((e) => {
    const [r, c] = focusPos;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
    if (e.key === "ArrowUp") setFocusPos([clamp(r - 1, 0, rows - 1), c]);
    if (e.key === "ArrowDown") setFocusPos([clamp(r + 1, 0, rows - 1), c]);
    if (e.key === "ArrowLeft") setFocusPos([r, clamp(c - 1, 0, cols - 1)]);
    if (e.key === "ArrowRight") setFocusPos([r, clamp(c + 1, 0, cols - 1)]);
    if (e.key.toLowerCase() === "f") toggleFlag(r, c);
    if (e.key === " ") reveal(r, c, (rr, cc) => neighbors(rows, cols, rr, cc));
  }, [focusPos, rows, cols, toggleFlag, reveal]);

  const restart = () => { reset(); resetTimer(); };

  return (
    <div className="min-h-dvh w-full bg-gradient-to-br from-zinc-50 via-white to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl">
        <Header
          remainingMines={remainingMines}
          seconds={seconds}
          onReset={restart}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          options={DIFFICULTIES}
        />

        <StatusBanner won={won} alive={alive} onRestart={restart} />

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm shadow-lg p-3 sm:p-4"
             tabIndex={0} onKeyDown={onKeyDown}>
          <div className="grid justify-center"
               style={{ gridTemplateColumns: `repeat(${config.cols}, minmax(2rem, 2.25rem))` }}>
            {board.map((row, r) => (
              <React.Fragment key={r}>
                {row.map((cell, c) => (
                  <Cell
                    key={`${r}-${c}`}
                    cell={cell}
                    r={r}
                    c={c}
                    focused={focusPos[0] === r && focusPos[1] === c}
                    onReveal={(rr, cc) => reveal(rr, cc, (x, y) => neighbors(rows, cols, x, y))}
                    onFlag={toggleFlag}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs text-zinc-500 flex flex-wrap gap-3">
          <div>Click / tap: Reveal</div>
          <div>Right-click / long-press: Flag</div>
          <div>Arrows: Move • Space: Reveal • F: Flag</div>
        </div>
      </div>
    </div>
  );
}
