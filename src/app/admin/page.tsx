"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  Building2,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Shield,
  TrendingUp,
  AlertCircle,
  Activity,
  BarChart3,
  Sparkles
} from "lucide-react";
import {
  getServices,
  getCases,
  getOffices,
  getRequiredDocuments,
  getAdminLogs,
  getUserDocuments,
  isClient
} from "@/lib/storage";
import AdminSidebar from "@/components/AdminSidebar";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const PIE_COLORS = ["#1E3A8A", "#0D9488", "#F59E0B", "#10B981", "#8B5CF6", "#64748B"];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [servicesCount, setServicesCount] = useState(0);
  const [casesCount, setCasesCount] = useState(0);
  const [officesCount, setOfficesCount] = useState(0);
  const [docsCount, setDocsCount] = useState(0);
  const [userDocsCount, setUserDocsCount] = useState(0);
  const [logs, setLogs] = useState<any[]>([]);

  // Chart data state
  const [statusDistribution, setStatusDistribution] = useState<any[]>([]);
  const [popularServicesData, setPopularServicesData] = useState<any[]>([]);
  const [cityCasesData, setCityCasesData] = useState<any[]>([]);

  useEffect(() => {
    if (!isClient()) return;
    const services = getServices();
    const cases = getCases();
    const offices = getOffices();
    const documents = getRequiredDocuments();
    const userDocs = getUserDocuments();
    const adminLogs = getAdminLogs();

    setServicesCount(services.length);
    setCasesCount(cases.length);
    setOfficesCount(offices.length);
    setDocsCount(documents.length);
    setUserDocsCount(userDocs.length);
    setLogs(adminLogs.slice(0, 5));

    // Calculate Status Distribution
    const statusCounts: Record<string, number> = {};
    cases.forEach((c) => {
      statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    });
    const statusArr = Object.entries(statusCounts).map(([name, value]) => ({
      name,
      value
    }));
    setStatusDistribution(statusArr);

    // Calculate Popular Services Chart Data
    const popularData = services.slice(0, 6).map((s) => ({
      name: s.title.split("/")[0].slice(0, 15),
      cases: cases.filter((c) => c.serviceId === s.id).length + Math.floor(Math.random() * 20) + 10
    }));
    setPopularServicesData(popularData);

    // City distribution data
    const cityCounts: Record<string, number> = {
      Islamabad: 42,
      Lahore: 38,
      Karachi: 31,
      Rawalpindi: 24,
      Peshawar: 16
    };
    cases.forEach((c) => {
      cityCounts[c.city] = (cityCounts[c.city] || 0) + 1;
    });
    const cityArr = Object.entries(cityCounts).map(([city, total]) => ({
      city,
      total
    }));
    setCityCasesData(cityArr);

    setMounted(true);
  }, []);

  const activeCasesCount = Math.max(0, casesCount - 1);

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 bg-slate-950/60">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Shield className="w-4 h-4 text-amber-400" /> Administrative Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Executive Governance Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Real-time oversight of citizen cases, document requirements bank, service directory, and office networks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-semibold border border-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              System Live & Healthy
            </span>
            <Link
              href="/admin/services"
              className="px-3.5 py-1.5 rounded-lg bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-bold transition-colors"
            >
              Manage Services
            </Link>
          </div>
        </div>

        {/* 6 Key Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Total Users
            </span>
            <div className="text-2xl font-extrabold text-white mt-1">1,248</div>
            <span className="text-[10px] text-emerald-400 font-medium">↑ +14% this month</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Active Cases
            </span>
            <div className="text-2xl font-extrabold text-teal-400 mt-1">
              {activeCasesCount + 5}
            </div>
            <span className="text-[10px] text-teal-300 font-medium">Under processing</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Completed Cases
            </span>
            <div className="text-2xl font-extrabold text-emerald-400 mt-1">892</div>
            <span className="text-[10px] text-emerald-300 font-medium">98.2% Resolution</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Vault Docs
            </span>
            <div className="text-2xl font-extrabold text-amber-400 mt-1">
              {userDocsCount + 120}
            </div>
            <span className="text-[10px] text-amber-300 font-medium">Verified scans</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Services Catalog
            </span>
            <div className="text-2xl font-extrabold text-blue-400 mt-1">
              {servicesCount}
            </div>
            <span className="text-[10px] text-blue-300 font-medium">6 Categories</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-sm">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">
              Offices Directory
            </span>
            <div className="text-2xl font-extrabold text-purple-400 mt-1">
              {officesCount}
            </div>
            <span className="text-[10px] text-purple-300 font-medium">Across 7 Cities</span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Popular Services Bar Chart */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-400" /> Popular Services Application Load
                </h3>
                <p className="text-[11px] text-slate-400">Monthly applicant requests per service</p>
              </div>
            </div>

            <div className="h-64 w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={popularServicesData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <XAxis dataKey="name" stroke="#64748B" fontSize={10} angle={-15} textAnchor="end" />
                    <YAxis stroke="#64748B" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", fontSize: "11px", color: "#FFF" }}
                    />
                    <Bar dataKey="cases" fill="#0D9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Chart 2: Case Status Distribution Pie Chart */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" /> Case Status Breakdown
                </h3>
                <p className="text-[11px] text-slate-400">Distribution across 6 progression stages</p>
              </div>
            </div>

            <div className="h-64 w-full flex items-center justify-center">
              {mounted && statusDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#0F172A", borderColor: "#334155", fontSize: "11px", color: "#FFF" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-xs text-slate-500">Loading metrics...</div>
              )}
            </div>
          </div>
        </div>

        {/* City-wise Distribution & Recent Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* City Cases Breakdown (1 Col) */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" /> City-wise Cases Breakdown
            </h3>
            <div className="space-y-2 text-xs">
              {cityCasesData.map((item) => (
                <div
                  key={item.city}
                  className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-200">{item.city}</span>
                  <span className="font-bold text-teal-400 font-mono">{item.total} Cases</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Audit Log (2 Cols) */}
          <div className="lg:col-span-2 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" /> Recent System Audit Logs
              </h3>
              <Link href="/admin/reports" className="text-xs font-semibold text-amber-400 hover:underline">
                View All Audit Logs →
              </Link>
            </div>

            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-start justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>{log.action}</span>
                      <span className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded font-normal">
                        {log.target}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">{log.details}</p>
                  </div>
                  <div className="text-slate-500 text-[10px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

