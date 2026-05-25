"use client";

import { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/icons";

type Props = {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

export default function SelectField({ label, value, onChange, children }: Props) {
  return (
    <label className="field-label">
      {label}
      <div className="select-shell">
        <select className="form-control form-select" value={value} onChange={(e) => onChange(e.target.value)}>
          {children}
        </select>
        <ChevronDownIcon className="select-chevron" size={16} />
      </div>
    </label>
  );
}
