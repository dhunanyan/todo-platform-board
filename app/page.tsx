"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TicketDetailsModal from "@/components/TicketDetailsModal";
import ConfirmModal from "@/components/ConfirmModal";
import TicketModal from "@/components/TicketModal";
import {
  AlertIcon,
  BlockIcon,
  BoardIcon,
  CheckIcon,
  ClockIcon,
  FlagIcon,
  PlusIcon,
  ProcessIcon,
  TrashIcon
} from "@/components/icons";
import { PRIORITY_META, STATUS_LABELS } from "@/lib/constants";
import { loadBoardData, saveBoardData } from "@/lib/storage";
import { Label, STATUSES, Ticket, TicketStatus } from "@/types/ticket";

type ColumnProps = {
  status: TicketStatus;
  tickets: Ticket[];
  labels: Label[];
  onTicketClick: (ticket: Ticket) => void;
  onClearDoneTickets: () => void;
};

function statusIcon(status: TicketStatus) {
  if (status === "OPEN") return <AlertIcon size={15} />;
  if (status === "BLOCKED") return <BlockIcon size={15} />;
  if (status === "IN_PROCESS") return <ProcessIcon size={15} />;
  if (status === "WAITING_TO_BE_FINISHED") return <ClockIcon size={15} />;
  return <CheckIcon size={15} />;
}

function SortableTicket({
  ticket,
  labels,
  onTicketClick,
  ghost = false
}: {
  ticket: Ticket;
  labels: Label[];
  onTicketClick: (ticket: Ticket) => void;
  ghost?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const label = labels.find((item) => item.id === ticket.labelId) || null;

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`ticket ${isDragging ? "dragging" : ""} ${ghost ? "ticket-ghost" : ""}`}
      {...attributes}
      {...listeners}
      onClick={() => onTicketClick(ticket)}
    >
      <TicketCardContent ticket={ticket} label={label} />
    </article>
  );
}

function TicketCardContent({ ticket, label }: { ticket: Ticket; label: Label | null }) {
  return (
    <>
      <div className="ticket-topline">
        <span className="ticket-id">#TASK-{ticket.id}</span>
        <span className="priority-badge">
          <FlagIcon size={12} style={{ color: PRIORITY_META[ticket.priority].color }} />
          {PRIORITY_META[ticket.priority].label}
        </span>
      </div>

      <h4 className="ticket-title">{ticket.title}</h4>
      <p className="ticket-desc">{ticket.description || "No description yet"}</p>

      <div className="ticket-meta">
        {label ? (
          <span className="ticket-label" style={{ borderColor: label.color }}>
            <span className="dot" style={{ backgroundColor: label.color }} />
            {label.name}
          </span>
        ) : (
          <span className="ticket-label muted">No label</span>
        )}
      </div>
    </>
  );
}

