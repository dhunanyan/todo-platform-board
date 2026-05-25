"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import LabelCreateModal from "@/components/LabelCreateModal";
import CustomSelect from "@/components/CustomSelect";
import { FlagIcon, LabelIcon, PlusIcon } from "@/components/icons";
import { PRIORITIES, PRIORITY_META } from "@/lib/constants";
import { Label, TicketPriority } from "@/types/ticket";

type Props = {
  labels: Label[];
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    labelId: string | null;
    status: "OPEN";
    priority: TicketPriority;
  }) => void;
  onCreateLabel: (data: { name: string; color: string }) => string;
};

export default function TicketModal({ labels, onClose, onCreate, onCreateLabel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labelId, setLabelId] = useState<string>("");
  const [priority, setPriority] = useState<TicketPriority>(3);
  const [showLabelModal, setShowLabelModal] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const handleLabelChange = (value: string) => {
    if (value === "__create__") {
      setShowLabelModal(true);
      return;
    }
    setLabelId(value);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreate({
      title: title.trim(),
      description: description.trim(),
      labelId: labelId || null,
      status: "OPEN",
      priority
    });
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal animate-pop" onClick={(e) => e.stopPropagation()}>
          <h3 className="modal-title"><PlusIcon size={16} /> Create Ticket</h3>
          <form onSubmit={submit}>
            <label className="field-label">
              Title
              <input ref={titleRef} className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
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
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Create</button>
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
