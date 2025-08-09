import React from "react";

export default function DifficultySelect({ value, onChange, options }) {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm text-zinc-500">Difficulty</span>
      <div className="flex rounded-xl p-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
        {Object.keys(options).map((k) => (
          <button
            key={k}
            onClick={() => onChange(k)}
            className={`px-3 py-1.5 rounded-lg text-sm transition ${
              value === k
                ? "bg-white dark:bg-zinc-700 shadow-sm"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-700/40"
            }`}
          >
            {k}
          </button>
        ))}
      </div>
    </div>
  );
}
