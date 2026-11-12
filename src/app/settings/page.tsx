"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  User,
  Bell,
  Languages,
  Shield,
  Save,
  RefreshCw,
  CheckCircle2,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import {
  getUserProfile,
  updateUserProfile,
  getCurrentRole,
  setCurrentRole,
  isClient
} from "@/lib/storage";
import { UserProfile, UserRole } from "@/types";
import { useToast } from "@/components/Toast";

const CITIES = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Faisalabad",
  "Multan"
];

export default function SettingsPage() {
  const { showToast } = useToast();
  const [profile, setProfile] = useState<UserProfile>(getUserProfile());
  const [currentRole, setRoleState] = useState<UserRole>("user");
  const [language, setLanguage] = useState("English & Roman Urdu");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  useEffect(() => {
    if (!isClient()) return;
    setProfile(getUserProfile());
    setRoleState(getCurrentRole());
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(profile);
    showToast("Profile settings saved successfully!", "success");
  };

  const handleRoleChange = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setRoleState(newRole);
    showToast(`Active role switched to: ${newRole.toUpperCase()}`, "info");
  };

  const handleResetDemo = () => {
    if (confirm("Reset all cases, documents, and reminders to initial sample state?")) {
      localStorage.clear();
      showToast("Data reset to initial state. Reloading...", "info");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <Settings className="w-4 h-4 text-[#1E3A8A]" /> Account Preferences
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Settings & Profile
          </h1>
          <p className="text-sm text-slate-500">
            Manage your personal profile, notification channels, and active role.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E3A8A] to-[#0D9488] text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {profile.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{profile.name}</h2>
              <p className="text-xs text-slate-500">{profile.email} • {profile.city}</p>
              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 capitalize border border-blue-200">
                Active Role: {currentRole}
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Contact Phone (For SMS Tracking)
                </label>
                <input
                  type="text"
                  value={profile.phone || "+92 300 1234567"}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Primary District / City
                </label>
                <select
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" /> Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Role Switcher for FYP Testing */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Evaluation Role Switcher (FYP Examiner Demo)
              </h3>
              <p className="text-xs text-slate-500">
                Easily simulate different user perspectives with a single click:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div
              onClick={() => handleRoleChange("guest")}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentRole === "guest"
                  ? "bg-blue-50 border-[#1E3A8A] ring-2 ring-blue-100"
                  : "bg-slate-50 border-slate-200 hover:bg-white"
              }`}
            >
              <div className="font-bold text-xs text-slate-900">Guest Role</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Browse public service directory, FAQs, and office locations without active cases.
              </p>
            </div>

            <div
              onClick={() => handleRoleChange("user")}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentRole === "user"
                  ? "bg-teal-50 border-teal-600 ring-2 ring-teal-100"
                  : "bg-slate-50 border-slate-200 hover:bg-white"
              }`}
            >
              <div className="font-bold text-xs text-teal-900">Citizen (User)</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Create & track cases, upload documents, receive reminders, and use AI helper.
              </p>
            </div>

            <div
              onClick={() => handleRoleChange("admin")}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                currentRole === "admin"
                  ? "bg-amber-50 border-amber-600 ring-2 ring-amber-100"
                  : "bg-slate-50 border-slate-200 hover:bg-white"
              }`}
            >
              <div className="font-bold text-xs text-amber-900">Administrator</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Full CRUD control over services, required documents, offices, users, and reports.
              </p>
            </div>
          </div>
        </div>

        {/* Notifications & Language */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-teal-600" /> Notifications & Language Preferences
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800">Email Case Updates</span>
                <p className="text-[11px] text-slate-500">Receive alerts when case status advances</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={() => setEmailAlerts(!emailAlerts)}
                className="rounded text-[#1E3A8A] focus:ring-[#1E3A8A] w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-800">SMS Reminders</span>
                <p className="text-[11px] text-slate-500">Receive SMS notifications before token test or physical visit</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
                className="rounded text-[#1E3A8A] focus:ring-[#1E3A8A] w-4 h-4"
              />
            </label>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800">Interface Language</span>
                <p className="text-[11px] text-slate-500">Choose bilingual display preference</p>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-1 text-xs border border-slate-300 rounded-lg bg-white"
              >
                <option value="English & Roman Urdu">English & Roman Urdu</option>
                <option value="Urdu Nastaliq">Urdu (اردو نستعلیق)</option>
                <option value="English Only">English Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reset Demo Data */}
        <div className="pt-2 text-center">
          <button
            onClick={handleResetDemo}
            className="text-xs text-slate-400 hover:text-rose-600 flex items-center gap-1.5 mx-auto transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset all local demo data to default sample state
          </button>
        </div>
      </div>
    </div>
  );
}

