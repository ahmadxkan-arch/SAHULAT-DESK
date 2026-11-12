"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  MapPin,
  Clock,
  PhoneCall,
  Search,
  ExternalLink,
  Building2,
  Navigation,
  Mail,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { getOffices, isClient } from "@/lib/storage";
import { OfficeLocation } from "@/types";

const CITIES = [
  "All",
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Peshawar",
  "Quetta"
];

const DEPARTMENTS = [
  "All",
  "NADRA",
  "Punjab Police",
  "Deputy Commissioner Office ICT",
  "PITB",
  "Islamabad Capital Police",
  "City Traffic Police",
  "DGI&P",
  "HEC Pakistan",
  "Federal Board of Revenue"
];

export default function OfficeDirectoryPage() {
  const [offices, setOffices] = useState<OfficeLocation[]>([]);
  const [cityFilter, setCityFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isClient()) return;
    setOffices(getOffices());
  }, []);

  const filtered = offices.filter((o) => {
    const matchCity = cityFilter === "All" || o.city.toLowerCase() === cityFilter.toLowerCase();
    const matchDept = deptFilter === "All" || o.department.toLowerCase().includes(deptFilter.toLowerCase());
    const matchSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      (o.nameUrdu && o.nameUrdu.includes(search)) ||
      o.address.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchDept && matchSearch;
  });

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            Verified Government Facilitation Centers
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Physical Office Directory & Centers
          </h1>
          <p className="text-sm text-slate-600">
            Find the exact counter, timings, emergency hotline, and GPS directions for NADRA Mega Centers, DCO Offices, Police Khidmat Markaz, and Passport offices.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 space-y-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by office name, area, or address (e.g. Blue Area, Shimla Hill, DHA, Liberty)..."
              className="w-full pl-11 pr-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
            {/* City Tabs */}
            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs font-bold text-slate-400 uppercase py-1 pr-1">
                City:
              </span>
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCityFilter(c)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    cityFilter === c
                      ? "bg-[#1E3A8A] text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Department Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase whitespace-nowrap">
                Department:
              </span>
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Office Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Found {filtered.length} Official Facilitation Centers
            </span>
            {(search || cityFilter !== "All" || deptFilter !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCityFilter("All");
                  setDeptFilter("All");
                }}
                className="text-xs text-rose-600 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-base">No Offices Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No physical facilitation center matches your current filter query.
              </p>
              <button
                onClick={() => {
                  setCityFilter("All");
                  setDeptFilter("All");
                  setSearch("");
                }}
                className="px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold"
              >
                Show All Offices
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((office) => (
                <div
                  key={office.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {office.department}
                      </span>
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {office.city}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug">
                        {office.name}
                      </h3>
                      {office.nameUrdu && (
                        <span className="text-xs text-slate-500 font-urdu block mt-0.5">
                          {office.nameUrdu}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {office.address}
                    </p>

                    {/* Timings & Contact Info Box */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-medium text-slate-700">{office.timings}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span className="font-mono text-slate-800 font-medium">{office.phone}</span>
                      </div>
                      {office.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="text-[11px] text-slate-500 truncate">{office.email}</span>
                        </div>
                      )}
                    </div>

                    {/* Services Pill Badges */}
                    {office.servicesProvided && office.servicesProvided.length > 0 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                          Services Handled Here:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {office.servicesProvided.map((serv, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium"
                            >
                              {serv}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct Google Maps Action */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2 bg-[#0D9488] hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

