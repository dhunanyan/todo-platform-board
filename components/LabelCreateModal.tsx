"use client";

import { FormEvent, useState } from "react";
import { LABEL_SHADE_GROUPS } from "@/lib/constants";
import { PlusIcon } from "@/components/icons";

type Props = {
  onClose: () => void;
  onCreate: (data: { name: string; color: string }) => void;
};

export default function LabelCreateModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState<string>(LABEL_SHADE_GROUPS[0][0]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name: name.trim(), color });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-sm animate-pop" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title"><PlusIcon size={16} /> Create Label</h3>
        <form onSubmit={submit}>
          <label className="field-label">
            Label Name
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <div className="field-label">Choose color shade</div>
          <div className="swatch-grid">
            {LABEL_SHADE_GROUPS.map((group, groupIndex) => (
              <div key={groupIndex} className="swatch-row">
                {group.map((shade) => (
                  <button
                    key={shade}
                    type="button"
                    className={`swatch ${color === shade ? "active" : ""}`}
                    style={{ backgroundColor: shade }}
                    onClick={() => setColor(shade)}
                    aria-label={`Select shade ${shade}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Label</button>
          </div>
        </form>
      </div>
    </div>
  );
}
