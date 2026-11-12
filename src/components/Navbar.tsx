"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Search,
  Bell,
  User,
  Shield,
  Menu,
  X,
  Compass,
  MessageSquare,
  HelpCircle,
  FolderOpen,
  CheckSquare,
  Layers,
  ChevronDown,
  PhoneCall,
  Sparkles
} from "lucide-react";
import { getCurrentRole, setCurrentRole, getReminders, isClient } from "@/lib/storage";
import { UserRole } from "@/types";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentRole, setRoleState] = useState<UserRole>("user");
  const [remindersCount, setRemindersCount] = useState<number>(0);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isClient()) return;
    setRoleState(getCurrentRole());
    const uncompletedReminders = getReminders().filter(r => !r.isCompleted).length;
    setRemindersCount(uncompletedReminders);

    const handleRoleChange = () => {
      setRoleState(getCurrentRole());
    };
    const handleRemindersChange = () => {
      const active = getReminders().filter(r => !r.isCompleted).length;
      setRemindersCount(active);
    };

    window.addEventListener("sahulat_role_changed", handleRoleChange);
    window.addEventListener("sahulat_reminders_updated", handleRemindersChange);

    return () => {
      window.removeEventListener("sahulat_role_changed", handleRoleChange);
      window.removeEventListener("sahulat_reminders_updated", handleRemindersChange);
    };
  }, []);

  const handleRoleSwitch = (newRole: UserRole) => {
    setCurrentRole(newRole);
    setRoleDropdownOpen(false);
  };

  const navLinks = [
    { label: "Home", href: "/", icon: Layers },
    { label: "Services", href: "/services", icon: FileText },
    { label: "Track Cases", href: "/tracker", icon: CheckSquare, roleRequired: "user" },
    { label: "Documents", href: "/documents", icon: FolderOpen, roleRequired: "user" },
    { label: "AI Helper", href: "/ai-helper", icon: Sparkles },
    { label: "Offices", href: "/offices", icon: Compass },
    { label: "Community Tips", href: "/community", icon: MessageSquare },
  ];

  const visibleLinks = navLinks.filter(link => {
    if (currentRole === "guest" && link.roleRequired) return false;
    return true;
  });

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top Bar for Government Tech Feel */}
      <div className="bg-[#1E3A8A] text-white text-xs py-1.5 px-4 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Govt & Academic Paperwork Portal
            </span>
            <span className="hidden md:inline text-blue-200">|</span>
            <span className="hidden md:inline text-blue-100 font-urdu">
              سہولت ڈیسک • پیپر ورک، اب آسان
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-blue-100">
              <span className="inline-flex items-center gap-1 text-[11px]">
                <PhoneCall className="w-3 h-3 text-amber-400" /> Helpline: 1777 (NADRA) / 15 (Police)
              </span>
            </div>

            {/* Role Switcher Pill for Examiners & Testing */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 bg-blue-800/80 hover:bg-blue-800 border border-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium text-white transition-colors"
                title="Switch role for testing"
              >
                <span>Role:</span>
                <span className="capitalize text-amber-300 font-semibold">{currentRole}</span>
                <ChevronDown className="w-3 h-3 text-blue-200" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-44 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400">
                    Switch Active Role
                  </div>
                  <button
                    onClick={() => handleRoleSwitch("guest")}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 ${
                      currentRole === "guest" ? "text-blue-700 font-bold bg-blue-50" : ""
                    }`}
                  >
                    <span>Guest User</span>
                    {currentRole === "guest" && <span className="text-[10px] text-blue-600">Active</span>}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch("user")}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 ${
                      currentRole === "user" ? "text-blue-700 font-bold bg-blue-50" : ""
                    }`}
                  >
                    <span>Citizen (User)</span>
                    {currentRole === "user" && <span className="text-[10px] text-blue-600">Active</span>}
                  </button>
                  <button
                    onClick={() => handleRoleSwitch("admin")}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-100 ${
                      currentRole === "admin" ? "text-blue-700 font-bold bg-blue-50" : ""
                    }`}
                  >
                    <span>Administrator</span>
                    {currentRole === "admin" && <span className="text-[10px] text-blue-600">Active</span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E3A8A] via-[#1E40AF] to-[#0D9488] flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-lg tracking-wider">SD</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-[#1E3A8A] tracking-tight group-hover:text-blue-800 transition-colors">
                  Sahulat<span className="text-[#0D9488]">Desk</span>
                </span>
                <span className="hidden sm:inline-block text-xs px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                  سہولت
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-1 hidden xs:block">
                “Paperwork, ab asaan.”
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {visibleLinks.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "text-[#1E3A8A] bg-blue-50/80 font-semibold"
                      : "text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#0D9488]" : "text-slate-400"}`} />
                  {item.label}
                </Link>
              );
            })}

            {/* Admin Link if Admin */}
            {currentRole === "admin" && (
              <Link
                href="/admin"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  pathname.startsWith("/admin")
                    ? "text-amber-700 bg-amber-50"
                    : "text-amber-700 hover:bg-amber-50/60"
                }`}
              >
                <Shield className="w-4 h-4 text-amber-600" />
                Admin Panel
              </Link>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Quick Action */}
            <Link
              href="/services"
              className="p-2 text-slate-500 hover:text-[#1E3A8A] hover:bg-slate-100 rounded-lg transition-colors hidden sm:flex"
              title="Search Services"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Notifications / Reminders Bell */}
            {currentRole !== "guest" && (
              <Link
                href="/notifications"
                className="relative p-2 text-slate-500 hover:text-[#1E3A8A] hover:bg-slate-100 rounded-lg transition-colors"
                title="Reminders & Alerts"
              >
                <Bell className="w-5 h-5" />
                {remindersCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-amber-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {remindersCount}
                  </span>
                )}
              </Link>
            )}

            {/* Dashboard / Login CTA */}
            {currentRole === "guest" ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 text-sm font-medium text-[#1E3A8A] hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1E3A8A] hover:bg-blue-900 rounded-lg shadow-sm transition-colors"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3.5 py-1.5 bg-[#0D9488] hover:bg-teal-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">My Dashboard</span>
                </Link>

                <Link
                  href="/settings"
                  className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors hidden sm:flex"
                  title="Account Settings"
                >
                  <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                    A
                  </div>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="px-2 py-2 mb-2 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Current Role:</span>
            <div className="flex gap-1">
              {(["guest", "user", "admin"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`px-2 py-0.5 text-xs rounded font-medium capitalize ${
                    currentRole === r
                      ? "bg-[#1E3A8A] text-white"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {visibleLinks.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? "text-[#1E3A8A] bg-blue-50 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-[#0D9488]" : "text-slate-400"}`} />
                {item.label}
              </Link>
            );
          })}

          {currentRole === "admin" && (
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-amber-800 bg-amber-50"
            >
              <Shield className="w-5 h-5 text-amber-600" />
              Admin Management Panel
            </Link>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {currentRole === "guest" ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-[#1E3A8A] border border-blue-300 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-semibold text-white bg-[#1E3A8A] rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-sm font-semibold text-white bg-[#0D9488] rounded-lg shadow-sm"
              >
                Go to Citizen Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

