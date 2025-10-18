"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useState } from "react";

export type Toast = {
  id: number;
  title: string;
  description?: string;
};

const ToastContext = createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: number) => void;
} | null>(null);

export function ToasterProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const value = useMemo(
    () => ({
      toasts,
      addToast: (toast: Omit<Toast, "id">) =>
        setToasts((current) => [
          ...current,
          {
            id: Date.now(),
            ...toast
          }
        ]),
      removeToast: (id: number) => setToasts((current) => current.filter((toast) => toast.id !== id))
    }),
    [toasts]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToasterProvider");
  }

  return context;
}

export function Toaster() {
  const context = useContext(ToastContext);

  if (!context) {
    return null;
  }

  const { toasts, removeToast } = context;

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto rounded-2xl bg-white/90 p-4 shadow-xl ring-1 ring-black/5 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{toast.title}</p>
                {toast.description ? <p className="mt-1 text-sm text-slate-600">{toast.description}</p> : null}
              </div>
              <button
                className="text-sm font-medium text-primary-600"
                onClick={() => removeToast(toast.id)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