function Column({ status, tickets, labels, onTicketClick, onClearDoneTickets }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const isDoneColumn = status === "DONE";

  return (
    <section ref={setNodeRef} className={`column ${isOver ? "column-over" : ""}`} id={status}>
      <div className="column-header">
        <div className="column-title-wrap">
          {statusIcon(status)}
          <h3>{STATUS_LABELS[status]}</h3>
        </div>
        <div className="column-header-actions">
          <span className="column-count">{tickets.length}</span>
          {isDoneColumn && (
            <button
              type="button"
              className="icon-btn danger"
              onClick={onClearDoneTickets}
              title="Delete all done tickets"
              aria-label="Delete all done tickets"
            >
              <TrashIcon size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="column-content">
        <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tickets.map((ticket) => (
            <SortableTicket key={ticket.id} ticket={ticket} labels={labels} onTicketClick={onTicketClick} />
          ))}
        </SortableContext>
      </div>
    </section>
  );
}

export default function HomePage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [nextTicketId, setNextTicketId] = useState(1000);
  const [activeTicketId, setActiveTicketId] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      }
    })
  );

  useEffect(() => {
    loadBoardData().then((loaded) => {
      setTickets(loaded.tickets);
      setLabels(loaded.labels);

      const maxId = loaded.tickets.reduce((max, ticket) => {
        const current = Number(ticket.id);
        return Number.isNaN(current) ? max : Math.max(max, current);
      }, 999);

      setNextTicketId(maxId + 1);
    });
  }, []);

  useEffect(() => {
    saveBoardData({ tickets, labels });
  }, [tickets, labels]);

  const grouped = useMemo(() => {
    const map: Record<TicketStatus, Ticket[]> = {
      OPEN: [],
      BLOCKED: [],
      IN_PROCESS: [],
      WAITING_TO_BE_FINISHED: [],
      DONE: []
    };

    tickets.forEach((t) => map[t.status].push(t));
    return map;
  }, [tickets]);

  const activeTicket = useMemo(
    () => (activeTicketId ? tickets.find((t) => t.id === activeTicketId) ?? null : null),
    [activeTicketId, tickets]
  );

  const handleCreateLabel = (data: { name: string; color: string }) => {
    const newLabel: Label = {
      id: `label-${Date.now()}`,
      name: data.name,
      color: data.color
    };

    setLabels((prev) => [...prev, newLabel]);
    return newLabel.id;
  };

  const handleCreate = (data: {
    title: string;
    description: string;
    labelId: string | null;
    status: TicketStatus;
    priority: 1 | 2 | 3 | 4 | 5;
  }) => {
    setTickets((prev) => [...prev, { id: String(nextTicketId), ...data }]);
    setNextTicketId((prev) => prev + 1);
  };

  const handleUpdateTicket = (updatedTicket: Ticket) => {
    setTickets((prev) => prev.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket)));
    setSelectedTicket(updatedTicket);
  };

  const handleDeleteTicket = (ticketId: string) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
    setSelectedTicket(null);
  };

  const handleClearDoneTickets = () => {
    setTickets((prev) => prev.filter((ticket) => ticket.status !== "DONE"));
  };

  const requestDeleteTicket = (ticketId: string) => {
    setConfirmState({
      title: "Delete This Ticket?",
      message: "Are you sure you want to delete this ticket? This action cannot be undone.",
      onConfirm: () => {
        handleDeleteTicket(ticketId);
        setConfirmState(null);
      }
    });
  };

  const requestClearDoneTickets = () => {
    const doneCount = grouped.DONE.length;
    if (doneCount === 0) return;

    setConfirmState({
      title: "Delete All Done Tickets?",
      message: `Are you sure you want to delete ${doneCount} done ticket${doneCount === 1 ? "" : "s"}?`,
      onConfirm: () => {
        handleClearDoneTickets();
        setConfirmState(null);
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveTicketId(null);
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    const ticket = tickets.find((t) => t.id === activeId);
    if (!ticket) return;

    if ((STATUSES as readonly string[]).includes(overId)) {
      setTickets((prev) => prev.map((t) => (t.id === activeId ? { ...t, status: overId as TicketStatus } : t)));
      setActiveTicketId(null);
      return;
    }

    const targetTicket = tickets.find((t) => t.id === overId);
    if (!targetTicket) {
      setActiveTicketId(null);
      return;
    }

    setTickets((prev) =>
      prev.map((t) =>
        t.id === activeId
          ? {
              ...t,
              status: targetTicket.status
            }
          : t
      )
    );

    setActiveTicketId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTicketId(String(event.active.id));
  };

  const handleDragCancel = (_event: DragCancelEvent) => {
    setActiveTicketId(null);
  };

  const total = tickets.length;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <BoardIcon size={19} />
          <div>
            <h1>TaskFlow Board</h1>
            <p>Dark agile planner with desktop + web runtime</p>
          </div>
        </div>

        <div className="tab-strip" role="tablist" aria-label="Board stats">
          <button className="tab active" role="tab" aria-selected="true">All ({total})</button>
          <button className="tab" role="tab" aria-selected="false">Open ({grouped.OPEN.length})</button>
          <button className="tab" role="tab" aria-selected="false">Done ({grouped.DONE.length})</button>
        </div>

        <button className="btn btn-primary create-btn" onClick={() => setShowModal(true)}>
          <PlusIcon size={16} /> Create Ticket
        </button>
      </header>

      <main className="content-scroll">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragEnd={handleDragEnd}
        >
          <div className="board">
            {STATUSES.map((status) => (
              <Column
                key={status}
                status={status}
                tickets={grouped[status]}
                labels={labels}
                onTicketClick={setSelectedTicket}
                onClearDoneTickets={requestClearDoneTickets}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTicket ? (
              <div className="drag-overlay-wrap ticket ticket-ghost">
                <TicketCardContent
                  ticket={activeTicket}
                  label={labels.find((item) => item.id === activeTicket.labelId) || null}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      <footer className="footer">
        <a href="https://dhunanyan.com" target="_blank" rel="noreferrer">dhunanyan.com</a>
        <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://nextjs.org" target="_blank" rel="noreferrer">Next.js</a>
      </footer>

      {showModal && (
        <TicketModal
          labels={labels}
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
          onCreateLabel={handleCreateLabel}
        />
      )}

      {selectedTicket && (
        <TicketDetailsModal
          ticket={selectedTicket}
          labels={labels}
          onClose={() => setSelectedTicket(null)}
          onSave={handleUpdateTicket}
          onRequestDelete={requestDeleteTicket}
          onCreateLabel={handleCreateLabel}
        />
      )}

      {confirmState && (
        <ConfirmModal
          title={confirmState.title}
          message={confirmState.message}
          onCancel={() => setConfirmState(null)}
          onConfirm={confirmState.onConfirm}
        />
      )}
    </div>
  );
}
