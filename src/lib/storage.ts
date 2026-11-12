"use client";

import {
  Service,
  RequiredDocument,
  UserCase,
  UserDocument,
  OfficeLocation,
  FAQ,
  CommunityTip,
  Reminder,
  UserProfile,
  UserRole,
  CaseStatus,
  AdminLog
} from "@/types";
import { initialServices } from "@/data/servicesData";
import { initialDocuments } from "@/data/documentsData";
import { initialOffices } from "@/data/officesData";
import { initialFAQs } from "@/data/faqsData";
import { initialTips } from "@/data/tipsData";
import { initialCases } from "@/data/sampleCasesData";
import { initialUserProfile, initialUserDocuments, initialReminders } from "@/data/sampleUserData";

const STORAGE_KEYS = {
  USER_ROLE: "sahulat_user_role",
  USER_PROFILE: "sahulat_user_profile",
  SERVICES: "sahulat_services",
  DOCUMENTS: "sahulat_documents_bank",
  USER_DOCUMENTS: "sahulat_user_documents",
  CASES: "sahulat_cases",
  OFFICES: "sahulat_offices",
  FAQS: "sahulat_faqs",
  TIPS: "sahulat_tips",
  REMINDERS: "sahulat_reminders",
  ADMIN_LOGS: "sahulat_admin_logs",
  INITIALIZED: "sahulat_initialized_v1"
};

// SSR safe storage helpers
export function isClient(): boolean {
  return typeof window !== "undefined";
}

export function initializeStorage() {
  if (!isClient()) return;

  const initialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  if (!initialized) {
    localStorage.setItem(STORAGE_KEYS.USER_ROLE, "user");
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(initialUserProfile));
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(initialServices));
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(initialDocuments));
    localStorage.setItem(STORAGE_KEYS.USER_DOCUMENTS, JSON.stringify(initialUserDocuments));
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(initialCases));
    localStorage.setItem(STORAGE_KEYS.OFFICES, JSON.stringify(initialOffices));
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(initialFAQs));
    localStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(initialTips));
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(initialReminders));
    localStorage.setItem(
      STORAGE_KEYS.ADMIN_LOGS,
      JSON.stringify([
        {
          id: "log-1",
          adminName: "Super Admin",
          action: "System Initialized",
          target: "Sahulat Desk Database",
          timestamp: new Date().toISOString(),
          details: "Initialized standard 12 services, 22 required documents, and 12 office locations."
        }
      ])
    );
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
  }
}

// User & Role
export function getCurrentRole(): UserRole {
  if (!isClient()) return "user";
  return (localStorage.getItem(STORAGE_KEYS.USER_ROLE) as UserRole) || "user";
}

export function setCurrentRole(role: UserRole) {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  window.dispatchEvent(new Event("sahulat_role_changed"));
}

export function getUserProfile(): UserProfile {
  if (!isClient()) return initialUserProfile;
  const stored = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return stored ? JSON.parse(stored) : initialUserProfile;
}

export function updateUserProfile(profile: Partial<UserProfile>): UserProfile {
  const current = getUserProfile();
  const updated = { ...current, ...profile };
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
    window.dispatchEvent(new Event("sahulat_profile_updated"));
  }
  return updated;
}

// Services
export function getServices(): Service[] {
  if (!isClient()) return initialServices;
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.SERVICES);
  return stored ? JSON.parse(stored) : initialServices;
}

export function getServiceById(id: string): Service | undefined {
  const services = getServices();
  return services.find(s => s.id === id);
}

export function saveService(service: Service): Service {
  const services = getServices();
  const index = services.findIndex(s => s.id === service.id);
  if (index >= 0) {
    services[index] = service;
  } else {
    services.unshift(service);
  }
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    logAdminAction("Service Updated/Added", service.title, `ID: ${service.id}`);
  }
  return service;
}

export function deleteService(id: string) {
  const services = getServices().filter(s => s.id !== id);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    logAdminAction("Service Deleted", id, "Service removed from active catalog");
  }
}

// Required Documents
export function getRequiredDocuments(): RequiredDocument[] {
  if (!isClient()) return initialDocuments;
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
  return stored ? JSON.parse(stored) : initialDocuments;
}

export function saveRequiredDocument(doc: RequiredDocument): RequiredDocument {
  const docs = getRequiredDocuments();
  const index = docs.findIndex(d => d.id === doc.id);
  if (index >= 0) {
    docs[index] = doc;
  } else {
    docs.unshift(doc);
  }
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
    logAdminAction("Document Bank Updated", doc.name, `Category: ${doc.category}`);
  }
  return doc;
}

export function deleteRequiredDocument(id: string) {
  const docs = getRequiredDocuments().filter(d => d.id !== id);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(docs));
    logAdminAction("Document Bank Deleted", id, "Document removed from template library");
  }
}

// Cases
export function getCases(): UserCase[] {
  if (!isClient()) return initialCases;
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.CASES);
  return stored ? JSON.parse(stored) : initialCases;
}

export function getCaseById(id: string): UserCase | undefined {
  const cases = getCases();
  return cases.find(c => c.id === id);
}

export function createCase(newCase: Omit<UserCase, "id" | "createdAt" | "updatedAt">): UserCase {
  const cases = getCases();
  const caseId = `case-${Date.now().toString().slice(-6)}`;
  const created: UserCase = {
    ...newCase,
    id: caseId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  cases.unshift(created);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
    window.dispatchEvent(new Event("sahulat_cases_updated"));
  }
  return created;
}

