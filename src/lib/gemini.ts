export interface AIMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  checklist?: string[];
  nextSteps?: string[];
}

const DISCLAIMER = "Yeh information general guidance ke liye hai. Final requirement official authority se confirm karein.";

export async function askSahulatAI(prompt: string, conversationHistory: AIMessage[] = []): Promise<AIMessage> {
  const normalized = prompt.toLowerCase();

  // If Gemini API Key exists in environment, call it
  const apiKey = typeof window !== "undefined" ? (window as unknown as { NEXT_PUBLIC_GEMINI_API_KEY?: string }).NEXT_PUBLIC_GEMINI_API_KEY : process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `You are 'Sahulat AI' (سہولت دوست), the official AI assistant of Sahulat Desk for Pakistani citizen and student paperwork guidance.
Always answer in helpful, friendly bilingual Urdu/English or Roman Urdu as appropriate.
Follow these rules strictly:
1. Provide short, structured, bulleted answers.
2. Clearly show required documents as a checklist.
3. Show next steps clearly.
4. Do not provide legal advice.
5. End every response with: "⚠️ Note: ${DISCLAIMER}"

User query: ${prompt}`
                }
              ]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            role: "assistant",
            content: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
        }
      }
    } catch {
      // Fallback to intelligent local knowledge engine
    }
  }

  // Intelligent Built-in Bilingual Knowledge Engine
  return generateIntelligentResponse(normalized, prompt);
}

