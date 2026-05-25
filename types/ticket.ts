export const STATUSES = [
  "OPEN",
  "BLOCKED",
  "IN_PROCESS",
  "WAITING_TO_BE_FINISHED",
  "DONE"
] as const;

export type TicketStatus = (typeof STATUSES)[number];

export const PRIORITIES = [1, 2, 3, 4, 5] as const;
export type TicketPriority = (typeof PRIORITIES)[number];

export type Label = {
  id: string;
  name: string;
  color: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  labelId: string | null;
  status: TicketStatus;
  priority: TicketPriority;
};

export type BoardData = {
  tickets: Ticket[];
  labels: Label[];
};
