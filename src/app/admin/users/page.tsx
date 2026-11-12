"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Shield,
  UserCheck,
  CheckCircle2,
  Lock,
  MoreVertical,
  Mail,
  MapPin,
  Calendar
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import { getUserProfile, isClient } from "@/lib/storage";
import { UserRole } from "@/types";
import { useToast } from "@/components/Toast";

interface MockAdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city: string;
  casesCount: number;
  docsCount: number;
  joinedAt: string;
  status: "Active" | "Pending Verification" | "Restricted";
}

const INITIAL_USERS: MockAdminUser[] = [
  {
    id: "usr-1",
    name: "Muhammad Ali Raza",
    email: "ali.raza@example.pk",
    role: "user",
    city: "Islamabad",
    casesCount: 4,
    docsCount: 6,
    joinedAt: "15 Oct 2026",
    status: "Active"
  },
  {
    id: "usr-2",
    name: "Dr. Fatima Noor",
    email: "fatima.noor@health.pk",
    role: "user",
    city: "Karachi",
    casesCount: 2,
    docsCount: 3,
    joinedAt: "22 Oct 2026",
    status: "Active"
  },
  {
    id: "usr-3",
    name: "Director Operations",
    email: "admin@sahulat.gov.pk",
    role: "admin",
    city: "Islamabad",
    casesCount: 18,
    docsCount: 24,
    joinedAt: "01 Aug 2026",
    status: "Active"
  },
  {
    id: "usr-4",
    name: "Hamza Farooq",
    email: "hamza.f@gmail.com",
    role: "user",
    city: "Lahore",
    casesCount: 3,
    docsCount: 5,
    joinedAt: "04 Nov 2026",
    status: "Active"
  },
  {
    id: "usr-5",
    name: "Ayesha Bibi",
    email: "ayesha.student@univ.edu.pk",
    role: "user",
    city: "Rawalpindi",
    casesCount: 1,
    docsCount: 2,
    joinedAt: "07 Nov 2026",
    status: "Active"
  },
  {
    id: "usr-6",
    name: "Zubair Khan",
    email: "zubair.tax@consultant.pk",
    role: "user",
    city: "Peshawar",
    casesCount: 7,
    docsCount: 9,
    joinedAt: "10 Oct 2026",
    status: "Active"
  }
];

export default function AdminUsersPage() {
  const { showToast } = useToast();
  const [users, setUsers] = useState<MockAdminUser[]>(INITIAL_USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | UserRole>("All");

  const handleRoleToggle = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newRole: UserRole = u.role === "admin" ? "user" : "admin";
          showToast(`Role updated for ${u.name} to ${newRole.toUpperCase()}`, "success");
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleStatusToggle = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === "Active" ? "Restricted" : "Active";
          showToast(`Account status set to ${newStatus}`, "info");
          return { ...u, status: newStatus as any };
        }
        return u;
      })
    );
  };

  const filtered = users.filter((u) => {
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.city.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-950/60">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Users className="w-4 h-4" /> Identity & Access Governance
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manage Registered Citizens & Officers ({users.length})
            </h1>
            <p className="text-xs text-slate-400">
              Audit citizen accounts, switch administrative roles, and inspect dossier volumes.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or city..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Filter Role:</span>
            {(["All", "user", "admin"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ${
                  roleFilter === r
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Citizen Profile</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Dossiers & Vault</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{u.name}</span>
                        {u.role === "admin" && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-normal">
                            Officer
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{u.email}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize border ${
                          u.role === "admin"
                            ? "bg-amber-950/70 border-amber-800 text-amber-300"
                            : "bg-blue-950/70 border-blue-800 text-blue-300"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {u.city}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-white font-semibold">{u.casesCount} Cases</span>
                      <span className="text-slate-500 text-[11px] block">{u.docsCount} Vault Files</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          u.status === "Active"
                            ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                            : "bg-rose-950 text-rose-400 border border-rose-800"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleRoleToggle(u.id)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition-colors"
                          title="Toggle Admin/User Role"
                        >
                          {u.role === "admin" ? "Demote to Citizen" : "Promote to Admin"}
                        </button>
                        <button
                          onClick={() => handleStatusToggle(u.id)}
                          className="px-2 py-1 rounded text-slate-400 hover:text-white text-[11px]"
                        >
                          {u.status === "Active" ? "Restrict" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

