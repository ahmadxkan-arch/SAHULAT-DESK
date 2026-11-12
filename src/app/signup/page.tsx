"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  User,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  MapPin
} from "lucide-react";
import { setCurrentRole, updateUserProfile } from "@/lib/storage";
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

export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [city, setCity] = useState("Islamabad");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setCurrentRole("user");
      updateUserProfile({
        name: name || "New Citizen",
        email: email || "citizen@sahulat.pk",
        city,
        role: "user"
      });
      showToast("Account created successfully! Welcome to Sahulat Desk.", "success");
      router.push("/dashboard");
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1E3A8A] to-[#0D9488] flex items-center justify-center text-white font-extrabold text-xl mx-auto shadow-md">
            SD
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Citizen Account
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track your paperwork, generate checklists, and get AI guidance.
          </p>
        </div>

        <form className="space-y-3.5" onSubmit={handleSignup}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Muhammad Ali Raza"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ali.raza@example.pk"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CNIC Number
              </label>
              <input
                type="text"
                value={cnic}
                onChange={(e) => setCnic(e.target.value)}
                placeholder="61101-XXXXXXX-X"
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                District / City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none bg-white"
              >
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Create Password *
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="At least 8 characters"
              className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-[#0D9488] hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? "Creating Profile..." : "Register Citizen Account"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-slate-100">
          <p className="text-xs text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#1E3A8A] hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

