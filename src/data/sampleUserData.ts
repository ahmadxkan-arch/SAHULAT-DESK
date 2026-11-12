import { UserDocument, Reminder, UserProfile } from "@/types";

export const initialUserProfile: UserProfile = {
  id: "usr-demo-1",
  name: "Muhammad Ali Raza",
  email: "ali.raza@example.pk",
  role: "user",
  city: "Islamabad",
  phone: "+92 300 1234567",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  joinedAt: "August 2026"
};

export const initialUserDocuments: UserDocument[] = [
  {
    id: "udoc-1",
    userId: "usr-demo-1",
    caseId: "case-101",
    name: "Scanned CNIC Front & Back",
    category: "Identity",
    fileName: "CNIC_Ali_Raza_Scan.pdf",
    fileSize: "1.4 MB",
    uploadedAt: "2026-10-15",
    fileType: "application/pdf",
    status: "Verified"
  },
  {
    id: "udoc-2",
    userId: "usr-demo-1",
    caseId: "case-102",
    name: "Matriculation Sanad BISE",
    category: "Academic",
    fileName: "Matric_Sanad_Original.pdf",
    fileSize: "2.1 MB",
    uploadedAt: "2026-11-02",
    fileType: "application/pdf",
    status: "Verified"
  },
  {
    id: "udoc-3",
    userId: "usr-demo-1",
    caseId: "case-102",
    name: "IESCO Electricity Bill Oct 2026",
    category: "Legal",
    fileName: "IESCO_Bill_Oct2026.jpg",
    fileSize: "840 KB",
    uploadedAt: "2026-11-03",
    fileType: "image/jpeg",
    status: "Verified"
  },
  {
    id: "udoc-4",
    userId: "usr-demo-1",
    caseId: "case-103",
    name: "Driving Learner Permit Slip",
    category: "Legal",
    fileName: "DLIMS_Learner_Permit.pdf",
    fileSize: "620 KB",
    uploadedAt: "2026-10-20",
    fileType: "application/pdf",
    status: "Verified"
  },
  {
    id: "udoc-5",
    userId: "usr-demo-1",
    caseId: "case-104",
    name: "Blue Background Passport Photographs",
    category: "Photograph",
    fileName: "Passport_Photos_Blue_Bg.jpg",
    fileSize: "1.2 MB",
    uploadedAt: "2026-11-06",
    fileType: "image/jpeg",
    status: "Verified"
  },
  {
    id: "udoc-6",
    userId: "usr-demo-1",
    caseId: "case-105",
    name: "BS Computer Science Official Transcript",
    category: "Academic",
    fileName: "NUST_BSCS_Transcript.pdf",
    fileSize: "3.4 MB",
    uploadedAt: "2026-11-09",
    fileType: "application/pdf",
    status: "Pending Review"
  }
];

export const initialReminders: Reminder[] = [
  {
    id: "rem-1",
    userId: "usr-demo-1",
    caseId: "case-103",
    caseTitle: "Driving License (Learner & Permanent)",
    title: "Appear for Practical Driving Road Test at Traffic Ground",
    dueDate: "2026-11-17",
    dueTime: "09:00 AM",
    priority: "High",
    isCompleted: false,
    type: "visit"
  },
  {
    id: "rem-2",
    userId: "usr-demo-1",
    caseId: "case-104",
    caseTitle: "Character Certificate",
    title: "Submit verified file to Police Khidmat Markaz F-6 counter",
    dueDate: "2026-11-13",
    dueTime: "10:30 AM",
    priority: "High",
    isCompleted: false,
    type: "document"
  },
  {
    id: "rem-3",
    userId: "usr-demo-1",
    caseId: "case-102",
    caseTitle: "Domicile Certificate",
    title: "Follow up with e-Khidmat Markaz tracking portal",
    dueDate: "2026-11-15",
    dueTime: "02:00 PM",
    priority: "Medium",
    isCompleted: false,
    type: "followup"
  },
  {
    id: "rem-4",
    userId: "usr-demo-1",
    caseId: "case-106",
    caseTitle: "National Tax Number (NTN)",
    title: "Obtain electricity bill consumer reference number",
    dueDate: "2026-11-18",
    dueTime: "05:00 PM",
    priority: "Low",
    isCompleted: false,
    type: "document"
  }
];

