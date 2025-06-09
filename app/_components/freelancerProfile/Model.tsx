// components/Modal.tsx
"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function Model({
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={` bg-[var(--background-color)] rounded-lg p-12 shadow-lg relative ${className}`}
      >
        <button onClick={onClose} className="absolute top-2 right-2  text-2xl">
          X
        </button>
        {children}
      </div>
    </div>
  );
}
