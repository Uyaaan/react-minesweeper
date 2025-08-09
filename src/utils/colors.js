export function adjacentColor(n) {
  const colors = {
    1: "text-blue-600",
    2: "text-green-600",
    3: "text-red-600",
    4: "text-indigo-600",
    5: "text-amber-600",
    6: "text-teal-600",
    7: "text-fuchsia-600",
    8: "text-slate-600",
  };
  return colors[n] || "";
}
