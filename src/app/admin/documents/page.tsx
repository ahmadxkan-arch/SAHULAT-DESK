"use client";

import React, { useState, useEffect } from "react";
import {
  Files,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  X,
  FileText,
  Building2,
  AlertCircle
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  getRequiredDocuments,
  saveRequiredDocument,
  deleteRequiredDocument,
  isClient
} from "@/lib/storage";
import { RequiredDocument } from "@/types";
import { useToast } from "@/components/Toast";

const CATEGORIES = [
  "Identity",
  "Academic",
  "Financial",
  "Legal",
  "Photograph",
  "Application"
] as const;

export default function AdminDocumentsPage() {
  const { showToast } = useToast();
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<RequiredDocument | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [nameUrdu, setNameUrdu] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<RequiredDocument["category"]>("Identity");
  const [issuingAuthority, setIssuingAuthority] = useState("NADRA");
  const [isMandatory, setIsMandatory] = useState(true);
  const [notes, setNotes] = useState("");

  const loadData = () => {
    if (!isClient()) return;
    setDocuments(getRequiredDocuments());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingDoc(null);
    setName("");
    setNameUrdu("");
    setDescription("");
    setCategory("Identity");
    setIssuingAuthority("NADRA");
    setIsMandatory(true);
    setNotes("");
    setIsModalOpen(true);
  };

  const openEditModal = (doc: RequiredDocument) => {
    setEditingDoc(doc);
    setName(doc.name);
    setNameUrdu(doc.nameUrdu || "");
    setDescription(doc.description);
    setCategory(doc.category);
    setIssuingAuthority(doc.issuingAuthority);
    setIsMandatory(doc.isMandatory);
    setNotes(doc.notes || "");
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, docName: string) => {
    if (confirm(`Delete document "${docName}" from required document library?`)) {
      deleteRequiredDocument(id);
      showToast("Document deleted from bank.", "info");
      loadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = editingDoc ? editingDoc.id : `doc-${Date.now().toString().slice(-6)}`;

    saveRequiredDocument({
      id,
      name: name.trim(),
      nameUrdu: nameUrdu.trim(),
      description: description.trim(),
      category,
      issuingAuthority: issuingAuthority.trim(),
      isMandatory,
      notes: notes.trim()
    });

    setIsModalOpen(false);
    loadData();
    showToast(editingDoc ? "Document definition updated!" : "New document added to bank!", "success");
  };

  const filtered = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase()) ||
      d.issuingAuthority.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-950/60">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
              <Files className="w-4 h-4" /> Standard Required Documents Bank
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manage Required Documents ({documents.length})
            </h1>
            <p className="text-xs text-slate-400">
              Maintain the reusable registry of documents required by government and university checklists.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Required Document
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
              placeholder="Search by document name, category, or issuing authority..."
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
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Issuing Authority</th>
                  <th className="py-3 px-4">Requirement Type</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{doc.name}</div>
                      {doc.nameUrdu && (
                        <div className="text-[11px] text-slate-400 font-urdu">{doc.nameUrdu}</div>
                      )}
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{doc.description}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-semibold text-[10px]">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      {doc.issuingAuthority}
                    </td>
                    <td className="py-3.5 px-4">
                      {doc.isMandatory ? (
                        <span className="px-2 py-0.5 rounded bg-rose-950/70 border border-rose-800 text-rose-300 font-bold text-[10px]">
                          Mandatory
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold text-[10px]">
                          Optional
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(doc)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                          title="Edit Document"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc.id, doc.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950 rounded transition-colors"
                          title="Delete Document"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-700 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">
                {editingDoc ? "Edit Required Document" : "Add Required Document to Bank"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Document Title *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Matriculation SSC Sanad, Father's CNIC Copy"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Title in Urdu</label>
                <input
                  type="text"
                  value={nameUrdu}
                  onChange={(e) => setNameUrdu(e.target.value)}
                  placeholder="میٹرک کی اصل سند"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-urdu focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    value={issuingAuthority}
                    onChange={(e) => setIssuingAuthority(e.target.value)}
                    placeholder="e.g. NADRA, BISE Board, District Police"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description & Requirements</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Clear attested copies required with gazetted officer stamp..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Special Notes / Warnings</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Must be within last 2 months for utility bills"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={isMandatory}
                  onChange={(e) => setIsMandatory(e.target.checked)}
                  id="mand"
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="mand" className="text-slate-300 font-medium cursor-pointer">
                  Mark as Mandatory Document for applications
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
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

