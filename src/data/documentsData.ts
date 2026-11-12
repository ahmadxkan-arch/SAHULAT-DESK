import { RequiredDocument } from "@/types";

export const initialDocuments: RequiredDocument[] = [
  {
    id: "doc-cnic-original",
    name: "Original CNIC / Smart Card",
    nameUrdu: "اصل قومی شناختی کارڈ",
    description: "Original valid or expired National Identity Card issued by NADRA.",
    isMandatory: true,
    category: "Identity",
    issuingAuthority: "NADRA",
    notes: "Must be presented at physical counters for biometric verification."
  },
  {
    id: "doc-cnic-copy",
    name: "Attested CNIC Photocopies (2 copies)",
    nameUrdu: "تصدیق شدہ شناختی کارڈ کاپی (2 عدد)",
    description: "Clear photocopies of front and back of CNIC, attested by a Grade 17+ gazetted officer.",
    isMandatory: true,
    category: "Identity",
    issuingAuthority: "NADRA / Gazetted Officer",
    notes: "Attestation stamp must show officer's name, designation, and department."
  },
  {
    id: "doc-father-cnic",
    name: "Father / Guardian's CNIC Copy",
    nameUrdu: "والد یا سرپرست کے شناختی کارڈ کی کاپی",
    description: "Valid CNIC copy of father, husband, or legal guardian.",
    isMandatory: true,
    category: "Identity",
    issuingAuthority: "NADRA",
    notes: "In case father is deceased, Death Certificate is also required."
  },
  {
    id: "doc-frc",
    name: "Family Registration Certificate (FRC)",
    nameUrdu: "فیملی رجسٹریشن سرٹیفکیٹ",
    description: "NADRA FRC proving lineage or marriage ties.",
    isMandatory: false,
    category: "Identity",
    issuingAuthority: "NADRA",
    notes: "Obtainable from NADRA center or Pak-ID app."
  },
  {
    id: "doc-birth-cert",
    name: "Union Council Birth Certificate",
    nameUrdu: "یونین کونسل پیدائش سرٹیفکیٹ",
    description: "Computerized Birth Certificate with registration number issued by local Union Council.",
    isMandatory: true,
    category: "Legal",
    issuingAuthority: "Local Union Council / Cantonment Board",
    notes: "Manual certificates need computerized replacement."
  },
  {
    id: "doc-photos-passport",
    name: "Passport Size Photographs (Blue / White background)",
    nameUrdu: "پاسپورٹ سائز تصاویر (نیلا یا سفید بیک گراؤنڈ)",
    description: "Recent color photographs with clear facial view, taken within last 3 months.",
    isMandatory: true,
    category: "Photograph",
    issuingAuthority: "Registered Studio",
    notes: "Usually 4 to 6 photos with one or two attested on the back."
  },
  {
    id: "doc-matric-sanad",
    name: "Matriculation (SSC) Certificate / Sanad",
    nameUrdu: "میٹرک کی اصل سند یا رزلٹ کارڈ",
    description: "Original SSC Sanad or Result Card verifying date of birth and schooling.",
    isMandatory: true,
    category: "Academic",
    issuingAuthority: "BISE Board of Intermediate and Secondary Education",
    notes: "Required for Domicile, Character Certificate, and Degree Verification."
  },
  {
    id: "doc-inter-sanad",
    name: "Intermediate (HSSC) Certificate",
    nameUrdu: "انٹر میڈیٹ سند",
    description: "Higher Secondary Certificate from recognized Board.",
    isMandatory: false,
    category: "Academic",
    issuingAuthority: "BISE Board",
    notes: "Required for university admissions and scholarships."
  },
  {
    id: "doc-degree-original",
    name: "Original University Degree & Transcripts",
    nameUrdu: "اصل ڈگری اور تمام سمسٹرز کے ٹرانسکرپٹ",
    description: "Official terminal degree and official transcripts issued by university registrar.",
    isMandatory: true,
    category: "Academic",
    issuingAuthority: "HEC Recognized University",
    notes: "Ensure all semesters have corresponding grade sheets."
  },
  {
    id: "doc-affidavit-stamp",
    name: "Undertaking / Affidavit on Stamp Paper (Rs. 50/100)",
    nameUrdu: "بیان حلفی بمطابق اسٹامپ پیپر",
    description: "Legal affidavit on government stamped e-stamp paper attested by Oath Commissioner.",
    isMandatory: true,
    category: "Legal",
    issuingAuthority: "District Court / Oath Commissioner",
    notes: "Stating no dual domicile or confirming truthfulness of facts."
  },
  {
    id: "doc-utility-bill",
    name: "Recent Utility Bill (Electricity / Gas / Water)",
    nameUrdu: "حالیہ بجلی، گیس یا پانی کا بل",
    description: "Paid utility bill of applicant's residential address not older than 2 months.",
    isMandatory: true,
    category: "Legal",
    issuingAuthority: "DISCO (IESCO/LESCO/K-Electric) or SNGPL/SSGC",
    notes: "Proof of residence in the applied district."
  },
  {
    id: "doc-challan-paid",
    name: "Paid Bank Challan Receipt",
    nameUrdu: "بینک میں جمع شدہ اصل چالان رسید",
    description: "Original bank stamped challan copy verifying fee payment into government treasury.",
    isMandatory: true,
    category: "Financial",
    issuingAuthority: "National Bank of Pakistan (NBP) / State Bank / e-Pay",
    notes: "Always keep a photocopy for personal record before submitting original."
  },
  {
    id: "doc-medical-fitness",
    name: "Medical Fitness Certificate (Form B)",
    nameUrdu: "میڈیکل فٹنس سرٹیفکیٹ",
    description: "Signed physical fitness and eye examination certificate by registered medical practitioner.",
    isMandatory: true,
    category: "Legal",
    issuingAuthority: "Designated DHQ/THQ Hospital or Licensing Doctor",
    notes: "Required for Driving License application."
  },
  {
    id: "doc-police-report",
    name: "Local Police Station Clearance Report",
    nameUrdu: "پولیس اسٹیشن کریکٹر یا کلیئرنس رپورٹ",
    description: "Police verification report confirming no criminal records exist in district.",
    isMandatory: true,
    category: "Legal",
    issuingAuthority: "District Police / Police Khidmat Markaz",
    notes: "Issued after physical field officer verification."
  },
  {
    id: "doc-salary-slip",
    name: "Salary Slip / Proof of Income / Guardian Bank Statement",
    nameUrdu: "سیلری سلپ یا آمدن کا ثبوت",
    description: "Employer salary certificate or last 6 months bank statement showing financial status.",
    isMandatory: false,
    category: "Financial",
    issuingAuthority: "Employer / Commercial Bank",
    notes: "Crucial for scholarship applications and tax registration."
  },
  {
    id: "doc-tenant-agreement",
    name: "Registered Rent / Tenancy Agreement",
    nameUrdu: "رجسٹرڈ کرایہ نامہ",
    description: "Tenancy contract between property owner and tenant with witness CNICs.",
    isMandatory: true,
    category: "Legal",
    issuingAuthority: "Notary Public / Stamp Vendor",
    notes: "Mandatory for Tenant Police Verification."
  },
  {
    id: "doc-old-passport",
    name: "Original Previous Passport (if renewal)",
    nameUrdu: "سابقہ اصل پاسپورٹ",
    description: "Old booklet passport for stamping cancellation upon renewal.",
    isMandatory: false,
    category: "Identity",
    issuingAuthority: "Directorate General of Immigration & Passports",
    notes: "If lost, Police FIR copy is mandatory instead."
  },
  {
    id: "doc-tax-fbr-form",
    name: "FBR Registration 181 Form",
    nameUrdu: "ایف بی آر انکم ٹیکس فارم 181",
    description: "National Tax Number enrollment application printout from Iris portal.",
    isMandatory: true,
    category: "Application",
    issuingAuthority: "Federal Board of Revenue (FBR)",
    notes: "Required for active taxpayer status and business bank accounts."
  },
  {
    id: "doc-university-noc",
    name: "University No Objection Certificate (NOC)",
    nameUrdu: "یونیورسٹی این او سی سرٹیفکیٹ",
    description: "NOC from departmental head or registrar for migration or external studies.",
    isMandatory: false,
    category: "Academic",
    issuingAuthority: "University Registrar Office",
    notes: "Confirms student has no pending dues or disciplinary issues."
  },
  {
    id: "doc-neighbor-witness",
    name: "Two Respected Neighborhood Witnesses CNICs",
    nameUrdu: "محلے کے دو معزز گواہان کے شناختی کارڈ",
    description: "Copies of CNICs and contact numbers of two permanent residents of the area.",
    isMandatory: true,
    category: "Identity",
    issuingAuthority: "Local Witnesses",
    notes: "Often called to verify applicant during police or domicile inquiry."
  },
  {
    id: "doc-character-form",
    name: "Prescribed Character Certificate Application Form",
    nameUrdu: "کریکٹر سرٹیفکیٹ درخواست فارم",
    description: "Standard application form signed by applicant and counter-signed by area councilor/notable.",
    isMandatory: true,
    category: "Application",
    issuingAuthority: "Khidmat Markaz / Police Office",
    notes: "Available online or at facilitation counter."
  },
  {
    id: "doc-hec-application",
    name: "HEC Degree Attestation Application Form",
    nameUrdu: "ایچ ای سی ڈگری تصدیق فارم",
    description: "Online generated summary slip with unique barcode from eportal.hec.gov.pk.",
    isMandatory: true,
    category: "Application",
    issuingAuthority: "Higher Education Commission (HEC)",
    notes: "Must be signed and enclosed with courier bag or presented in walk-in."
  }
];

