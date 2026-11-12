import React from "react";
import { CaseStatus } from "@/types";
import { Check, Clock, AlertCircle } from "lucide-react";

interface Props {
  status: CaseStatus;
  progressPercent?: number;
  interactive?: boolean;
  onStatusChange?: (newStatus: CaseStatus) => void;
}

const STAGES: { status: CaseStatus; label: string; labelUrdu: string }[] = [
  { status: "Not Started", label: "Not Started", labelUrdu: "شروع نہیں ہوا" },
  { status: "Documents Pending", label: "Docs Pending", labelUrdu: "دستاویزات باقی" },
  { status: "Ready to Submit", label: "Ready to Submit", labelUrdu: "جمع کروانے کے لیے تیار" },
  { status: "Submitted", label: "Submitted", labelUrdu: "جمع شدہ" },
  { status: "Under Review", label: "Under Review", labelUrdu: "زیرِ جائزہ" },
  { status: "Completed", label: "Completed", labelUrdu: "مکمل شدہ" }
];

export default function CaseProgressBar({ status, progressPercent, interactive, onStatusChange }: Props) {
  const currentIndex = STAGES.findIndex(s => s.status === status);

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 z-0" />
        
        {/* Active Line Fill */}
        <div
          className="absolute top-1/2 left-4 h-1 bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-emerald-500 -translate-y-1/2 z-0 transition-all duration-500"
          style={{
            width: currentIndex > 0 ? `calc(${(currentIndex / (STAGES.length - 1)) * 100}% - 32px)` : "0%"
          }}
        />

        {/* Steps */}
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isPending = idx > currentIndex;

          return (
            <div
              key={stage.status}
              onClick={() => {
                if (interactive && onStatusChange) {
                  onStatusChange(stage.status);
                }
              }}
              className={`relative z-10 flex flex-col items-center group ${
                interactive ? "cursor-pointer" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 shadow-sm ${
                  isDone
                    ? "bg-[#0D9488] text-white ring-4 ring-teal-50"
                    : isCurrent
                    ? "bg-[#1E3A8A] text-white ring-4 ring-blue-100 scale-110"
                    : "bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400"
                }`}
                title={interactive ? `Click to set status to ${stage.label}` : undefined}
              >
                {isDone ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : isCurrent ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              <div className="mt-2 text-center">
                <span
                  className={`text-[11px] font-semibold block transition-colors ${
                    isCurrent
                      ? "text-[#1E3A8A]"
                      : isDone
                      ? "text-teal-800"
                      : "text-slate-400"
                  }`}
                >
                  {stage.label}
                </span>
                <span className="text-[9px] text-slate-400 font-urdu hidden sm:block">
                  {stage.labelUrdu}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {progressPercent !== undefined && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>Overall Process Progress:</span>
          <span className="font-bold text-[#1E3A8A]">{progressPercent}%</span>
        </div>
      )}
    </div>
  );
}

