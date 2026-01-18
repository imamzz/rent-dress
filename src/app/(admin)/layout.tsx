"use client";

import Sidebar from "@/src/components/admin/layout/Sidebar";
import Topbar from "@/src/components/admin/layout/Topbar";
import { Toaster } from "@/src/components/ui/toast/toaster";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <Topbar />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 bg-gray-50/50">
          {children}
        </main>
      </div>

      {/* GLOBAL TOAST */}
      <Toaster />
    </div>
  );
};

export default layout;
