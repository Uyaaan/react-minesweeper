import React from "react";
import { Bomb, TimerReset, RotateCcw } from "lucide-react";
import DifficultySelect from "./DifficultySelect.jsx";

const HeaderStat = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 px-3 py-2 bg-white/70 dark:bg-zinc-800/70 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm">
    <Icon className="w-4 h-4" />
    <div className="text-xs text-zinc-500">{label}</div>
    <div className="font-semibold tabular-nums">{value}</div>
  </div>
);

export default function Header({ remainingMines, seconds, onReset, difficulty, setDifficulty, options }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Minesweeper</h1>
        <p className="text-sm text-zinc-500">Clean UI • Smooth animations • Keyboard & mobile friendly</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <HeaderStat icon={Bomb} label="Mines" value={remainingMines} />
        <HeaderStat icon={TimerReset} label="Time" value={`${seconds}s`} />
        <div className="flex items-center gap-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 hover:bg-white shadow-sm"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <DifficultySelect value={difficulty} onChange={setDifficulty} options={options} />
        </div>
      </div>
    </div>
  );
}
