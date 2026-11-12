"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FileText,
  Clock,
  Banknote,
  Building2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MapPin,
  ArrowLeft,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  PhoneCall
} from "lucide-react";
import {
  getServiceById,
  getRequiredDocuments,
  getOffices,
  getCommunityTips,
  isClient
} from "@/lib/storage";
import { initialFAQs } from "@/data/faqsData";
import { Service, RequiredDocument, OfficeLocation, FAQ } from "@/types";
import SmartChecklistModal from "@/components/SmartChecklistModal";

export default function ServiceDetailPage() {
  const params = useParams();
  const serviceId = params?.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [documents, setDocuments] = useState<RequiredDocument[]>([]);
  const [offices, setOffices] = useState<OfficeLocation[]>([]);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  useEffect(() => {
    if (!isClient() || !serviceId) return;
    const found = getServiceById(serviceId);
    if (found) {
      setService(found);
      const allDocs = getRequiredDocuments();
      setDocuments(allDocs.filter((d) => found.requiredDocumentIds.includes(d.id)));
      const allOffices = getOffices();
      setOffices(allOffices.filter((o) => o.serviceCategory === found.category));
    }
  }, [serviceId]);

  if (!service) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Service Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested service ID &quot;{serviceId}&quot; could not be located in the catalog.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Services Directory
        </Link>
      </div>
    );
  }

  const relatedFaqs = initialFAQs.filter((f) => service.faqIds?.includes(f.id));

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#1E3A8A]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-[#1E3A8A]">Services</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 truncate">{service.title}</span>
        </div>

        {/* Hero Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {service.category}
                </span>
                <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" /> {service.department}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {service.title}
              </h1>
              <p className="text-base text-slate-500 font-urdu -mt-1">
                {service.titleUrdu}
              </p>

              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => setIsChecklistOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-300" /> Generate Smart Checklist
              </button>
              <Link
                href={`/create-case?service=${service.id}`}
                className="px-6 py-3 rounded-xl bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Start Tracked Case
              </Link>
            </div>
          </div>

          {/* Key Facts Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Processing Timeline</span>
                <span className="text-xs font-bold text-slate-800">{service.processingTime}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Banknote className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Government Fee Estimate</span>
                <span className="text-xs font-bold text-slate-800">{service.estimatedFee}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div className="truncate">
                <span className="text-[11px] font-bold text-slate-500 uppercase block">Official Online Portal</span>
                {service.officialPortalUrl ? (
                  <a
                    href={service.officialPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-[#1E3A8A] hover:underline truncate block"
                  >
                    {service.officialPortalUrl.replace("https://", "")}
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">In-person physical counter</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Left: Process Steps & Documents. Right: Offices & FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step-by-Step Roadmap */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  Official Step-by-Step Process
                </h2>
                <p className="text-xs text-slate-500">
                  Follow this structured sequence to complete your application smoothly.
                </p>
              </div>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-slate-200">
                {service.steps.map((step) => (
                  <div key={step.stepNumber} className="relative flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white font-extrabold text-sm flex items-center justify-center shrink-0 ring-4 ring-white shadow-sm z-10">
                      {step.stepNumber}
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 flex-1 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <h3 className="font-bold text-sm text-slate-900">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <span className="text-[11px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0">
                            {step.duration}
                          </span>
                        )}
                      </div>

                      {step.titleUrdu && (
                        <div className="text-xs text-slate-500 font-urdu -mt-1">
                          {step.titleUrdu}
                        </div>
                      )}

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {step.description}
                      </p>

                      {step.tips && (
                        <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                          <span className="font-bold text-amber-700">💡 Tip:</span>
                          <span>{step.tips}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents Bank */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#1E3A8A]" />
                    Required Documents Checklist
                  </h2>
                  <p className="text-xs text-slate-500">
                    Prepare original and attested photocopies before heading to the office.
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {documents.length} Documents Required
                </span>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-white transition-all space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <h4 className="font-bold text-sm text-slate-900">
                          {doc.name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                          {doc.category}
                        </span>
                        {doc.isMandatory ? (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                            Mandatory
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            Optional
                          </span>
                        )}
                      </div>
                    </div>

                    {doc.nameUrdu && (
                      <div className="text-xs text-slate-500 font-urdu pl-7">
                        {doc.nameUrdu}
                      </div>
                    )}

                    <p className="text-xs text-slate-600 pl-7">
                      {doc.description}
                    </p>

                    <div className="pl-7 pt-1 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                      <span>Issuing Authority: <strong className="text-slate-700">{doc.issuingAuthority}</strong></span>
                      {doc.notes && <span className="text-amber-700">⚠️ {doc.notes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Offices & FAQs */}
          <div className="space-y-6">
            {/* Related Offices */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  Office Locations
                </h3>
                <Link href="/offices" className="text-xs font-bold text-[#1E3A8A] hover:underline">
                  All Offices
                </Link>
              </div>

              {offices.length === 0 ? (
                <p className="text-xs text-slate-400">Offices available across all district DC/NADRA markaz.</p>
              ) : (
                <div className="space-y-3">
                  {offices.slice(0, 3).map((office) => (
                    <div
                      key={office.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs"
                    >
                      <div className="font-bold text-slate-900">{office.name}</div>
                      <div className="text-slate-500">{office.address}</div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        ⏱️ {office.timings}
                      </div>
                      <div className="pt-1 flex items-center justify-between">
                        <span className="font-mono text-slate-700 font-medium">{office.phone}</span>
                        <a
                          href={office.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0D9488] font-bold hover:underline"
                        >
                          Directions →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500" />
                  Frequently Asked Questions
                </h3>
              </div>

              {relatedFaqs.length === 0 ? (
                <p className="text-xs text-slate-400">Ask the AI helper for custom questions regarding this service.</p>
              ) : (
                <div className="space-y-3">
                  {relatedFaqs.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5"
                    >
                      <div className="text-xs font-bold text-slate-900">
                        Q: {faq.question}
                      </div>
                      <div className="text-[11px] text-slate-500 font-urdu">
                        {faq.questionUrdu}
                      </div>
                      <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <Link
                href={`/ai-helper?q=${encodeURIComponent(service.title + " process and documents")}`}
                className="block text-center text-xs font-bold text-[#0D9488] hover:underline pt-2 border-t border-slate-100"
              >
                Ask AI Assistant more questions →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Checklist Modal */}
      <SmartChecklistModal
        service={service}
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
}

