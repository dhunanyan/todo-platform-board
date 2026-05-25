"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

type Option = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type Props = {
  label: ReactNode;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export default function CustomSelect({ label, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const enabledOptions = useMemo(() => options.filter((o) => !o.disabled), [options]);
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    const idx = enabledOptions.findIndex((o) => o.value === value);
    if (idx >= 0) setHighlighted(idx);
  }, [value, enabledOptions]);

  const commitHighlighted = () => {
    const item = enabledOptions[highlighted];
    if (!item) return;
    onChange(item.value);
    setOpen(false);
  };

  return (
    <label className="field-label">
      {label}
      <div className="custom-select" ref={wrapRef}>
        <button
          type="button"
          className="custom-select-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setOpen(true);
              setHighlighted((i) => Math.min(i + 1, enabledOptions.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setOpen(true);
              setHighlighted((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!open) setOpen(true);
              else commitHighlighted();
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        >
          <span className="custom-select-value">{selected?.label}</span>
          <ChevronDownIcon className={`select-chevron ${open ? "open" : ""}`} size={16} />
        </button>

        {open && (
          <div className="custom-select-menu" role="listbox" aria-label={typeof label === "string" ? label : "Select"}>
            {options.map((option) => {
              const index = enabledOptions.findIndex((o) => o.value === option.value);
              const active = enabledOptions[highlighted]?.value === option.value;
              const selectedState = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selectedState}
                  className={`custom-select-option ${selectedState ? "selected" : ""} ${active ? "active" : ""}`}
                  disabled={option.disabled}
                  onMouseEnter={() => {
                    if (index >= 0) setHighlighted(index);
                  }}
                  onClick={() => {
                    if (option.disabled) return;
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </label>
  );
}
