"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Files,
  Building2,
  Users,
  CheckSquare,
  HelpCircle,
  BarChart3,
  Settings,
  ArrowLeft,
  ShieldAlert
} from "lucide-react";
import { setCurrentRole } from "@/lib/storage";

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: FileText },
  { label: "Documents", href: "/admin/documents", icon: Files },
  { label: "Offices", href: "/admin/offices", icon: Building2 },
  { label: "Users & Roles", href: "/admin/users", icon: Users },
  { label: "Reports & Logs", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-[calc(100vh-4rem)] border-r border-slate-800 flex flex-col justify-between p-4 shrink-0">
      <div className="space-y-6">
        {/* Admin Badge */}
        <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Admin Portal
            </div>
            <div className="text-[11px] text-amber-400">
              Department Control Suite
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#1E3A8A] text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Citizen View */}
      <div className="pt-4 border-t border-slate-800 space-y-2">
        <button
          onClick={() => {
            setCurrentRole("user");
            window.location.href = "/dashboard";
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Citizen View
        </button>
        <p className="text-[10px] text-center text-slate-500">
          Sahulat Desk Administration v1.0
        </p>
      </div>
    </aside>
  );
}

