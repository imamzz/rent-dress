"use client";

import { useEffect, useState } from "react";
import { Toast } from "./toast";
import { useToast } from "./use-toast";

export function Toaster() {
  const { toasts } = useToast();
  const [mountedIds, setMountedIds] = useState<string[]>([]);

  useEffect(() => {
    const newIds = toasts
      .map((t) => t.id)
      .filter((id) => !mountedIds.includes(id));

    if (newIds.length > 0) {
      requestAnimationFrame(() => {
        setMountedIds((prev) => [...prev, ...newIds]);
      });
    }
  }, [toasts, mountedIds]);

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 pointer-events-none">
      <div className="relative w-80 h-[160px]">
        {toasts.map((toast, index) => {
          const isMounted = mountedIds.includes(toast.id);

          const offset = index * 10;       // 🔑 KECIL → overlap
          const scale = 1 - index * 0.03;  // 🔑 makin belakang makin kecil
          const opacity = 1 - index * 0.15;

          return (
            <div
              key={toast.id}
              className="absolute left-0 right-0 transition-all duration-300 ease-out"
              style={{
                transform: isMounted
                  ? `translateY(${offset}px) scale(${scale})`
                  : "translateY(-20px) scale(0.95)",
                opacity: isMounted ? opacity : 0,
                zIndex: 100 - index,
              }}
            >
              <Toast {...toast} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
