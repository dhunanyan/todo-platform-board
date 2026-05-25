import { BoardData, Label, Ticket } from "@/types/ticket";
import { ENV } from "@/lib/env";

const STORAGE_KEY = "todo-board-data";

function defaultLabels(): Label[] {
  return [
    { id: "label-product", name: "Product", color: "#3b82f6" },
    { id: "label-design", name: "Design", color: "#a855f7" },
    { id: "label-bug", name: "Bug", color: "#ef4444" }
  ];
}

declare global {
  interface Window {
    electronAPI?: {
      loadBoardData: () => Promise<BoardData | Ticket[]>;
      saveBoardData: (data: BoardData) => Promise<void>;
    };
  }
}

function migrateLegacy(raw: unknown): BoardData {
  if (Array.isArray(raw)) {
    return {
      tickets: raw.map((item) => {
        const ticket = item as Record<string, unknown>;
        return {
          id: String(ticket.id ?? ""),
          title: String(ticket.title ?? ""),
          description: String(ticket.description ?? ""),
          labelId: null,
          status: String(ticket.status ?? "OPEN") as Ticket["status"],
          priority: 4
        };
      }),
      labels: defaultLabels()
    };
  }

  const data = raw as Partial<BoardData>;
  return {
    tickets: Array.isArray(data.tickets)
      ? data.tickets.map((t) => ({ ...t, priority: t.priority ?? 4, labelId: t.labelId ?? null }))
      : [],
    labels: Array.isArray(data.labels) && data.labels.length > 0 ? data.labels : defaultLabels()
  };
}

export async function loadBoardData(): Promise<BoardData> {
  if (typeof window === "undefined") return { tickets: [], labels: defaultLabels() };

  if (ENV.platform === "DESKTOP" && window.electronAPI) {
    const raw = await window.electronAPI.loadBoardData();
    return migrateLegacy(raw);
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { tickets: [], labels: defaultLabels() };

  try {
    return migrateLegacy(JSON.parse(raw));
  } catch {
    return { tickets: [], labels: defaultLabels() };
  }
}

export async function saveBoardData(data: BoardData): Promise<void> {
  if (typeof window === "undefined") return;

  if (ENV.platform === "DESKTOP" && window.electronAPI) {
    await window.electronAPI.saveBoardData(data);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
