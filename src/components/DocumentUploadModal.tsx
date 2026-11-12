"use client";

import React, { useState } from "react";
import { UserCase, UserDocument } from "@/types";
import { addUserDocument, getCases } from "@/lib/storage";
import {
  X,
  UploadCloud,
  FileCheck,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newDoc: UserDocument) => void;
  preselectedCaseId?: string;
}

const CATEGORIES = [
  "Identity",
  "Academic",
  "Financial",
  "Legal",
  "Photograph",
  "Application"
];

export default function DocumentUploadModal({ isOpen, onClose, onSuccess, preselectedCaseId }: Props) {
  const cases = getCases();
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("Identity");
  const [caseId, setCaseId] = useState(preselectedCaseId || "");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("1.2 MB");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);
      if (!docName) {
        setDocName(file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) {
      setError("Please provide a title for this document.");
      return;
    }
    const finalFileName = fileName.trim() || `${docName.replace(/\s+/g, "_")}.pdf`;

    setIsSubmitting(true);
    const created = addUserDocument({
      userId: "usr-demo-1",
      caseId: caseId || undefined,
      name: docName.trim(),
      category,
      fileName: finalFileName,
      fileSize: fileSize || "1.1 MB",
      fileType: finalFileName.endsWith(".jpg") || finalFileName.endsWith(".png") ? "image/jpeg" : "application/pdf",
      status: "Uploaded"
    });

    setIsSubmitting(false);
    onSuccess(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#1E3A8A] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-teal-300">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Upload to Document Vault</h3>
              <p className="text-xs text-blue-200">Store and categorize paperwork</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Document Title *
            </label>
            <input
              type="text"
              value={docName}
              onChange={(e) => {
                setDocName(e.target.value);
                setError("");
              }}
              placeholder="e.g. CNIC Front & Back Scanned, Paid Challan Receipt"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Link to Case (Optional)
              </label>
              <select
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
              >
                <option value="">No linked case</option>
                {cases.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.serviceTitle.slice(0, 22)}... ({c.status})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Picker Box */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Choose Document File (PDF, JPG, PNG)
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-5 text-center cursor-pointer transition-colors bg-slate-50/50 relative">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              {fileName ? (
                <div>
                  <span className="text-xs font-bold text-[#1E3A8A]">{fileName}</span>
                  <span className="text-[11px] text-slate-500 block">({fileSize})</span>
                </div>
              ) : (
                <div>
                  <span className="text-xs font-semibold text-slate-700 block">
                    Click to browse or drop file here
                  </span>
                  <span className="text-[10px] text-slate-400">
                    PDF, JPG or PNG up to 10MB
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-xs font-bold text-white bg-[#0D9488] hover:bg-teal-700 rounded-lg shadow-sm transition-colors"
            >
              {isSubmitting ? "Uploading..." : "Save to Vault"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

