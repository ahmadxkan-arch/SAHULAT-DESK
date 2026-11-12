import React from "react";
import Link from "next/link";
import { Service } from "@/types";
import {
  CreditCard,
  FileCheck,
  ShieldCheck,
  UserCheck,
  Car,
  GraduationCap,
  Award,
  Receipt,
  AlertTriangle,
  FileCheck2,
  Compass,
  Briefcase,
  Clock,
  Banknote,
  ArrowRight,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface Props {
  service: Service;
  onOpenChecklist?: (service: Service) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  CreditCard,
  FileCheck,
  ShieldCheck,
  UserCheck,
  Car,
  GraduationCap,
  Award,
  Receipt,
  AlertTriangle,
  FileCheck2,
  Compass,
  Briefcase
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Identity & Civil": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Education & Academics": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Police & Verification": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Transport & Travel": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  "Taxation & Finance": { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-200" },
  "Complaints & Civic": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
};

export default function ServiceCard({ service, onOpenChecklist }: Props) {
  const IconComponent = ICON_MAP[service.iconName] || FileCheck;
  const categoryStyle = CATEGORY_COLORS[service.category] || {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200"
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group hover:border-blue-300">
      <div className="p-5">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
          >
            {service.category}
          </span>
          {service.popular && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-500" /> Popular
            </span>
          )}
        </div>

        {/* Header with Icon & Title */}
        <div className="flex items-start gap-3.5 mb-2.5">
          <div className="w-11 h-11 rounded-lg bg-blue-50 text-[#1E3A8A] flex items-center justify-center shrink-0 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
            <IconComponent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors leading-snug">
              {service.title}
            </h3>
            <span className="text-xs text-slate-500 font-urdu block -mt-0.5">
              {service.titleUrdu}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs pt-3 border-t border-slate-100 bg-slate-50/60 -mx-5 -mb-2 px-5 py-2.5">
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span className="truncate" title={service.processingTime}>
              {service.processingTime.split("|")[0]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Banknote className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate font-medium text-slate-700" title={service.estimatedFee}>
              {service.estimatedFee.split("/")[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-xl gap-2">
        <Link
          href={`/services/${service.id}`}
          className="text-xs font-semibold text-[#1E3A8A] hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          View Process & Docs <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {onOpenChecklist ? (
          <button
            onClick={() => onOpenChecklist(service)}
            className="text-xs font-medium px-2.5 py-1 rounded bg-[#0D9488] hover:bg-teal-700 text-white transition-colors"
          >
            Checklist
          </button>
        ) : (
          <Link
            href={`/create-case?service=${service.id}`}
            className="text-xs font-medium px-2.5 py-1 rounded bg-[#0D9488] hover:bg-teal-700 text-white transition-colors"
          >
            Checklist
          </Link>
        )}
      </div>
    </div>
  );
}

