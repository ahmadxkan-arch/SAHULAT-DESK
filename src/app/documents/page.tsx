"use client";

import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  UploadCloud,
  Search,
  FileText,
  Trash2,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  Filter,
  FileCheck,
  X
} from "lucide-react";
import {
  getUserDocuments,
  deleteUserDocument,
  isClient
} from "@/lib/storage";
import { UserDocument } from "@/types";
import DocumentUploadModal from "@/components/DocumentUploadModal";
import { useToast } from "@/components/Toast";

const CATEGORIES = [
  "All",
  "Identity",
  "Academic",
  "Financial",
  "Legal",
  "Photograph",
  "Application"
];

export default function DocumentManagerPage() {
  const { showToast } = useToast();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<UserDocument | null>(null);

  const loadDocs = () => {
    if (!isClient()) return;
    setDocuments(getUserDocuments());
  };

  useEffect(() => {
    loadDocs();
    window.addEventListener("sahulat_docs_updated", loadDocs);
    return () => window.removeEventListener("sahulat_docs_updated", loadDocs);
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from your vault?`)) {
      deleteUserDocument(id);
      showToast("Document deleted.", "info");
      loadDocs();
    }
  };

  const handleDownload = (doc: UserDocument) => {
    showToast(`Downloading "${doc.fileName}"...`, "success");
    // Simulate real download trigger
    const blob = new Blob([`Official Paperwork Copy: ${doc.name}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = doc.fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = documents.filter((d) => {
    const matchCat = selectedCat === "All" || d.category === selectedCat;
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.fileName.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
              <FolderOpen className="w-4 h-4 text-teal-600" /> Personal Document Vault
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Document Manager
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Upload, organize, categorize, preview, and download your paperwork scans and receipts.
            </p>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <UploadCloud className="w-4 h-4" /> Upload Document
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search documents by title, file name, or category..."
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCat === cat
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <FolderOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-base">No Documents Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t uploaded any files matching this filter. Keep your CNIC scan, matric sanad, and challans stored securely here.
            </p>
            <button
              onClick={() => setIsUploadOpen(true)}
              className="px-4 py-2 bg-[#0D9488] text-white rounded-lg text-xs font-bold"
            >
              Upload Your First Document
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {doc.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {doc.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 line-clamp-1">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono line-clamp-1">
                        {doc.fileName}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-2 flex items-center justify-between border-t border-slate-100">
                    <span>Size: {doc.fileSize}</span>
                    <span>Uploaded: {doc.uploadedAt}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview
                  </button>

                  <button
                    onClick={() => handleDownload(doc)}
                    className="flex-1 py-1.5 px-2 bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>

                  <button
                    onClick={() => handleDelete(doc.id, doc.name)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-sm text-slate-900">{previewDoc.name}</h3>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-100 rounded-xl p-8 text-center space-y-3 border border-slate-200">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto text-[#1E3A8A]">
                <FileText className="w-8 h-8" />
              </div>
              <div className="font-bold text-xs text-slate-800">{previewDoc.fileName}</div>
              <p className="text-xs text-slate-500">
                Category: <strong>{previewDoc.category}</strong> • Size: <strong>{previewDoc.fileSize}</strong>
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
                ✓ Document verified for official submission in Sahulat Desk cases
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => handleDownload(previewDoc)}
                className="px-4 py-2 bg-[#1E3A8A] text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Download File
              </button>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSuccess={() => {
          loadDocs();
          showToast("Document saved to your vault!", "success");
        }}
      />
    </div>
  );
}

