"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  X,
  ExternalLink,
  Clock,
  Banknote,
  Sparkles
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  getServices,
  saveService,
  deleteService,
  isClient
} from "@/lib/storage";
import { Service, ServiceCategory } from "@/types";
import { useToast } from "@/components/Toast";

const CATEGORIES: ServiceCategory[] = [
  "Identity & Civil",
  "Education & Academics",
  "Police & Verification",
  "Transport & Travel",
  "Taxation & Finance",
  "Complaints & Civic"
];

export default function AdminServicesPage() {
  const { showToast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [titleUrdu, setTitleUrdu] = useState("");
  const [category, setCategory] = useState<ServiceCategory>("Identity & Civil");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [estimatedFee, setEstimatedFee] = useState("Rs. 500");
  const [processingTime, setProcessingTime] = useState("5-7 working days");
  const [officialPortalUrl, setOfficialPortalUrl] = useState("https://");
  const [popular, setPopular] = useState(false);

  const loadData = () => {
    if (!isClient()) return;
    setServices(getServices());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingService(null);
    setTitle("");
    setTitleUrdu("");
    setCategory("Identity & Civil");
    setDescription("");
    setDepartment("Government Department");
    setEstimatedFee("Rs. 500");
    setProcessingTime("5-7 working days");
    setOfficialPortalUrl("https://");
    setPopular(false);
    setIsModalOpen(true);
  };

  const openEditModal = (s: Service) => {
    setEditingService(s);
    setTitle(s.title);
    setTitleUrdu(s.titleUrdu);
    setCategory(s.category);
    setDescription(s.description);
    setDepartment(s.department);
    setEstimatedFee(s.estimatedFee);
    setProcessingTime(s.processingTime);
    setOfficialPortalUrl(s.officialPortalUrl || "");
    setPopular(!!s.popular);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete service "${name}"?`)) {
      deleteService(id);
      showToast("Service deleted.", "info");
      loadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const id = editingService ? editingService.id : title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const payload: Service = {
      id,
      title: title.trim(),
      titleUrdu: titleUrdu.trim() || title.trim(),
      category,
      description: description.trim(),
      descriptionUrdu: titleUrdu.trim(),
      department: department.trim() || "National Authority",
      estimatedFee: estimatedFee.trim(),
      feeAmount: parseInt(estimatedFee.replace(/[^0-9]/g, "") || "500"),
      processingTime: processingTime.trim(),
      officialPortalUrl: officialPortalUrl.trim(),
      popular,
      iconName: "FileCheck",
      steps: editingService ? editingService.steps : [
        {
          stepNumber: 1,
          title: "Visit Nearest Facilitation Center",
          titleUrdu: "قریبی سینٹر جائیں",
          description: "Obtain token and present original CNIC.",
          duration: "15 mins"
        },
        {
          stepNumber: 2,
          title: "Fee Deposit & Data Verification",
          titleUrdu: "فیس کی ادائیگی",
          description: "Pay government fees and verify documents.",
          duration: "30 mins"
        },
        {
          stepNumber: 3,
          title: "Collection of Certificate",
          titleUrdu: "سرٹیفکیٹ کی وصولی",
          description: "Receive signed official certificate.",
          duration: "3-5 days"
        }
      ],
      requiredDocumentIds: editingService ? editingService.requiredDocumentIds : ["doc-cnic-original", "doc-cnic-copy"],
      eligibleCities: ["All Pakistan"],
      faqIds: editingService ? editingService.faqIds : []
    };

    saveService(payload);
    setIsModalOpen(false);
    loadData();
    showToast(editingService ? "Service updated!" : "New service added to catalog!", "success");
  };

  const filtered = services.filter(
    (s) =>
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-950/60">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" /> Service Catalog Management
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manage Government Services ({services.length})
            </h1>
            <p className="text-xs text-slate-400">
              Add, update, or remove service steps, fees, timelines, and department metadata.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Add New Service
          </button>
        </div>

        {/* Search */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services by title, category, or department..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Service Details</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Estimated Fee</th>
                  <th className="py-3 px-4">Processing Time</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{s.title}</span>
                        {s.popular && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-normal">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-urdu">{s.titleUrdu}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-[10px]">
                        {s.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 text-xs">
                      {s.department}
                    </td>
                    <td className="py-3.5 px-4 text-amber-400 font-mono">
                      {s.estimatedFee.split("/")[0]}
                    </td>
                    <td className="py-3.5 px-4 text-teal-400">
                      {s.processingTime.split("|")[0]}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(s)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                          title="Edit Service"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s.id, s.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950 rounded transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-700 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">
                {editingService ? "Edit Service" : "Add New Citizen Service"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Service Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Title in Urdu *</label>
                  <input
                    type="text"
                    value={titleUrdu}
                    onChange={(e) => setTitleUrdu(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-urdu focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Estimated Fee</label>
                  <input
                    type="text"
                    value={estimatedFee}
                    onChange={(e) => setEstimatedFee(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Processing Time</label>
                  <input
                    type="text"
                    value={processingTime}
                    onChange={(e) => setProcessingTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={popular}
                  onChange={(e) => setPopular(e.target.checked)}
                  id="pop"
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="pop" className="text-slate-300 font-medium cursor-pointer">
                  Mark as Popular / Featured Service on Landing Page
                </label>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0D9488] hover:bg-teal-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

