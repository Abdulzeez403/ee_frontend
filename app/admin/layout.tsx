"use client";

import { AdminNav } from "@/components/admin-nav";
import { AdminTopbar } from "@/components/admin-topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminNav />

      {/* Main area */}
      <div className="lg:ml-64 flex flex-col min-h-screen transition-all duration-200">
        {/* Topbar */}
        <AdminTopbar />

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
