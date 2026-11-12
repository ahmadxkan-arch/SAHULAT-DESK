"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Shield,
  User,
  KeyRound,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles
} from "lucide-react";
import { setCurrentRole, updateUserProfile } from "@/lib/storage";
import { useToast } from "@/components/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("ali.raza@example.pk");
  const [password, setPassword] = useState("••••••••");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email.includes("admin")) {
        setCurrentRole("admin");
        showToast("Signed in successfully as Administrator", "success");
        router.push("/admin");
      } else {
        setCurrentRole("user");
        showToast("Welcome back, Citizen!", "success");
        router.push("/dashboard");
      }
      setIsLoading(false);
    }, 400);
  };

  const handleQuickLogin = (role: "user" | "admin" | "guest") => {
    if (role === "admin") {
      setCurrentRole("admin");
      updateUserProfile({
        name: "Director Operations",
        email: "admin@sahulat.gov.pk",
        role: "admin"
      });
      showToast("Logged in as Administrator", "success");
      router.push("/admin");
    } else if (role === "guest") {
      setCurrentRole("guest");
      showToast("Browsing as Guest User", "info");
      router.push("/services");
    } else {
      setCurrentRole("user");
      updateUserProfile({
        name: "Muhammad Ali Raza",
        email: "ali.raza@example.pk",
        role: "user"
      });
      showToast("Logged in as Citizen User", "success");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
        {/* Brand Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1E3A8A] to-[#0D9488] flex items-center justify-center text-white font-extrabold text-xl mx-auto shadow-md">
            SD
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign in to Sahulat Desk
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your tracked cases, saved document checklists, and reminders.
          </p>
        </div>

        {/* 1-Click Demo Profiles for Examiners */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 space-y-2">
          <div className="text-xs font-bold text-[#1E3A8A] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Quick Demo Logins (FYP Evaluation):
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("user")}
              className="py-1.5 px-2 bg-white hover:bg-blue-100/60 border border-blue-300 rounded-lg text-xs font-bold text-[#1E3A8A] transition-colors"
            >
              Citizen User Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className="py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Admin Officer Demo
            </button>
          </div>
        </div>

        {/* Regular Form */}
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              CNIC / Email Address
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                placeholder="ali.raza@example.pk or 61101-1234567-1"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">
                Password
              </label>
              <a href="#" className="text-xs text-[#0D9488] hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="rounded text-[#1E3A8A] focus:ring-[#1E3A8A]"
              />
              <span className="text-xs text-slate-600">Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-lg text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? "Signing in..." : "Sign In to Dashboard"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Bottom Options */}
        <div className="text-center pt-2 border-t border-slate-100 space-y-2">
          <p className="text-xs text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-bold text-[#0D9488] hover:underline">
              Create an account
            </Link>
          </p>
          <button
            onClick={() => handleQuickLogin("guest")}
            className="text-xs text-slate-500 hover:text-slate-800 block mx-auto underline"
          >
            Or continue as Guest (view-only)
          </button>
        </div>
      </div>
    </div>
  );
}

