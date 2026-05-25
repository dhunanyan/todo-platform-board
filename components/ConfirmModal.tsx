"use client";

import { AlertIcon } from "@/components/icons";

type Props = {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel
}: Props) {
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal modal-sm animate-pop" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title"><AlertIcon size={16} /> {title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="modal-actions">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>{cancelText}</button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
