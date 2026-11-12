"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  ThumbsUp,
  Plus,
  Search,
  CheckCircle2,
  Sparkles,
  MapPin,
  Clock,
  Send,
  X,
  AlertCircle
} from "lucide-react";
import {
  getCommunityTips,
  upvoteTip,
  addCommunityTip,
  getServices,
  getUserProfile,
  isClient
} from "@/lib/storage";
import { CommunityTip, Service } from "@/types";
import { useToast } from "@/components/Toast";

export default function CommunityTipsPage() {
  const { showToast } = useToast();
  const [tips, setTips] = useState<CommunityTip[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [search, setSearch] = useState("");
  const [selectedServiceFilter, setSelectedServiceFilter] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New tip form state
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newServiceId, setNewServiceId] = useState("cnic-renewal");
  const [newCity, setNewCity] = useState("Islamabad");
  const [authorRole, setAuthorRole] = useState("Citizen");

  const loadData = () => {
    if (!isClient()) return;
    setTips(getCommunityTips());
    setServices(getServices());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("sahulat_tips_updated", loadData);
    return () => window.removeEventListener("sahulat_tips_updated", loadData);
  }, []);

  const handleUpvote = (id: string) => {
    upvoteTip(id);
    loadData();
    showToast("Upvoted! Thank you for supporting the community.", "success");
  };

  const handleCreateTip = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast("Please provide both title and details.", "error");
      return;
    }

    const serviceObj = services.find((s) => s.id === newServiceId);
    const profile = getUserProfile();

    addCommunityTip({
      authorName: profile.name || "Citizen Contributor",
      authorRole: authorRole || "Verified Applicant",
      serviceId: newServiceId,
      serviceName: serviceObj?.title || "Government Service",
      title: newTitle.trim(),
      content: newContent.trim(),
      city: newCity,
      isVerified: false
    });

    setIsAddModalOpen(false);
    setNewTitle("");
    setNewContent("");
    loadData();
    showToast("Your tip has been posted to the community board!", "success");
  };

  const filtered = tips.filter((t) => {
    const matchService =
      selectedServiceFilter === "All" || t.serviceId === selectedServiceFilter;
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.content.toLowerCase().includes(search.toLowerCase()) ||
      t.authorName.toLowerCase().includes(search.toLowerCase()) ||
      t.city.toLowerCase().includes(search.toLowerCase());
    return matchService && matchSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <MessageSquare className="w-4 h-4 text-amber-500" /> Crowdsourced Citizen Wisdom
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Community Tips & Experiences
            </h1>
            <p className="text-sm text-slate-500">
              Real advice from applicants who recently visited counters, passed driving tests, and avoided queues.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Share Your Experience
          </button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tips by keywords (e.g. timing, queue, agent, reverse track, challan)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-slate-400 uppercase whitespace-nowrap">Filter:</span>
            <button
              onClick={() => setSelectedServiceFilter("All")}
              className={`px-3 py-1 rounded-lg font-bold transition-all whitespace-nowrap ${
                selectedServiceFilter === "All"
                  ? "bg-[#1E3A8A] text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              All Services
            </button>
            {services.slice(0, 6).map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedServiceFilter(s.id)}
                className={`px-3 py-1 rounded-lg font-semibold transition-all whitespace-nowrap ${
                  selectedServiceFilter === s.id
                    ? "bg-[#1E3A8A] text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {s.title.split("(")[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Stream */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">No Tips Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Be the first citizen to post a helpful tip for this service category!
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-[#0D9488] text-white rounded-lg text-xs font-bold"
              >
                Share First Tip
              </button>
            </div>
          ) : (
            filtered.map((tip) => (
              <div
                key={tip.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm hover:border-blue-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {tip.serviceName}
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" /> {tip.city}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">{tip.createdAt}</span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tip.content}
                  </p>
                </div>

                {/* Footer Bar */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center">
                      {tip.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        {tip.authorName}
                        {tip.isVerified && (
                          <span title="Verified Citizen Submission">
                            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{tip.authorRole}</div>
                    </div>
                  </div>

                  {/* Upvote Button */}
                  <button
                    onClick={() => handleUpvote(tip.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0D9488] font-bold text-xs transition-colors border border-teal-200/70"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({tip.upvotes})</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Tip Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900">
                  Share Your Paperwork Experience
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTip} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tip Headline / Title *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Visit at 8:00 AM sharp, bring Rs. 100 exact change"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Related Service
                  </label>
                  <select
                    value={newServiceId}
                    onChange={(e) => setNewServiceId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    City / Center
                  </label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Islamabad, Lahore..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detailed Advice / What should people watch out for? *
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Explain the specific counter, agent fees to avoid, what the officer checked..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0D9488] hover:bg-teal-700 text-white font-bold rounded-lg shadow-sm"
                >
                  Publish Tip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

