"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
  Compass,
  MessageSquare,
  FileText,
  UserCheck,
  ChevronRight,
  TrendingUp,
  MapPin,
  HelpCircle,
  FolderLock
} from "lucide-react";
import { getServices, getCommunityTips, getOffices, isClient } from "@/lib/storage";
import { Service, CommunityTip, OfficeLocation } from "@/types";
import ServiceCard from "@/components/ServiceCard";
import SmartChecklistModal from "@/components/SmartChecklistModal";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [tips, setTips] = useState<CommunityTip[]>([]);
  const [offices, setOffices] = useState<OfficeLocation[]>([]);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);

  useEffect(() => {
    if (!isClient()) return;
    setServices(getServices());
    setTips(getCommunityTips().slice(0, 3));
    setOffices(getOffices().slice(0, 3));
  }, []);

  const popularServices = services.filter((s) => s.popular).slice(0, 6);

  const filteredServices = searchQuery.trim()
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.titleUrdu.includes(searchQuery) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : popularServices;

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1E3A8A] via-[#1E40AF] to-[#0F172A] text-white py-16 sm:py-24">
        {/* Subtle Decorative Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/80 border border-blue-700/80 text-blue-200 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
              Government & University Documentation Portal
              <span className="text-amber-400 font-urdu ml-1">سہولت ڈیسک</span>
            </div>

            {/* Main Tagline & Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              “Paperwork, <span className="text-teal-400">ab asaan.</span>”
            </h1>

            <p className="text-base sm:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed font-normal">
              Find required documents, follow simple step-by-step processes, track your case status, and get instant AI guidance in simple Urdu or English.
            </p>

            {/* Search Bar */}
            <div className="pt-2 max-w-2xl mx-auto">
              <div className="relative flex items-center bg-white rounded-2xl shadow-2xl p-2 border border-blue-300/40">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Kya aap ko kis document ya service mein madad chahiye? (e.g. Domicile, CNIC, Degree)..."
                  className="w-full px-3 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none rounded-xl"
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      window.location.href = `/services?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                  className="bg-[#0D9488] hover:bg-teal-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-colors shadow-md"
                >
                  Search
                </button>
              </div>

              {/* Quick Search Tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5 text-xs text-blue-200">
                <span className="text-blue-300 font-medium">Quick search:</span>
                {["CNIC Renewal", "Domicile Certificate", "Driving License", "Police Character", "HEC Attestation"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 rounded-full bg-blue-900/60 hover:bg-blue-800 border border-blue-700/60 text-blue-100 text-[11px] transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR SERVICES SECTION */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4 text-amber-500" /> Most Requested Citizen Services
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Popular Services & Guidelines
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Official document checklists, verified government fees, and processing times.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#1E3A8A] hover:text-blue-800 transition-colors"
            >
              Browse All 12+ Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onOpenChecklist={(s) => setSelectedServiceForModal(s)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#0D9488] uppercase tracking-wider">
              Simple 4-Step Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-1">
              How Sahulat Desk Works
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Transforming confusing bureaucratic government procedures into crystal-clear steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative group hover:border-blue-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1E3A8A] font-extrabold text-lg flex items-center justify-center mb-4 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Choose your service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Select from CNIC, Domicile, Degree Attestation, Driving License, Police Verification, or NTN.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative group hover:border-teal-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-[#0D9488] font-extrabold text-lg flex items-center justify-center mb-4 group-hover:bg-[#0D9488] group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Answer a few questions</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tell us your target city, applicant category (student/job/family), and documents you already possess.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative group hover:border-amber-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 font-extrabold text-lg flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Get your checklist</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive an instant tailored required-documents checklist with exact fee breakdown and forms.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/90 relative group hover:border-emerald-300 transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Track your case</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Monitor status from <i>Documents Pending</i> to <i>Submitted</i> and <i>Completed</i> with deadlines.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/create-case"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-sm shadow-md transition-colors"
            >
              Start Smart Checklist Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI HELPER PREVIEW SECTION */}
      <section className="py-16 bg-gradient-to-br from-blue-950 via-slate-900 to-[#1E3A8A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                Sahulat AI • سہولت دوست
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Ask in simple Urdu or English. Get instant checklists.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Confused about gazetted attestation, challan heads, or father&apos;s death certificate rules?
                Our AI Helper answers queries in roman Urdu, Urdu script, and English with step-by-step precision.
              </p>

              {/* Sample Prompts */}
              <div className="space-y-2.5">
                {[
                  "“Domicile ke liye kya documents chahiye?”",
                  "“CNIC renewal ka process aur fee kya hai?”",
                  "“University character certificate kaise banwate hain?”"
                ].map((promptText) => (
                  <Link
                    key={promptText}
                    href={`/ai-helper?q=${encodeURIComponent(promptText.replace(/[“”]/g, ""))}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-blue-100 font-medium transition-all group"
                  >
                    <span>{promptText}</span>
                    <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/ai-helper"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Open AI Helper Chat <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Chat Preview Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-700/80 p-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Sahulat Assistant</div>
                    <div className="text-[10px] text-teal-400">Online & Ready to Guide</div>
                  </div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  Bilingual
                </span>
              </div>

              <div className="py-4 space-y-3 text-xs">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-[#1E3A8A] text-white px-3.5 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                    Domicile ke liye kya documents chahiye aur kitna kharcha aayega?
                  </div>
                </div>

                {/* Assistant response */}
                <div className="flex justify-start">
                  <div className="bg-slate-800 text-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm max-w-sm border border-slate-700 space-y-2">
                    <p className="font-semibold text-teal-300">
                      Domicile Certificate Requirements:
                    </p>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      <li>✓ 2 Attested copies of CNIC (Applicant + Father)</li>
                      <li>✓ Original Matric (SSC) Sanad / Result Card</li>
                      <li>✓ Paid Utility Bill (within last 2 months)</li>
                      <li>✓ Rs. 50/100 e-Stamp Affidavit</li>
                      <li>✓ Government Challan Fee: ~Rs. 200 - 350</li>
                    </ul>
                    <p className="text-[10px] text-amber-400 pt-1 border-t border-slate-700/60 font-urdu">
                      یہ معلومات عام رہنمائی کے لیے ہیں۔ متعلقہ ڈی سی آفس سے تصدیق کریں۔
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICE DIRECTORY PREVIEW */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0D9488] uppercase tracking-wider mb-1">
                <Compass className="w-4 h-4 text-teal-600" /> Physical Facilitation Centers
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Government Office Directory
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Addresses, public counter timings, contact numbers, and direct Google Maps locations.
              </p>
            </div>
            <Link
              href="/offices"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#1E3A8A] hover:text-blue-800 transition-colors"
            >
              View All Office Locations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office) => (
              <div
                key={office.id}
                className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                      {office.department}
                    </span>
                    <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" /> {office.city}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1 leading-snug">
                    {office.name}
                  </h3>
                  {office.nameUrdu && (
                    <span className="text-xs text-slate-500 font-urdu block mb-2">
                      {office.nameUrdu}
                    </span>
                  )}
                  <p className="text-xs text-slate-600 mb-3">{office.address}</p>
                  <div className="text-xs text-slate-500 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <div>
                      <span className="font-medium text-slate-700">Timings: </span>
                      {office.timings}
                    </div>
                    <div>
                      <span className="font-medium text-slate-700">Phone: </span>
                      <span className="font-mono text-slate-800">{office.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#0D9488] hover:text-teal-800 flex items-center gap-1"
                  >
                    Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY TIPS PREVIEW */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
                <MessageSquare className="w-4 h-4 text-amber-500" /> Real Citizen Experiences
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
                Community Tips & Experiences
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Learn from other applicants who have successfully completed the paperwork.
              </p>
            </div>
            <Link
              href="/community"
              className="inline-flex items-center gap-1 text-sm font-bold text-[#1E3A8A] hover:text-blue-800 transition-colors"
            >
              Explore All Community Tips <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="bg-slate-50 rounded-xl border border-slate-200/90 p-5 flex flex-col justify-between hover:bg-white hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {tip.serviceName}
                    </span>
                    <span className="text-[11px] text-teal-700 font-medium">
                      {tip.city}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                    {tip.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {tip.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1E3A8A] font-bold flex items-center justify-center text-[10px]">
                      {tip.authorName.charAt(0)}
                    </div>
                    <span>{tip.authorName}</span>
                  </div>
                  <div className="font-bold text-teal-700 flex items-center gap-1">
                    ▲ {tip.upvotes} upvotes
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-14 bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Ready to organize your paperwork without hassle?
          </h2>
          <p className="text-blue-100 text-sm max-w-xl mx-auto">
            Generate your personalized checklist in 60 seconds, upload your verified documents, and follow real progress.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/create-case"
              className="px-6 py-3 bg-white text-[#1E3A8A] hover:bg-blue-50 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors"
            >
              Generate Smart Checklist
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 bg-blue-900/60 hover:bg-blue-900 text-white border border-blue-400/40 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
            >
              Explore Services Catalog
            </Link>
          </div>
        </div>
      </section>

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