function generateIntelligentResponse(lower: string, originalPrompt: string): AIMessage {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Domicile Certificate
  if (lower.includes("domicile") || lower.includes("ڈومیسائل") || lower.includes("domacile")) {
    return {
      role: "assistant",
      content: `**Domicile Certificate Guidance (ڈومیسائل سرٹیفکیٹ کا طریقہ کار):**

Domicile certificate aap ke permanent district residency ka official saboot hai. Yeh sarkari jobs aur university admission quota ke liye lazmi hota hai.

**📋 Required Documents (Zaroori Kaghazaat):**
- [ ] 2 Attested copies of CNIC (Applicant + Father/Guardian)
- [ ] Original Matric (SSC) Sanad / Result Card
- [ ] Paid Utility Bill (Electricity / Gas / Water not older than 2 months)
- [ ] 4 Passport size photographs with blue background
- [ ] e-Stamp Paper Affidavit (Rs. 50/100) stating no other district domicile
- [ ] Paid Bank Challan 32-A (Rs. 200 - 350)

**👣 Next Steps (Agley Marahil):**
1. E-Stamp vendor se affidavit stamp banwayen aur Oath Commissioner se sign karwayen.
2. National Bank (NBP) mein Treasury Head C02636 ke tehat challan jama karwayen.
3. Files ko Grade 17+ officer se attest karwa kar e-Khidmat Markaz ya DC Office mein submit karein.
4. 5 se 7 din mein inquiry mukammal hone ke baad apna Domicile collect karein.

⚠️ *Disclaimer: ${DISCLAIMER}*`,
      timestamp: time,
      checklist: [
        "CNIC copies of applicant and father",
        "Matriculation original sanad",
        "Recent paid electricity bill",
        "4 blue background passport photos",
        "Rs. 100 e-Stamp affidavit",
        "Paid Bank Challan (Rs. 200)"
      ],
      nextSteps: [
        "Purchase e-stamp affidavit from court/vendor",
        "Pay Challan at National Bank branch",
        "Submit file at nearest e-Khidmat Markaz or DC Office"
      ]
    };
  }

  // 2. CNIC Renewal
  if (lower.includes("cnic") || lower.includes("شناختی کارڈ") || lower.includes("smart card") || lower.includes("nadra")) {
    return {
      role: "assistant",
      content: `**CNIC / Smart Card Renewal Process (شناختی کارڈ تجدید کا طریقہ):**

Aap apna CNIC expire hone se 6 mah pehle ya expire hone ke baad renew karwa sakte hain.

**📋 Required Documents (Zaroori Kaghazaat):**
- [ ] Original Old CNIC / Smart Card (Chahay expire ho chuka ho)
- [ ] 1 Photocopy of CNIC
- [ ] Father or Mother or Spouse CNIC copy
- [ ] Blood relative (Father/Mother/Sibling) with CNIC (agar fingerprints match na hon)

**⏱️ Fee & Delivery Timeline:**
- **Normal:** Rs. 750 (15 - 20 days)
- **Urgent:** Rs. 1,500 (7 - 10 days)
- **Executive:** Rs. 2,500 (3 - 5 days)

**👣 Next Steps (Agley Marahil):**
1. Kisi bhi qareebi NADRA Mega Center jayen ya 'Pak-ID' mobile app download karein.
2. Reception se renewal ka token lein aur counter par fee jama karein.
3. Live photo, 10 fingerprints biometric, aur digital signature capture karwayen.
4. Form par particulars verify karein.
5. Card tayar hone par 8500 se SMS mosool hoga, center se collect karein ya courier delivery lein.

💡 *Pro Tip: Subah 8:00 AM se 9:30 AM ke darmiyan NADRA Mega Center mein rush bohat kam hota hai.*

⚠️ *Disclaimer: ${DISCLAIMER}*`,
      timestamp: time,
      checklist: [
        "Original expired/current CNIC",
        "Father/Spouse CNIC photocopy",
        "Fee amount according to urgency (Normal/Urgent/Executive)",
        "Blood relative presence if biometric issues exist"
      ],
      nextSteps: [
        "Visit NADRA Mega Center or download Pak-ID App",
        "Get token and pay fee at counter",
        "Complete biometric scan and photograph",
        "Collect printed card upon receiving SMS notification"
      ]
    };
  }

  // 3. Character Certificate / Police Verification
  if (lower.includes("character") || lower.includes("police") || lower.includes("پولیس") || lower.includes("khidmat markaz") || lower.includes("verification")) {
    return {
      role: "assistant",
      content: `**Police Character Certificate & Verification (پولیس کریکٹر سرٹیفکیٹ):**

Foreign visa, abroad employment ya govt job ke liye police clearance certificate District Police Khidmat Markaz se jari hota hai.

**📋 Required Documents (Zaroori Kaghazaat):**
- [ ] Original CNIC + 2 Photocopies
- [ ] Valid Passport original + photocopy (agar visa ke liye darkaar ho)
- [ ] 2 Passport size blue background photos
- [ ] Residential proof (Utility bill or rent agreement)
- [ ] 2 Neighbors/Witnesses CNIC copies & active contact numbers
- [ ] Prescribed Application Form (Khidmat Markaz se dastiyab)

**👣 Next Steps (Agley Marahil):**
1. Apne district ke Police Khidmat Markaz (PKM) jayen.
2. Token le kar counter par original CNIC aur documents pesh karein.
3. Rs. 350 processing fee jama karwayen aur live photo banwayen.
4. Digital request aap ke ilaqay ke thanay (police station) ko bheji jayegi jahan se beat officer inquiry karega.
5. 3 se 5 din mein SSP signed QR-coded certificate collect karein.

⚠️ *Disclaimer: ${DISCLAIMER}*`,
      timestamp: time,
      checklist: [
        "Original CNIC and 2 copies",
        "Passport copy (if for abroad)",
        "2 Passport size photos",
        "2 Neighborhood witness CNIC copies with phone numbers",
        "Utility bill proving residence"
      ],
      nextSteps: [
        "Visit Police Khidmat Markaz (PKM)",
        "Submit biometrics and pay Rs. 350 fee",
        "Police station field inquiry confirmation",
        "Collect QR-coded Certificate upon SMS alert"
      ]
    };
  }

  // 4. University Documents / Degree Verification / Transcript
  if (lower.includes("university") || lower.includes("degree") || lower.includes("transcript") || lower.includes("hec") || lower.includes("یونیورسٹی") || lower.includes("ڈگری")) {
    return {
      role: "assistant",
      content: `**University Degree & HEC Attestation Guidance (ڈگری اور ٹرانسکرپٹ کا اجرا):**

University se official degree/transcript hasil karne aur HEC se attest karwane ka mukammal tareeqa:

**📋 Required Documents (Zaroori Kaghazaat):**
- [ ] University 'No Dues' Clearance Form (Library, Lab, Hostel, Accounts)
- [ ] Attested copy of Matric (SSC) Sanad & Intermediate (HSSC)
- [ ] Copy of CNIC
- [ ] 2 Attested Passport-size photographs
- [ ] Original Bank Challan receipt of Examination Department
- [ ] HEC e-Services online summary form (agar HEC attestation chahiye)

**👣 Next Steps (Agley Marahil):**
1. Departmental aur library clearance complete kar ke Controller of Examinations mein apply karein.
2. Examination fee (Rs. 2,000 - 4,000) campus bank branch mein deposit karein.
3. Degree hasil karne ke baad, **eservices.hec.gov.pk** par account banayen.
4. HEC portal par documents upload karein. Scrutiny pass hone par TCS courier ya walk-in appointment select karein.
5. HEC metallic barcode seal stamp kar ke deliver kar dega.

⚠️ *Disclaimer: ${DISCLAIMER}*`,
      timestamp: time,
      checklist: [
        "All departmental clearance stamps",
        "Attested Matric & Inter Certificates",
        "Paid University Examination Challan",
        "HEC online application slip"
      ],
      nextSteps: [
        "Complete University No Dues clearance",
        "Deposit fee in designated bank",
        "Collect original degree from examination counter",
        "Apply online on eservices.hec.gov.pk for HEC seal"
      ]
    };
  }

  // 5. Driving License
  if (lower.includes("driving") || lower.includes("license") || lower.includes("لائسنس") || lower.includes("dlims") || lower.includes("learner")) {
    return {
      role: "assistant",
      content: `**Driving License Process (ڈرائیونگ لائسنس حاصل کرنے کا طریقہ):**

Pakistani traffic laws ke mutabiq permanent license se pehle learner permit lazmi hota hai.

**📋 Required Documents (Zaroori Kaghazaat):**
- [ ] Original CNIC
- [ ] 2 Photocopies of CNIC
- [ ] Medical Fitness Form (Form-B) certified by registered doctor
- [ ] 2 Passport size photographs
- [ ] Paid Challan / Traffic ticket (Learner Rs. 60-100, Permanent Rs. 1,500-2,500)

**👣 Next Steps (Agley Marahil):**
1. **Stage 1 (Learner Permit):** dlims.punjab.gov.pk par online ya Traffic Markaz se fori 10 minute mein learner permit hasil karein.
2. **Stage 2 (42-Day Cool-off):** Learner permit ke baad 42 din driving practice karein.
3. **Stage 3 (Computer Theory Test):** Traffic signs aur rules ka touchscreen test paas karein (80% passing).
4. **Stage 4 (Practical Track Test):** Vehicle ko forward aur reverse 'L' shape track se guzaarein bina cones ko touch kiye.
5. Pass hone par aap ka Smart Driving License postal address par dispatch kar diya jata hai.

⚠️ *Disclaimer: ${DISCLAIMER}*`,
      timestamp: time,
      checklist: [
        "Original CNIC",
        "Learner permit slip",
        "Medical fitness Form-B",
        "Passport size photos",
        "Ticket / Fee challan"
      ],
      nextSteps: [
        "Issue Learner permit online or at markaz",
        "Complete 42 days mandatory practice",
        "Pass computerized traffic sign test",
        "Pass practical driving track test"
      ]
    };
  }

  // 6. Passport
  if (lower.includes("passport") || lower.includes("پاسپورٹ") || lower.includes("dgip")) {
    return {
      role: "assistant",
      content: `**Machine Readable Passport (MRP) Guidance (پاسپورٹ بنوانے کا طریقہ):**

**📋 Required Documents (Zaroori Kaghazaat):**
- [ ] Original Valid CNIC / Smart Card (Expire na ho)
- [ ] 2 Photocopies of CNIC
- [ ] Previous original passport (agar renewal hai to)
- [ ] Paid Fee receipt via 'Passport Fee Asaan' app ya National Bank challan

**💰 Government Fees (5-Year Validity / 36 Pages):**
- Normal: Rs. 4,500 | Urgent: Rs. 7,500 | Fast Track: Rs. 12,500

**👣 Next Steps (Agley Marahil):**
1. 'Passport Fee Asaan' app se digital PSID banayein aur JazzCash/Easypaisa/Bank se fee jama karein.
2. Regional Passport Office jayen (Subah 8:00 AM se 1:00 PM).
3. Token counter se token lein, biometric fingerprints dein aur live photo khinchwayen.
4. Assistant Director se 1 minute ka interview complete karein.
5. Track karne ke liye apna 11-digit token number 9988 par SMS karein.

⚠️ *Disclaimer: ${DISCLAIMER}*`,
      timestamp: time
    };
  }

  // 7. NTN / Tax / Filer
  if (lower.includes("tax") || lower.includes("ntn") || lower.includes("filer") || lower.includes("fbr") || lower.includes("فائلر") || lower.includes("ٹیکس")) {
    return {
      role: "assistant",
      content: `**National Tax Number (NTN) & Filer Registration (این ٹی این اور فائلر بننے کا طریقہ):**

FBR Active Taxpayer list par aane se bank transactions aur car/property purchase par withholding tax 50% kam ho jata hai.

**📋 Required Documents (Zaroori Kaghazaat):**
- [ ] Original CNIC
- [ ] Mobile SIM registered on your own CNIC (OTP verification ke liye)
- [ ] Active personal email address
- [ ] Recent paid electricity bill (Consumer reference number ke liye)
- [ ] Salary slip or business letterhead

**👣 Next Steps (Agley Marahil):**
1. **iris.fbr.gov.pk** open karein aur 'Registration for Unregistered Person' par click karein.
2. Apna CNIC, mobile network, aur email enter kar ke SMS aur Email OTP verify karein.
3. Form 181 mein apna residential address aur profession/business darj karein.
4. Salana Return (Form 114) submit karein. Agar student ya low-income hain to 'Nil Return' file karein.
5. Status check karne ke liye 'ATL <space> 13-digit CNIC' likh kar 9966 par send karein.

⚠️ *Disclaimer: ${DISCLAIMER}*`,
      timestamp: time
    };
  }

  // Default General Friendly Answer
  return {
    role: "assistant",
    content: `**Sahulat Desk Assistant (سہولت دوست):**

Aap ne pocha: *"${originalPrompt}"*

Sahulat Desk aap ko Pakistan ke tamam sarkari aur talimi paperwork mein mukammal rehnumai faraham karta hai.

**Hamari mashhoor services:**
- 🔹 **CNIC & NADRA:** Renewal, smart card, FRC aur B-Form
- 🔹 **Domicile:** Zila DC Office aur e-Khidmat Markaz checklist
- 🔹 **Character Certificate:** Police Khidmat Markaz se clearance
- 🔹 **Driving License:** DLIMS learner permit aur permanent test
- 🔹 **University & HEC:** Degree issuance, transcript aur attestation
- 🔹 **Passport & NTN:** MRP passport aur FBR filer guidance

Aap kisi bhi service ka naam likhein, maslan: *"Domicile ke liye kya documents chahiye?"* ya *"Driving license ka process kya hai?"* aur main aap ko required documents ki checklist aur step-by-step guidance provide karunga.

⚠️ *Disclaimer: ${DISCLAIMER}*`,
    timestamp: time
  };
}

