import React from "react";
import Link from "next/link";
import {
  Shield,
  PhoneCall,
  Mail,
  MapPin,
  ExternalLink,
  Heart,
  FileText,
  CheckCircle,
  Sparkles
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Column 1: Brand & FYP Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1E3A8A] to-[#0D9488] flex items-center justify-center text-white font-bold text-lg shadow-md">
                SD
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  Sahulat<span className="text-[#0D9488]">Desk</span>
                </span>
                <span className="block text-xs text-amber-400 font-medium">
                  “Paperwork, ab asaan.”
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Pakistan&apos;s unified citizen and student documentation guidance portal. Helping citizens navigate NADRA, Domicile, Character Certificates, Degree Verification, Driving Licenses, and Tax paperwork with clarity.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60">
                <Shield className="w-3.5 h-3.5 text-teal-400" /> College Final Year Project (FYP) 2026
              </span>
            </div>
          </div>

          {/* Column 2: Quick Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-500 pl-2">
              Key Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/cnic-renewal" className="hover:text-white transition-colors">
                  CNIC Renewal & Smart Card
                </Link>
              </li>
              <li>
                <Link href="/services/domicile-certificate" className="hover:text-white transition-colors">
                  Domicile Certificate
                </Link>
              </li>
              <li>
                <Link href="/services/character-certificate" className="hover:text-white transition-colors">
                  Police Character Certificate
                </Link>
              </li>
              <li>
                <Link href="/services/driving-license" className="hover:text-white transition-colors">
                  Driving License (DLIMS)
                </Link>
              </li>
              <li>
                <Link href="/services/degree-verification" className="hover:text-white transition-colors">
                  HEC Degree Attestation
                </Link>
              </li>
              <li>
                <Link href="/services/tax-ntn-guidance" className="hover:text-white transition-colors">
                  FBR NTN & Active Filer
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools & Resources */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Citizen Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/create-case" className="hover:text-white transition-colors flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-400" /> Smart Checklist Generator
                </Link>
              </li>
              <li>
                <Link href="/tracker" className="hover:text-white transition-colors flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-teal-400" /> 6-Stage Case Tracker
                </Link>
              </li>
              <li>
                <Link href="/ai-helper" className="hover:text-white transition-colors flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Urdu & English AI Helper
                </Link>
              </li>
              <li>
                <Link href="/offices" className="hover:text-white transition-colors">
                  Office Directory & Maps
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-white transition-colors">
                  Community Tips & Experiences
                </Link>
              </li>
              <li>
                <Link href="/documents" className="hover:text-white transition-colors">
                  Document Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Helplines */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Official Helplines
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/60">
                <div className="text-white font-semibold">NADRA Helpline</div>
                <div className="text-teal-400 font-mono">1777 / 051-111-786-100</div>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/60">
                <div className="text-white font-semibold">Police Khidmat Markaz</div>
                <div className="text-teal-400 font-mono">0800-09100 / Emergency: 15</div>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/60">
                <div className="text-white font-semibold">HEC Verification Center</div>
                <div className="text-teal-400 font-mono">051-111-119-432</div>
              </div>
              <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/60">
                <div className="text-white font-semibold">Passport SMS Status</div>
                <div className="text-teal-400 font-mono">SMS Token # to 9988</div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Box */}
        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 mb-8 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-amber-400 text-lg">⚠️</span>
            <div>
              <p className="font-semibold text-slate-300">Disclaimer & Scope Notice:</p>
              <p className="text-slate-400 mt-0.5">
                Sahulat Desk is an educational guidance portal designed for academic Final Year Project demonstration. It does not process payments or directly issue official government documents.
              </p>
            </div>
          </div>
          <div className="text-slate-300 font-urdu text-right text-sm border-t md:border-t-0 md:border-l border-slate-800 pt-2 md:pt-0 md:pl-4 min-w-[280px]">
            یہ معلومات عام رہنمائی کے لیے ہیں۔ فائنل ضروریات متعلقہ سرکاری ادارے سے تصدیق کریں۔
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 <span className="text-slate-400 font-medium">Sahulat Desk</span>. All rights reserved. “Paperwork, ab asaan.”
          </div>
          <div className="flex items-center gap-6">
            <Link href="/services" className="hover:text-slate-300">Services</Link>
            <Link href="/offices" className="hover:text-slate-300">Offices</Link>
            <Link href="/community" className="hover:text-slate-300">Community</Link>
            <Link href="/admin" className="hover:text-amber-400">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