export function updateCase(id: string, updates: Partial<UserCase>): UserCase | undefined {
  const cases = getCases();
  const index = cases.findIndex(c => c.id === id);
  if (index === -1) return undefined;

  const current = cases[index];
  const updated: UserCase = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  // Recalculate progress percent if status changed
  if (updates.status && !updates.progressPercent) {
    const statusMap: Record<CaseStatus, number> = {
      "Not Started": 10,
      "Documents Pending": 30,
      "Ready to Submit": 50,
      "Submitted": 70,
      "Under Review": 85,
      "Completed": 100
    };
    updated.progressPercent = statusMap[updates.status] || updated.progressPercent;
  }

  cases[index] = updated;
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
    window.dispatchEvent(new Event("sahulat_cases_updated"));
  }
  return updated;
}

export function deleteCase(id: string) {
  const cases = getCases().filter(c => c.id !== id);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
    window.dispatchEvent(new Event("sahulat_cases_updated"));
  }
}

// User Documents
export function getUserDocuments(): UserDocument[] {
  if (!isClient()) return initialUserDocuments;
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.USER_DOCUMENTS);
  return stored ? JSON.parse(stored) : initialUserDocuments;
}

export function addUserDocument(doc: Omit<UserDocument, "id" | "uploadedAt">): UserDocument {
  const docs = getUserDocuments();
  const newDoc: UserDocument = {
    ...doc,
    id: `udoc-${Date.now().toString().slice(-6)}`,
    uploadedAt: new Date().toISOString().split("T")[0]
  };
  docs.unshift(newDoc);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.USER_DOCUMENTS, JSON.stringify(docs));
    window.dispatchEvent(new Event("sahulat_docs_updated"));
  }
  return newDoc;
}

export function deleteUserDocument(id: string) {
  const docs = getUserDocuments().filter(d => d.id !== id);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.USER_DOCUMENTS, JSON.stringify(docs));
    window.dispatchEvent(new Event("sahulat_docs_updated"));
  }
}

// Offices
export function getOffices(): OfficeLocation[] {
  if (!isClient()) return initialOffices;
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.OFFICES);
  return stored ? JSON.parse(stored) : initialOffices;
}

export function saveOffice(office: OfficeLocation): OfficeLocation {
  const offices = getOffices();
  const index = offices.findIndex(o => o.id === office.id);
  if (index >= 0) {
    offices[index] = office;
  } else {
    offices.unshift(office);
  }
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.OFFICES, JSON.stringify(offices));
    logAdminAction("Office Location Saved", office.name, office.city);
  }
  return office;
}

export function deleteOffice(id: string) {
  const offices = getOffices().filter(o => o.id !== id);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.OFFICES, JSON.stringify(offices));
    logAdminAction("Office Location Removed", id, "Office deleted from directory");
  }
}

// Reminders
export function getReminders(): Reminder[] {
  if (!isClient()) return initialReminders;
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.REMINDERS);
  return stored ? JSON.parse(stored) : initialReminders;
}

export function addReminder(reminder: Omit<Reminder, "id">): Reminder {
  const reminders = getReminders();
  const created: Reminder = {
    ...reminder,
    id: `rem-${Date.now().toString().slice(-6)}`
  };
  reminders.unshift(created);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
    window.dispatchEvent(new Event("sahulat_reminders_updated"));
  }
  return created;
}

export function toggleReminderComplete(id: string): Reminder | undefined {
  const reminders = getReminders();
  const index = reminders.findIndex(r => r.id === id);
  if (index === -1) return undefined;
  reminders[index].isCompleted = !reminders[index].isCompleted;
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
    window.dispatchEvent(new Event("sahulat_reminders_updated"));
  }
  return reminders[index];
}

export function deleteReminder(id: string) {
  const reminders = getReminders().filter(r => r.id !== id);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
    window.dispatchEvent(new Event("sahulat_reminders_updated"));
  }
}

// Community Tips
export function getCommunityTips(): CommunityTip[] {
  if (!isClient()) return initialTips;
  initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.TIPS);
  return stored ? JSON.parse(stored) : initialTips;
}

export function upvoteTip(id: string): CommunityTip | undefined {
  const tips = getCommunityTips();
  const index = tips.findIndex(t => t.id === id);
  if (index === -1) return undefined;
  tips[index].upvotes += 1;
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(tips));
    window.dispatchEvent(new Event("sahulat_tips_updated"));
  }
  return tips[index];
}

export function addCommunityTip(tip: Omit<CommunityTip, "id" | "upvotes" | "createdAt" | "commentsCount">): CommunityTip {
  const tips = getCommunityTips();
  const created: CommunityTip = {
    ...tip,
    id: `tip-${Date.now().toString().slice(-6)}`,
    upvotes: 1,
    createdAt: "Just now",
    commentsCount: 0
  };
  tips.unshift(created);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(tips));
    window.dispatchEvent(new Event("sahulat_tips_updated"));
  }
  return created;
}

export function deleteCommunityTip(id: string) {
  const tips = getCommunityTips().filter(t => t.id !== id);
  if (isClient()) {
    localStorage.setItem(STORAGE_KEYS.TIPS, JSON.stringify(tips));
    logAdminAction("Community Tip Removed", id, "Flagged content removed");
  }
}

// Admin logs
export function getAdminLogs(): AdminLog[] {
  if (!isClient()) return [];
  const stored = localStorage.getItem(STORAGE_KEYS.ADMIN_LOGS);
  return stored ? JSON.parse(stored) : [];
}

export function logAdminAction(action: string, target: string, details: string) {
  if (!isClient()) return;
  const logs = getAdminLogs();
  const profile = getUserProfile();
  logs.unshift({
    id: `log-${Date.now()}`,
    adminName: profile.name || "Admin Officer",
    action,
    target,
    timestamp: new Date().toISOString(),
    details
  });
  localStorage.setItem(STORAGE_KEYS.ADMIN_LOGS, JSON.stringify(logs.slice(0, 50)));
}

