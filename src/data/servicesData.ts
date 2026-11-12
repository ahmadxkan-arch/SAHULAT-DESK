import { Service } from "@/types";

export const initialServices: Service[] = [
  {
    id: "cnic-renewal",
    title: "CNIC / Smart Card Renewal",
    titleUrdu: "شناختی کارڈ تجدید اور اسمارٹ کارڈ",
    category: "Identity & Civil",
    description: "Renew an expired or expiring computerized National Identity Card (CNIC) or upgrade to an chip-based Smart National Identity Card (SNIC).",
    descriptionUrdu: "میعاد ختم ہونے والے شناختی کارڈ کی تجدید کروائیں یا جدید چپ والے اسمارٹ کارڈ میں تبدیل کریں۔",
    estimatedFee: "Rs. 750 (Normal) / Rs. 1,500 (Urgent) / Rs. 2,500 (Executive)",
    feeAmount: 750,
    processingTime: "Normal: 15-20 days | Urgent: 7-10 days | Executive: 3-5 days",
    officialPortalUrl: "https://id.nadra.gov.pk",
    popular: true,
    iconName: "CreditCard",
    department: "National Database and Registration Authority (NADRA)",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Peshawar", "Quetta", "Faisalabad", "Multan", "All Pakistan"],
    requiredDocumentIds: [
      "doc-cnic-original",
      "doc-cnic-copy",
      "doc-father-cnic",
      "doc-photos-passport"
    ],
    faqIds: ["faq-cnic-1", "faq-cnic-2", "faq-cnic-3"],
    steps: [
      {
        stepNumber: 1,
        title: "Visit NADRA Mega Center or Open Pak-ID App",
        titleUrdu: "نادرا میگا سینٹر جائیں یا پاک آئی ڈی ایپ کھولیں",
        description: "You can apply physically at any NADRA Facilitation / Mega Center or apply online using the Pak-ID official mobile app.",
        location: "Nearest NADRA Registration Center",
        duration: "10-30 mins",
        tips: "Executive centers have shorter token queues. Morning 8:00 AM to 10:00 AM has shortest rush."
      },
      {
        stepNumber: 2,
        title: "Obtain Token and Pay Required Fee",
        titleUrdu: "ٹوکن حاصل کریں اور فیس جمع کروائیں",
        description: "Choose processing speed (Normal, Urgent, or Executive) and pay fee directly at the NADRA counter via Cash, Debit/Credit Card, or EasyPaisa.",
        fee: 750,
        duration: "15 mins"
      },
      {
        stepNumber: 3,
        title: "Biometric Data & Photograph Capture",
        titleUrdu: "بائیو میٹرک تصدیق اور تصویر بنوائیں",
        description: "NADRA desk officer will capture digital facial photo, digital fingerprints of all ten fingers, and digital signature.",
        duration: "10 mins"
      },
      {
        stepNumber: 4,
        title: "Data Verification & Printed Form Attestation",
        titleUrdu: "ڈیٹا کی تصدیق اور فارم پر دستخط",
        description: "Review all personal particulars printed on the summary form (address, spelling of names, marital status). If renewal without changes, attestation is waived if family member is present.",
        duration: "10 mins"
      },
      {
        stepNumber: 5,
        title: "Card Printing & Delivery via Courier / Collection",
        titleUrdu: "کارڈ کی تیاری اور ترسیل",
        description: "You will receive SMS notification from 8500 or 8400. Collect your card from the center or receive it at your doorstep if postal delivery was selected.",
        duration: "7 - 20 days"
      }
    ]
  },
  {
    id: "domicile-certificate",
    title: "Domicile Certificate",
    titleUrdu: "ڈومیسائل سرٹیفکیٹ کا حصول",
    category: "Identity & Civil",
    description: "Proof of permanent district residency required for government job applications, provincial university admissions, and quotas.",
    descriptionUrdu: "سرکاری ملازمتوں اور یونیورسٹی داخلوں کے لیے مستقل ضلعی رہائش کا ثبوت حاصل کریں۔",
    estimatedFee: "Rs. 200 - 500 (Stamp Duty & Processing)",
    feeAmount: 350,
    processingTime: "5 to 10 working days",
    officialPortalUrl: "https://e.punjab.gov.pk",
    popular: true,
    iconName: "FileCheck",
    department: "Deputy Commissioner Office / Citizen Facilitation Center (e-Khidmat Markaz)",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Peshawar", "Quetta", "Faisalabad"],
    requiredDocumentIds: [
      "doc-cnic-copy",
      "doc-father-cnic",
      "doc-matric-sanad",
      "doc-utility-bill",
      "doc-photos-passport",
      "doc-affidavit-stamp",
      "doc-challan-paid"
    ],
    faqIds: ["faq-dom-1", "faq-dom-2"],
    steps: [
      {
        stepNumber: 1,
        title: "Purchase Judicial Stamp Paper and Draft Affidavit",
        titleUrdu: "اسٹامپ پیپر خریدیں اور بیان حلفی تیار کروائیں",
        description: "Obtain an e-stamp paper (worth Rs. 50 to 100) from stamp vendor affirming that you do not hold any other district domicile.",
        location: "Kachehri / e-Stamp Center",
        fee: 100,
        duration: "30 mins"
      },
      {
        stepNumber: 2,
        title: "Pay Domicile Treasury Challan (Form 32-A)",
        titleUrdu: "سرکاری خزانہ چالان فارم 32-A جمع کروائیں",
        description: "Deposit the official government domicile fee in National Bank of Pakistan (NBP) or State Bank under Head C02636.",
        location: "National Bank of Pakistan (NBP)",
        fee: 200,
        duration: "45 mins"
      },
      {
        stepNumber: 3,
        title: "Attestation by Grade 17+ Officer",
        titleUrdu: "گریڈ 17 افسر سے دستاویزات تصدیق کروائیں",
        description: "Get the application form and copies of CNIC, Matric Sanad, and photos attested by a gazetted government officer.",
        duration: "1 day"
      },
      {
        stepNumber: 4,
        title: "Submit File at e-Khidmat Markaz or AC/DC Office",
        titleUrdu: "ای خدمت مرکز یا ڈی سی دفتر میں فائل جمع کروائیں",
        description: "Submit all organized documents at the facilitation desk. Officer inspects original documents and issues tracking slip.",
        location: "e-Khidmat Markaz or Assistant Commissioner Office",
        duration: "30 mins"
      },
      {
        stepNumber: 5,
        title: "Police / Tehsildar Verification & Collection",
        titleUrdu: "تحصیلدار اور پولیس انکوائری کے بعد ڈومیسائل وصولی",
        description: "The application is verified by the local Patwari/Tehsildar. Once signed by Deputy Commissioner, collect your original laminated Domicile.",
        duration: "5-7 days"
      }
    ]
  },
  {
    id: "character-certificate",
    title: "Character Certificate",
    titleUrdu: "پولیس کریکٹر سرٹیفکیٹ",
    category: "Police & Verification",
    description: "Official police character certificate certifying that the applicant has no criminal record; essential for foreign visa and employment.",
    descriptionUrdu: "ویزہ، نوکری اور بیرون ملک سفر کے لیے تصدیق شدہ پولیس کریکٹر سرٹیفکیٹ۔",
    estimatedFee: "Rs. 350 - 500",
    feeAmount: 400,
    processingTime: "3 to 7 working days",
    officialPortalUrl: "https://pkm.punjab.gov.pk",
    popular: true,
    iconName: "ShieldCheck",
    department: "District Police / Police Khidmat Markaz (PKM)",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Peshawar", "Quetta", "Multan"],
    requiredDocumentIds: [
      "doc-cnic-original",
      "doc-cnic-copy",
      "doc-photos-passport",
      "doc-neighbor-witness",
      "doc-utility-bill",
      "doc-character-form"
    ],
    faqIds: ["faq-char-1", "faq-char-2"],
    steps: [
      {
        stepNumber: 1,
        title: "Visit Police Khidmat Markaz (PKM)",
        titleUrdu: "پولیس خدمت مرکز کا دورہ کریں",
        description: "Walk in to your district Police Khidmat Markaz. Take a token for 'Character Certificate'.",
        location: "Nearest Police Khidmat Markaz",
        duration: "15 mins"
      },
      {
        stepNumber: 2,
        title: "Biometric and Document Submission",
        titleUrdu: "بائیو میٹرک اور دستاویزات کی جانچ",
        description: "Present original CNIC, photocopies, passport copy (if for abroad), and submit two reference contact details from your neighborhood.",
        duration: "20 mins",
        fee: 350
      },
      {
        stepNumber: 3,
        title: "Field Officer Police Station Inquiry",
        titleUrdu: "متعلقہ تھانہ سے تصدیق اور انکوائری",
        description: "PKM routes digital verification request to the local police station (Thana) of your residence. Beat officer confirms resident history.",
        duration: "2-3 days"
      },
      {
        stepNumber: 4,
        title: "Senior Superintendent Police (SSP) Sign-off & Delivery",
        titleUrdu: "ایس ایس پی دستخط کے بعد سرٹیفکیٹ وصول کریں",
        description: "Once cleared, the certificate with QR-code security seal is issued. You will receive an SMS when it is ready for collection or courier.",
        duration: "1-2 days"
      }
    ]
  },
  {
    id: "police-verification",
    title: "Police Tenant & Staff Verification",
    titleUrdu: "کرایہ دار اور ملازم پولیس تصدیق",
    category: "Police & Verification",
    description: "Mandatory verification for landlords, tenants, domestic workers, and private company employees under National Action Plan regulations.",
    descriptionUrdu: "کرایہ داروں، گھریلو ملازمین اور پرائیویٹ عملے کی لازمی قانونی پولیس جانچ۔",
    estimatedFee: "Free of cost / Rs. 100 nominal fee",
    feeAmount: 100,
    processingTime: "1 to 3 working days",
    officialPortalUrl: "https://punjabpolice.gov.pk",
    popular: false,
    iconName: "UserCheck",
    department: "District Police Station / Police Khidmat Markaz",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Peshawar", "Quetta"],
    requiredDocumentIds: [
      "doc-cnic-copy",
      "doc-father-cnic",
      "doc-tenant-agreement",
      "doc-photos-passport",
      "doc-utility-bill"
    ],
    faqIds: ["faq-police-1"],
    steps: [
      {
        stepNumber: 1,
        title: "Prepare Rental Agreement or Employment Letter",
        titleUrdu: "کرایہ نامہ یا ملازمت کا خط تیار کریں",
        description: "Ensure the rent agreement has valid CNICs of landlord, tenant, and two witnesses.",
        duration: "1 hour"
      },
      {
        stepNumber: 2,
        title: "Submit Data at Khidmat Markaz or Online Police App",
        titleUrdu: "پولیس خدمت مرکز یا ایپ پر اندراج کروائیں",
        description: "Both landlord/employer and tenant/employee can register through Khidmat Markaz desk or provincial police smartphone app.",
        fee: 100,
        duration: "20 mins"
      },
      {
        stepNumber: 3,
        title: "System Criminal Database Background Check",
        titleUrdu: "کرائم ریکارڈ مینجمنٹ سسٹم میں اسکریننگ",
        description: "Automated scan against PSRMS (Police Station Record Management System) and anti-terror watchlists.",
        duration: "24 hours"
      },
      {
        stepNumber: 4,
        title: "Receipt of Verification Certificate / Acknowledgement",
        titleUrdu: "تصدیقی رسید اور کلیرنس سرٹیفکیٹ حاصل کریں",
        description: "Collect the verified clearance acknowledgement to prevent any legal notices or unexpected raids.",
        duration: "1 day"
      }
    ]
  },
  {
    id: "driving-license",
    title: "Driving License (Learner & Permanent)",
    titleUrdu: "ڈرائیونگ لائسنس (لرنر اور مستقل لائسنس)",
    category: "Transport & Travel",
    description: "Complete procedure to obtain Motorcar/Motorcycle Learner driving permit followed by computer theoretical test and practical driving road test.",
    descriptionUrdu: "موٹر سائیکل اور گاڑی کا لرنر پرمٹ، کمپیوٹر تھیوری ٹیسٹ اور پریکٹیکل ڈرائیونگ ٹیسٹ کا مکمل طریقہ کار۔",
    estimatedFee: "Learner: Rs. 60-100 | Permanent 5-Year: Rs. 1,500 - 2,500",
    feeAmount: 1800,
    processingTime: "Learner: Same Day | Permanent: 42 days after Learner",
    officialPortalUrl: "https://dlims.punjab.gov.pk",
    popular: true,
    iconName: "Car",
    department: "City Traffic Police / DLIMS Facilitation Center",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Peshawar", "Quetta", "Faisalabad", "Multan"],
    requiredDocumentIds: [
      "doc-cnic-original",
      "doc-cnic-copy",
      "doc-photos-passport",
      "doc-medical-fitness",
      "doc-challan-paid"
    ],
    faqIds: ["faq-dl-1", "faq-dl-2"],
    steps: [
      {
        stepNumber: 1,
        title: "Learner Permit Issuance (Instant)",
        titleUrdu: "لرنر پرمٹ کا فوری حصول",
        description: "Visit any Traffic Police center or generate online via DLIMS portal with your CNIC and photo. Valid for 6 months.",
        location: "DLIMS Online / Traffic Markaz",
        fee: 100,
        duration: "10 mins"
      },
      {
        stepNumber: 2,
        title: "Mandatory 42 Days Practice Period",
        titleUrdu: "42 دن کی لازمی ڈرائیونگ پریکٹس",
        description: "Government law requires a mandatory 42 days cool-off period after learner permit before scheduling permanent road test.",
        duration: "42 days"
      },
      {
        stepNumber: 3,
        title: "Computerized Sign & Theory Test",
        titleUrdu: "کمپیوٹر ٹریفک سائن اور تھیوری ٹیسٹ",
        description: "Appear for touchscreen multiple choice test regarding traffic road signs, right of way, and safety regulations (minimum 80% passing mark).",
        duration: "15 mins"
      },
      {
        stepNumber: 4,
        title: "Practical Driving Track Test",
        titleUrdu: "میدانی پریکٹیکل ڈرائیونگ ٹیسٹ",
        description: "Drive vehicle through parallel parking and reverse 'L' track without touching safety cones.",
        location: "Traffic Police Test Ground",
        duration: "20 mins"
      },
      {
        stepNumber: 5,
        title: "License Print & Delivery via Pakistan Post",
        titleUrdu: "لائسنس کارڈ پرنٹنگ اور بذریعہ ڈاک ترسیل",
        description: "After clearing both tests, your Smart Driving License will be delivered to your postal address via registered post.",
        fee: 1700,
        duration: "7-14 days"
      }
    ]
  },
  {
    id: "university-documents",
    title: "University Degree & Transcript Issuance",
    titleUrdu: "یونیورسٹی ڈگری، ٹرانسکرپٹ اور این او سی کا اجرا",
    category: "Education & Academics",
    description: "Guidance for final year students and alumni to apply for official terminal transcripts, provisional certificates, urgent degree issuance, and migration NOC.",
    descriptionUrdu: "فائنل سال کے طلبہ اور فارغ التحصیل طلبا کے لیے ڈگری، ٹرانسکرپٹ اور کلیئرنس کا طریقہ۔",
    estimatedFee: "Transcript: Rs. 1,000 - 2,500 | Degree: Rs. 3,000 - 8,000",
    feeAmount: 3500,
    processingTime: "Normal: 3-4 weeks | Urgent: 7-10 working days",
    officialPortalUrl: "https://hec.gov.pk",
    popular: true,
    iconName: "GraduationCap",
    department: "University Controller of Examinations & Registrar Office",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Peshawar", "Quetta", "All Universities"],
    requiredDocumentIds: [
      "doc-cnic-copy",
      "doc-matric-sanad",
      "doc-inter-sanad",
      "doc-photos-passport",
      "doc-challan-paid",
      "doc-university-noc"
    ],
    faqIds: ["faq-uni-1", "faq-uni-2"],
    steps: [
      {
        stepNumber: 1,
        title: "Departmental & Library Clearance (No Dues)",
        titleUrdu: "شعبہ، لائبریری اور ہاسٹل سے نو ڈیوز سرٹیفکیٹ",
        description: "Obtain clearance signature stamps from university library, laboratory, hostel warden, and sports directorate.",
        duration: "1-2 days"
      },
      {
        stepNumber: 2,
        title: "Fill Degree / Transcript Application Form",
        titleUrdu: "ڈگری و ٹرانسکرپٹ درخواست فارم پُر کریں",
        description: "Download form from university student portal, paste attested photos, and attach verified photocopies of matric and inter certificates.",
        duration: "1 hour"
      },
      {
        stepNumber: 3,
        title: "Pay Examination Fee via Bank Challan",
        titleUrdu: "امتحانی برانچ فیس چالان جمع کروائیں",
        description: "Deposit fee in designated campus bank branch (HBL, NBP, or Allied Bank) or online 1Link biller.",
        fee: 3500,
        duration: "30 mins"
      },
      {
        stepNumber: 4,
        title: "Submit Docket to Controller of Examinations",
        titleUrdu: "کنٹرولر امتحانات کے دفتر میں فائل جمع کروائیں",
        description: "Submit original paid challan and clearance form at student window counter. Receive diary submission receipt number.",
        duration: "20 mins"
      },
      {
        stepNumber: 5,
        title: "Verification, Printing & Convocation / Counter Pickup",
        titleUrdu: "ڈگری کی طباعت اور وصولی",
        description: "Degree or transcript is verified against ledger books, signed by Vice Chancellor, and issued at counter or convocation.",
        duration: "15-30 days"
      }
    ]
  },
  {
    id: "scholarship-application",
    title: "Scholarship Application & Financial Aid",
    titleUrdu: "اسکالرشپ اور مالی معاونت کے لیے درخواست",
    category: "Education & Academics",
    description: "Step-by-step guidance for HEC Need-Based, Ehsaas Undergraduate, PEEF, and Merit Scholarships for college and university students.",
    descriptionUrdu: "ہائر ایجوکیشن کمیشن، احساس پروگرام، پیف اور میرٹ وظائف حاصل کرنے کی مکمل راہنمائی۔",
    estimatedFee: "Free of cost (No Government Fee)",
    feeAmount: 0,
    processingTime: "1 to 2 months (seasonal evaluation)",
    officialPortalUrl: "https://scholarships.hec.gov.pk",
    popular: false,
    iconName: "Award",
    department: "Higher Education Commission (HEC) / Provincial Education Endowments",
    eligibleCities: ["All Pakistan"],
    requiredDocumentIds: [
      "doc-cnic-copy",
      "doc-father-cnic",
      "doc-salary-slip",
      "doc-utility-bill",
      "doc-matric-sanad",
      "doc-inter-sanad",
      "doc-photos-passport"
    ],
    faqIds: ["faq-sch-1"],
    steps: [
      {
        stepNumber: 1,
        title: "Check Eligibility and Scholarship Cycles",
        titleUrdu: "اہلیت اور اسکالرشپ کی آخری تاریخ چیک کریں",
        description: "Review GPA requirements, family income thresholds (usually under Rs. 60,000/month for need-based), and enrolled program criteria.",
        duration: "30 mins"
      },
      {
        stepNumber: 2,
        title: "Create Account on Official Portal",
        titleUrdu: "سرکاری پورٹل پر پروفائل بنائیں",
        description: "Register on HEC e-portal or university Financial Aid Office (FAO) portal. Fill profile and academic details accurately.",
        duration: "45 mins"
      },
      {
        stepNumber: 3,
        title: "Collect Proof of Income & Utility Receipts",
        titleUrdu: "آمدنی کا ثبوت اور بلوں کی نقول جمع کریں",
        description: "Attach salary slips of parent/guardian, last 6 months electricity bills, rental contract (if rented), and medical bills if applicable.",
        duration: "2 days"
      },
      {
        stepNumber: 4,
        title: "Institutional Scholarship Award Committee (ISAC) Interview",
        titleUrdu: "اسکالرشپ کمیٹی کے روبرو انٹرویو",
        description: "Appear before university evaluation panel with original documents for brief interview regarding financial background.",
        duration: "20 mins"
      },
      {
        stepNumber: 5,
        title: "Award Letter & Direct Tuition Fee Waiver",
        titleUrdu: "وظیفہ منظوری کا لیٹر اور ٹیوشن فیس معافی",
        description: "Funds are directly adjusted toward university semester tuition fees, plus monthly living stipend is disbursed to student bank account.",
        duration: "30 days"
      }
    ]
  },
  {
    id: "fee-challan",
    title: "Government Fee Challan & e-Pay Verification",
    titleUrdu: "سرکاری فیس چالان اور ای پے تصدیق",
    category: "Taxation & Finance",
    description: "How to generate, pay, and verify government 32-A treasury challans, token tax, vehicle registration, and passport fees via e-Pay Punjab/Sindh/Federal 1Link.",
    descriptionUrdu: "سرکاری 32-A چالان، پاسپورٹ اور گاڑی کے ٹوکن ٹیکس کی آن لائن ادائیگی اور تصدیق۔",
    estimatedFee: "Varies according to target service",
    feeAmount: 50,
    processingTime: "Instant to 2 hours",
    officialPortalUrl: "https://epay.punjab.gov.pk",
    popular: false,
    iconName: "Receipt",
    department: "Finance Department & 1Link / National Bank of Pakistan",
    eligibleCities: ["All Pakistan"],
    requiredDocumentIds: [
      "doc-cnic-copy",
      "doc-challan-paid"
    ],
    faqIds: ["faq-fee-1"],
    steps: [
      {
        stepNumber: 1,
        title: "Generate PSID (Payment Slip ID)",
        titleUrdu: "17 ہندسوں پر مشتمل پی ایس آئی ڈی تیار کریں",
        description: "Open ePay Punjab app, Asaan Mobile Account (*2262#), or relevant department portal to generate your 17-digit PSID code.",
        duration: "5 mins"
      },
      {
        stepNumber: 2,
        title: "Pay via Mobile Banking / ATM / OTC Counter",
        titleUrdu: "موبائل بینکنگ ایپ، ایزی پیسہ یا جاز کیش سے ادائیگی",
        description: "Open any bank app (Nayapay, Sadapay, HBL, Meezan, Easypaisa, JazzCash), select 'Bill Payment' -> 'Govt of Punjab / 1Bill', and enter PSID.",
        duration: "3 mins"
      },
      {
        stepNumber: 3,
        title: "Save Digital Payment Receipt with CPR Number",
        titleUrdu: "سی پی آر نمبر والی ڈیجیٹل رسید محفوظ کریں",
        description: "Download transaction PDF receipt showing Computerized Payment Receipt (CPR) number and bank reference stamp.",
        duration: "2 mins"
      },
      {
        stepNumber: 4,
        title: "Present with Application Docket",
        titleUrdu: "درخواست کے ساتھ چالان لف کریں",
        description: "Print 2 copies of the receipt to submit alongside your main file at the concerned department counter.",
        duration: "10 mins"
      }
    ]
  },
  {
    id: "complaint-filing",
    title: "Citizen Complaint Filing (Pakistan Citizen's Portal)",
    titleUrdu: "پاکستان سٹیزن پورٹل اور محتسب شکایت کا اندراج",
    category: "Complaints & Civic",
    description: "Lodge formal complaints against government departmental delays, corruption, civic issues (sanitation, electricity, water), or university administrative grievances.",
    descriptionUrdu: "سرکاری دفاتر میں تاخیر، بدعنوانی، میونسپل مسائل اور یونیورسٹی شکایات کے ازالے کے لیے باضابطہ شکایت درج کریں۔",
    estimatedFee: "100% Free of Cost",
    feeAmount: 0,
    processingTime: "Resolution timeline: 7 to 30 days",
    officialPortalUrl: "https://web.citizenportal.gov.pk",
    popular: false,
    iconName: "AlertTriangle",
    department: "Prime Minister's Performance Delivery Unit (PMDU) / Federal Ombudsman",
    eligibleCities: ["All Pakistan"],
    requiredDocumentIds: [
      "doc-cnic-copy",
      "doc-utility-bill"
    ],
    faqIds: ["faq-comp-1"],
    steps: [
      {
        stepNumber: 1,
        title: "Install Citizen Portal App or Visit Ombudsman Web Portal",
        titleUrdu: "سٹیزن پورٹل ایپ انسٹال کریں یا ویب پورٹل کھولیں",
        description: "Download 'Pakistan Citizen's Portal (PCP)' mobile app or access the Federal / Provincial Ombudsman website.",
        duration: "10 mins"
      },
      {
        stepNumber: 2,
        title: "CNIC Verification via NADRA Integration",
        titleUrdu: "شناختی کارڈ کے ذریعے اکاؤنٹ کی تصدیق",
        description: "Register with your 13-digit CNIC and mobile number registered under your own name.",
        duration: "5 mins"
      },
      {
        stepNumber: 3,
        title: "Select Specific Category & Responsible Ministry",
        titleUrdu: "متعلقہ محکمہ اور زمرہ منتخب کریں",
        description: "Choose proper jurisdiction (Municipal, Education, Law & Order, Energy, Revenue) to prevent jurisdictional redirection.",
        duration: "5 mins"
      },
      {
        stepNumber: 4,
        title: "Draft Factual Summary with Supporting Evidence",
        titleUrdu: "ٹھوس شواہد اور تصاویر کے ساتھ شکایت لکھیں",
        description: "Clearly write dates, reference diary numbers, names of officials if applicable, and attach photos, videos, or scanned letters.",
        duration: "15 mins"
      },
      {
        stepNumber: 5,
        title: "Track Status & Submit Feedback upon Resolution",
        titleUrdu: "شکایت کی پیش رفت دیکھیں اور حل ہونے پر ریٹنگ دیں",
        description: "Monitor tracking dashboard. Once officer submits compliance report, rate satisfied or unsatisfied. Unsatisfied re-opens case at higher supervisory tier.",
        duration: "Ongoing"
      }
    ]
  },
  {
    id: "degree-verification",
    title: "HEC & IBCC Degree Attestation",
    titleUrdu: "ایچ ای سی اور آئی بی سی سی سے ڈگری تصدیق",
    category: "Education & Academics",
    description: "Official attestation and equivalence of Matric, Intermediate (IBCC) and Bachelor/Master/PhD degrees (HEC) required for foreign study, employment, and visa stamping.",
    descriptionUrdu: "بیرون ملک تعلیم اور ویزہ پراسیسنگ کے لیے ایچ ای سی اور آئی بی سی سی سے تعلیمی اسناد کی تصدیق۔",
    estimatedFee: "Original: Rs. 1,000 per page | Photocopy: Rs. 700 per page",
    feeAmount: 2000,
    processingTime: "Courier: 10-15 working days | Walk-in Urgent: Same Day",
    officialPortalUrl: "https://eservices.hec.gov.pk",
    popular: true,
    iconName: "FileCheck2",
    department: "Higher Education Commission (HEC) / Inter Board Coordination Commission (IBCC)",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Peshawar", "Quetta", "All Pakistan"],
    requiredDocumentIds: [
      "doc-cnic-copy",
      "doc-degree-original",
      "doc-matric-sanad",
      "doc-inter-sanad",
      "doc-challan-paid",
      "doc-hec-application"
    ],
    faqIds: ["faq-hec-1", "faq-hec-2"],
    steps: [
      {
        stepNumber: 1,
        title: "Online Profile Creation on HEC e-Services Portal",
        titleUrdu: "ایچ ای سی ای سروسز پر اکاؤنٹ رجسٹریشن",
        description: "Create account on eservices.hec.gov.pk, upload scanned color copies of all transcripts, degrees, and CNIC.",
        duration: "1 hour"
      },
      {
        stepNumber: 2,
        title: "Initial Scrutiny and Approval by HEC Team",
        titleUrdu: "آن لائن اسناد کی ابتدائی جانچ اور منظوری",
        description: "HEC reviewers verify program accreditation against university data. Upon approval, status changes to 'Documents Required'.",
        duration: "3-5 days"
      },
      {
        stepNumber: 3,
        title: "Choose Attestation Mode: Courier (TCS) or Walk-in",
        titleUrdu: "طریقہ کار کا انتخاب: ٹی سی ایس کوریئر یا بالمشافہ واک اِن",
        description: "Choose Walk-in urgent (subject to appointment slot availability) or hand over sealed dossier to designated TCS centers.",
        duration: "10 mins"
      },
      {
        stepNumber: 4,
        title: "Payment of Attestation Fee via 1Link Bill",
        titleUrdu: "1Link بل کے ذریعے تصدیقی فیس جمع کروائیں",
        description: "Pay the system-generated challan via internet banking or TCS counter.",
        fee: 2000,
        duration: "15 mins"
      },
      {
        stepNumber: 5,
        title: "Barcode Security Stamp Affixed & Delivery",
        titleUrdu: "بارکوڈ اسٹامپ کا نفاذ اور دستاویزات کی واپسی",
        description: "HEC affixes high-security metallic QR-coded barcode stamp on reverse of degree and transcript and dispatches back.",
        duration: "7-12 days"
      }
    ]
  },
  {
    id: "passport-guidance",
    title: "Machine Readable Passport (MRP) Issuance",
    titleUrdu: "مشین ریڈ ایبل پاسپورٹ (ایم آر پی) کا اجرا",
    category: "Transport & Travel",
    description: "Complete guide for new issuance, renewal, or modification of 5-year or 10-year Machine Readable Pakistani Passport and e-Passport.",
    descriptionUrdu: "5 یا 10 سالہ نئے پاسپورٹ کے حصول، تجدید یا کیٹیگری میں تبدیلی کا آسان طریقہ۔",
    estimatedFee: "5-Year Normal (36 pages): Rs. 4,500 | Urgent: Rs. 7,500 | Fast Track: Rs. 12,500",
    feeAmount: 4500,
    processingTime: "Normal: 15-21 days | Urgent: 5-7 days | Fast Track: 2-3 days",
    officialPortalUrl: "https://onlinemrp.dgip.gov.pk",
    popular: true,
    iconName: "Compass",
    department: "Directorate General of Immigration and Passports (DGI&P)",
    eligibleCities: ["Islamabad", "Lahore", "Karachi", "Rawalpindi", "Peshawar", "Quetta", "Multan", "Faisalabad", "All Major Cities"],
    requiredDocumentIds: [
      "doc-cnic-original",
      "doc-cnic-copy",
      "doc-old-passport",
      "doc-challan-paid",
      "doc-photos-passport"
    ],
    faqIds: ["faq-pass-1", "faq-pass-2"],
    steps: [
      {
        stepNumber: 1,
        title: "Pay Passport Fee via 'Passport Asaan' App or NBP",
        titleUrdu: "پاسپورٹ آسان ایپ یا بینک میں فیس ادا کریں",
        description: "Download official 'Passport Fee Asaan' mobile app, generate digital PSID, and pay via Mobile banking or at National Bank branch.",
        fee: 4500,
        duration: "15 mins"
      },
      {
        stepNumber: 2,
        title: "Visit Regional Passport Office with Original CNIC",
        titleUrdu: "اصل شناختی کارڈ کے ہمراہ ریجنل پاسپورٹ آفس جائیں",
        description: "Visit during public hours (8:00 AM - 1:00 PM) with original valid CNIC and paid fee receipt.",
        location: "Regional Passport Office",
        duration: "30 mins"
      },
      {
        stepNumber: 3,
        title: "Customer Service Counter & Token Generation",
        titleUrdu: "ٹوکن کاؤنٹر سے باری کا ٹوکن لیں",
        description: "Initial document check and automated token issuance.",
        duration: "10 mins"
      },
      {
        stepNumber: 4,
        title: "Biometrics, Digital Photo & Assistant Director Interview",
        titleUrdu: "تصویر، فنگر پرنٹس اور اسسٹنٹ ڈائریکٹر سے مختصر انٹرویو",
        description: "Digital live photograph taken, fingerprint scan completed, followed by a 1-minute verification interview with the Assistant Director.",
        duration: "25 mins"
      },
      {
        stepNumber: 5,
        title: "Printing & Delivery Tracking via 9988 SMS",
        titleUrdu: "پاسپورٹ کی تیاری اور 9988 پر اسٹیٹس ٹریکنگ",
        description: "Track passport status by sending your 11-digit token number via SMS to 9988. Collect from office with token receipt.",
        duration: "7-20 days"
      }
    ]
  },
  {
    id: "tax-ntn-guidance",
    title: "National Tax Number (NTN) & FBR Active Taxpayer Status",
    titleUrdu: "این ٹی این رجسٹریشن اور فائلر بننے کا طریقہ کار",
    category: "Taxation & Finance",
    description: "Become an Active Taxpayer (Filer) on FBR Active Taxpayers List (ATL) to enjoy 50% reduced tax rates on bank transactions, property, vehicle tokens, and investments.",
    descriptionUrdu: "ایف بی آر میں اپنا این ٹی این رجسٹر کروائیں اور فائلر بن کر بینک اور پراپرٹی پر کم ٹیکس ادا کریں۔",
    estimatedFee: "Self-service: 100% Free | Tax Consultant: Rs. 1,500 - 3,000",
    feeAmount: 0,
    processingTime: "Online instant to 24 hours",
    officialPortalUrl: "https://iris.fbr.gov.pk",
    popular: true,
    iconName: "Briefcase",
    department: "Federal Board of Revenue (FBR) Regional Tax Office (RTO)",
    eligibleCities: ["All Pakistan"],
    requiredDocumentIds: [
      "doc-cnic-original",
      "doc-utility-bill",
      "doc-salary-slip",
      "doc-tax-fbr-form"
    ],
    faqIds: ["faq-tax-1", "faq-tax-2"],
    steps: [
      {
        stepNumber: 1,
        title: "Register on FBR Iris Portal (iris.fbr.gov.pk)",
        titleUrdu: "ایف بی آر آئرس پورٹل پر اکاؤنٹ بنائیں",
        description: "Click 'Registration for Unregistered Person'. Enter CNIC, mobile number registered under your name, and active email address.",
        duration: "15 mins"
      },
      {
        stepNumber: 2,
        title: "Submit SMS & Email Verification OTPs",
        titleUrdu: "موبائل اور ای میل او ٹی پی تصدیق کریں",
        description: "Enter distinct 4-digit verification PINs received on SMS and email to receive portal password and 4-digit transaction PIN.",
        duration: "5 mins"
      },
      {
        stepNumber: 3,
        title: "Fill Form 181 (Order to Grant Registration)",
        titleUrdu: "فارم 181 میں جائیداد، کاروبار یا ملازمت کی تفصیل درج کریں",
        description: "Provide current residential address, employer name or business title, and electricity consumer reference number.",
        duration: "20 mins"
      },
      {
        stepNumber: 4,
        title: "File Income Tax Return & Wealth Statement (Form 114)",
        titleUrdu: "سالانہ انکم ٹیکس گوشوارے جمع کروائیں",
        description: "Declare annual income from salary/business and personal assets. If income is below taxable threshold (Rs. 600,000), file Nil return.",
        duration: "30 mins"
      },
      {
        stepNumber: 5,
        title: "Active Taxpayer Status Reflected on ATL",
        titleUrdu: "ایکٹو ٹیکس پیئر لسٹ میں نام شامل ہونا",
        description: "Check status by sending 'ATL <space> 13-digit CNIC' to 9966. Your name will appear on active filers list immediately.",
        duration: "Immediate to 24 hours"
      }
    ]
  }
];

