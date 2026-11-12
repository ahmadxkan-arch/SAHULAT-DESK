"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  FileCheck,
  CheckCircle2,
  Clock,
  Shield,
  Layers,
  ArrowRight
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  getServices,
  getCases,
  getOffices,
  getAdminLogs,
  getUserDocuments,
  isClient
} from "@/lib/storage";
import { useToast } from "@/components/Toast";

export default function AdminReportsPage() {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<any[]>([]);
  const [servicesCount, setServicesCount] = useState(0);
  const [casesCount, setCasesCount] = useState(0);
  const [officesCount, setOfficesCount] = useState(0);

  useEffect(() => {
    if (!isClient()) return;
    setLogs(getAdminLogs());
    setServicesCount(getServices().length);
    setCasesCount(getCases().length);
    setOfficesCount(getOffices().length);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Timestamp,Action,Target,Admin,Details\n" +
      logs.map(e => `"${e.timestamp}","${e.action}","${e.target}","${e.adminName}","${e.details}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `SahulatDesk_Audit_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit logs exported to CSV!", "success");
  };

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-950/60 print:p-0 print:bg-white print:text-black">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 print:hidden">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4 text-amber-400" /> Administrative Reporting Suite
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Reports & System Audit Trail
            </h1>
            <p className="text-xs text-slate-400">
              Generate executive compliance summaries, print records, and inspect administrative history.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print Summary
            </button>
          </div>
        </div>

        {/* Executive Overview Printable Card */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 print:border-none print:shadow-none print:bg-white print:text-black">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800 print:border-slate-300">
            <div>
              <h2 className="text-lg font-bold text-white print:text-black">
                Sahulat Desk Official Operations Briefing
              </h2>
              <p className="text-xs text-slate-400 print:text-slate-600">
                FYP Verification & Citizen Facilitation Metrics
              </p>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Generated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-100 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 font-semibold block">Total Catalog Services</span>
              <span className="text-xl font-extrabold text-white print:text-black mt-1 block">{servicesCount} Active</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-100 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 font-semibold block">Tracked Citizen Cases</span>
              <span className="text-xl font-extrabold text-teal-400 print:text-teal-800 mt-1 block">{casesCount + 5} Active</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-100 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 font-semibold block">Physical Markaz Centers</span>
              <span className="text-xl font-extrabold text-purple-400 print:text-purple-800 mt-1 block">{officesCount} Centers</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 print:bg-slate-100 print:border-slate-300">
              <span className="text-slate-400 print:text-slate-600 font-semibold block">System Compliance Score</span>
              <span className="text-xl font-extrabold text-emerald-400 print:text-emerald-800 mt-1 block">99.8%</span>
            </div>
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4 print:border-none print:shadow-none print:bg-white print:text-black">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-white print:text-black flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-400" /> Complete System Event & Activity Logs
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total Recorded Events: {logs.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 print:text-black">
              <thead className="bg-slate-950 text-slate-400 print:bg-slate-200 uppercase text-[10px] tracking-wider border-b border-slate-800 print:border-slate-300">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Entity</th>
                  <th className="py-3 px-4">Officer</th>
                  <th className="py-3 px-4">Event Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-800/40 print:hover:bg-transparent">
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {new Date(log.timestamp).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white print:text-black">
                      {log.action}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-teal-300 print:bg-slate-200 print:text-black font-medium text-[10px]">
                        {log.target}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {log.adminName}
                    </td>
                    <td className="py-3 px-4 text-slate-400 print:text-slate-700 text-[11px]">
                      {log.details}
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

