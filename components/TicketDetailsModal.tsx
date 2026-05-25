"use client";

import { FormEvent, useState } from "react";
import LabelCreateModal from "@/components/LabelCreateModal";
import CustomSelect from "@/components/CustomSelect";
import { CheckIcon, FlagIcon, LabelIcon, TrashIcon } from "@/components/icons";
import { PRIORITIES, PRIORITY_META, STATUS_LABELS } from "@/lib/constants";
import { Label, Ticket, TicketStatus } from "@/types/ticket";

type Props = {
  ticket: Ticket;
  labels: Label[];
  onClose: () => void;
  onSave: (ticket: Ticket) => void;
  onRequestDelete: (ticketId: string) => void;
  onCreateLabel: (data: { name: string; color: string }) => string;
};

export default function TicketDetailsModal({ ticket, labels, onClose, onSave, onRequestDelete, onCreateLabel }: Props) {
  const [title, setTitle] = useState(ticket.title);
  const [description, setDescription] = useState(ticket.description);
  const [labelId, setLabelId] = useState(ticket.labelId ?? "");
  const [status, setStatus] = useState<TicketStatus>(ticket.status);
  const [priority, setPriority] = useState(ticket.priority);
  const [showLabelModal, setShowLabelModal] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...ticket,
      title: title.trim(),
      description: description.trim(),
      labelId: labelId || null,
      status,
      priority
    });
    onClose();
  };

  const handleLabelChange = (value: string) => {
    if (value === "__create__") {
      setShowLabelModal(true);
      return;
    }
    setLabelId(value);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal animate-pop" onClick={(e) => e.stopPropagation()}>
          <h3 className="modal-title"><CheckIcon size={16} /> #TASK-{ticket.id}</h3>
          <form onSubmit={submit}>
            <label className="field-label">
              Title
              <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>

            <label className="field-label">
              Description
              <textarea className="form-control textarea-fixed" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
            </label>

            <CustomSelect
              label={<><LabelIcon size={14} /> Label</>}
              value={labelId}
              onChange={handleLabelChange}
              options={[
                {
                  value: "",
                  label: <span>No label</span>
                },
                ...labels.map((label) => ({
                  value: label.id,
                  label: (
                    <span className="option-with-dot">
                      <span className="dot" style={{ backgroundColor: label.color }} />
                      {label.name}
                    </span>
                  )
                })),
                {
                  value: "__create__",
                  label: <span>+ Create label</span>
                }
              ]}
            />

            <CustomSelect
              label="Status"
              value={status}
              onChange={(value) => setStatus(value as TicketStatus)}
              options={Object.entries(STATUS_LABELS).map(([value, label]) => ({
                value,
                label
              }))}
            />

            <div className="field-label"><FlagIcon size={14} /> Priority</div>

            <div className="priority-row">
              {PRIORITIES.map((level) => (
                <button
                  key={level}
                  type="button"
                  className={`priority-pill ${priority === level ? "active" : ""}`}
                  onClick={() => setPriority(level)}
                >
                  <span className="dot" style={{ backgroundColor: PRIORITY_META[level].color }} />
                  {PRIORITY_META[level].label}
                </button>
              ))}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onRequestDelete(ticket.id);
                  onClose();
                }}
              >
                <TrashIcon size={14} /> Delete
              </button>
              <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>

      {showLabelModal && (
        <LabelCreateModal
          onClose={() => setShowLabelModal(false)}
          onCreate={(data) => {
            const id = onCreateLabel(data);
            setLabelId(id);
          }}
        />
      )}
    </>
  );
}
