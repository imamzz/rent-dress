"use client";

import { useEffect, useState } from "react";

export type Toast = {
  id: string;
  message: string;
  variant?: "success" | "error" | "info";
};

let listeners: ((toasts: Toast[]) => void)[] = [];
let memory: Toast[] = [];

function emit() {
  listeners.forEach((l) => l(memory));
}

export function toast(message: string, variant: Toast["variant"] = "success") {
  const id = crypto.randomUUID();

  memory = [...memory, { id, message, variant }];
  emit();

  setTimeout(() => {
    memory = memory.filter((t) => t.id !== id);
    emit();
  }, 3000);
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  return { toasts };
}
