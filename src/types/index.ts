export type CaseStatus = 
  | "Not Started"
  | "Documents Pending"
  | "Ready to Submit"
  | "Submitted"
  | "Under Review"
  | "Completed";

export type UserRole = "guest" | "user" | "admin";

export type ServiceCategory = 
  | "Identity & Civil"
  | "Education & Academics"
  | "Police & Verification"
  | "Transport & Travel"
  | "Taxation & Finance"
  | "Complaints & Civic";

export interface ServiceStep {
  stepNumber: number;
  title: string;
  titleUrdu?: string;
  description: string;
  descriptionUrdu?: string;
  location?: string;
  duration?: string;
  fee?: number;
  tips?: string;
}

export interface RequiredDocument {
  id: string;
  name: string;
  nameUrdu?: string;
  description: string;
  isMandatory: boolean;
  category: "Identity" | "Academic" | "Financial" | "Legal" | "Photograph" | "Application";
  issuingAuthority: string;
  notes?: string;
}

export interface Service {
  id: string;
  title: string;
  titleUrdu: string;
  category: ServiceCategory;
  description: string;
  descriptionUrdu: string;
  estimatedFee: string;
  feeAmount: number;
  processingTime: string;
  officialPortalUrl?: string;
  popular?: boolean;
  iconName: string;
  steps: ServiceStep[];
  requiredDocumentIds: string[];
  eligibleCities: string[];
  department: string;
  faqIds: string[];
}

export interface UserCase {
  id: string;
  userId: string;
  serviceId: string;
  serviceTitle: string;
  serviceCategory: ServiceCategory;
  city: string;
  purpose: string;
  applicantType: string;
  status: CaseStatus;
  progressPercent: number;
  createdAt: string;
  updatedAt: string;
  targetDate?: string;
  trackingNumber?: string;
  selectedDocumentIds: string[];
  completedStepNumbers: number[];
  notes?: string;
}

export interface UserDocument {
  id: string;
  userId: string;
  caseId?: string;
  name: string;
  category: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  fileType: string;
  dataUrl?: string;
  status: "Verified" | "Pending Review" | "Uploaded";
}

export interface OfficeLocation {
  id: string;
  name: string;
  nameUrdu?: string;
  serviceCategory: ServiceCategory;
  department: string;
  city: string;
  address: string;
  timings: string;
  phone: string;
  email?: string;
  mapUrl: string;
  servicesProvided: string[];
}

export interface FAQ {
  id: string;
  question: string;
  questionUrdu: string;
  answer: string;
  answerUrdu: string;
  category: string;
  relatedServiceId?: string;
}

export interface CommunityTip {
  id: string;
  authorName: string;
  authorRole: string;
  serviceId: string;
  serviceName: string;
  title: string;
  content: string;
  city: string;
  upvotes: number;
  isVerified: boolean;
  createdAt: string;
  commentsCount: number;
}

export interface Reminder {
  id: string;
  userId: string;
  caseId?: string;
  caseTitle?: string;
  title: string;
  dueDate: string;
  dueTime?: string;
  priority: "High" | "Medium" | "Low";
  isCompleted: boolean;
  type: "document" | "challan" | "visit" | "followup";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  city: string;
  phone?: string;
  avatarUrl?: string;
  joinedAt: string;
}

export interface AdminLog {
  id: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}

