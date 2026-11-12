"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          let bg = "bg-white border-slate-200 text-slate-800";
          let Icon = Info;
          let iconColor = "text-blue-500";

          if (toast.type === "success") {
            bg = "bg-emerald-50 border-emerald-200 text-emerald-900";
            Icon = CheckCircle2;
            iconColor = "text-emerald-600";
          } else if (toast.type === "error") {
            bg = "bg-rose-50 border-rose-200 text-rose-900";
            Icon = AlertCircle;
            iconColor = "text-rose-600";
          } else if (toast.type === "warning") {
            bg = "bg-amber-50 border-amber-200 text-amber-900";
            Icon = AlertCircle;
            iconColor = "text-amber-600";
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-center justify-between gap-3 text-xs font-semibold animate-in slide-in-from-bottom-3 duration-200 ${bg}`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: (msg: string) => {
        if (typeof window !== "undefined") {
          console.log(msg);
        }
      }
    };
  }
  return context;
}

