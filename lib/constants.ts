import { PRIORITIES, TicketPriority, TicketStatus } from "@/types/ticket";

export { PRIORITIES };

export const STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: "Open",
  BLOCKED: "Blocked",
  IN_PROCESS: "In Process",
  WAITING_TO_BE_FINISHED: "Waiting to be finished",
  DONE: "Done"
};

export const PRIORITY_META: Record<TicketPriority, { label: string; color: string }> = {
  1: { label: "Critical", color: "#ff5f7a" },
  2: { label: "High", color: "#ff8a5b" },
  3: { label: "Medium", color: "#ffcb4b" },
  4: { label: "Normal", color: "#66d2ff" },
  5: { label: "Low", color: "#5f8cff" }
};

export const LABEL_SHADE_GROUPS = [
  ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"],
  ["#f97316", "#ea580c", "#c2410c", "#9a3412", "#7c2d12"],
  ["#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12"],
  ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"],
  ["#14b8a6", "#0d9488", "#0f766e", "#115e59", "#134e4a"],
  ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"],
  ["#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87"]
] as const;
