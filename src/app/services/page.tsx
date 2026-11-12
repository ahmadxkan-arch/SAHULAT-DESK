"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  Sparkles,
  Layers,
  ArrowRight,
  Clock,
  Banknote,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { getServices, isClient } from "@/lib/storage";
import { Service, ServiceCategory } from "@/types";
import ServiceCard from "@/components/ServiceCard";
import SmartChecklistModal from "@/components/SmartChecklistModal";

const CATEGORIES: (ServiceCategory | "All")[] = [
  "All",
  "Identity & Civil",
  "Education & Academics",
  "Police & Verification",
  "Transport & Travel",
  "Taxation & Finance",
  "Complaints & Civic"
];

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "All">("All");
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);

  useEffect(() => {
    if (!isClient()) return;
    setServices(getServices());
  }, []);

  const filtered = services.filter((s) => {
    const matchesCategory =
      selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.titleUrdu.includes(search) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1E3A8A] text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            Comprehensive Pakistani Citizen Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Government & University Services
          </h1>
          <p className="text-sm text-slate-600">
            Select any service to view required documents, step-by-step processing roadmap, estimated fees, and office locations.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by service name, Urdu title, or department (e.g. Domicile, NADRA, HEC, Driving)..."
              className="w-full pl-11 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#1E3A8A] text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count & Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {filtered.length} Services Available
            </span>
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-rose-600 hover:underline"
              >
                Clear Search
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Search className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">No Matching Services Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for different keywords like &quot;CNIC&quot;, &quot;Police&quot;, &quot;License&quot;, or browse by category.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onOpenChecklist={(s) => setSelectedServiceForModal(s)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Smart Checklist */}
      {selectedServiceForModal && (
        <SmartChecklistModal
          service={selectedServiceForModal}
          isOpen={!!selectedServiceForModal}
          onClose={() => setSelectedServiceForModal(null)}
        />
      )}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-slate-500">Loading Services Directory...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
