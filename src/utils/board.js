export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const range = (n) => Array.from({ length: n }, (_, i) => i);

export function createEmptyBoard(rows, cols) {
  return range(rows).map(() =>
    range(cols).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacent: 0,
    }))
  );
}

export function neighbors(rows, cols, r, c) {
  const out = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) out.push([nr, nc]);
    }
  }
  return out;
}

export function placeMines(board, rows, cols, mines, safeR, safeC) {
  // keep first click area safe (cell + neighbors)
  const forbidden = new Set(
    [[safeR, safeC], ...neighbors(rows, cols, safeR, safeC)].map(([r, c]) => `${r},${c}`)
  );
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    const key = `${r},${c}`;
    if (forbidden.has(key) || board[r][c].isMine) continue;
    board[r][c].isMine = true;
    placed++;
  }
  // adjacency counts
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      board[r][c].adjacent = neighbors(rows, cols, r, c)
        .filter(([nr, nc]) => board[nr][nc].isMine).length;
    }
  }
}
