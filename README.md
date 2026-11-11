# Sahulat Desk (سہولت ڈیسک)
> **“Paperwork, ab asaan.”**  
> *Full-Stack College Final-Year Project (FYP)*

Sahulat Desk is a comprehensive, production-ready citizen facilitation web application designed to simplify government and university documentation processes in Pakistan (NADRA, District Commissioner / Domicile, Police Character Certificates, DLIMS Driving Licenses, HEC Degree Attestation, Passports, and FBR Tax/NTN Registration).

---

## 🏛️ Key Capabilities & Features

1. **Service Directory & Categories**
   - 12+ real-world services across 6 major categories: *Identity & Civil*, *Education & Academics*, *Police & Verification*, *Transport & Travel*, *Taxation & Finance*, and *Complaints & Civic*.
   - Filter by categories, instant search in English and Urdu, popular service tags.

2. **Detailed Service Roadmaps**
   - Required documents checklist with mandatory/optional tags and issuing authority.
   - Step-by-step procedural roadmap with duration, location, fees, and practical citizen tips.
   - Verified official online portals and nearest physical facilitation markaz.
   - Comprehensive bilingual FAQs.

3. **Smart Checklist Generator**
   - Questionnaire asking:
     - Target City (Islamabad, Lahore, Karachi, Rawalpindi, Peshawar, Quetta, etc.)
     - Purpose (Higher Education, Job, Visa/Travel, Family, etc.)
     - Applicant Status (Student, Salaried Employee, Self-Employed, Fresh Graduate)
     - Existing Documents already possessed
   - Generates a personalized checklist identifying exact missing documents.
   - 1-Click option to initialize and save as an active case in the Case Tracker.

4. **6-Stage Case Tracker**
   - Real-time progression across the 6 mandatory stages:  
     `Not Started` ➔ `Documents Pending` ➔ `Ready to Submit` ➔ `Submitted` ➔ `Under Review` ➔ `Completed`
   - Progress bar percentage indicator.
   - Check off individual steps as completed.
   - Case diary and notes editor.

5. **Personal Document Vault (Document Manager)**
   - Upload and categorize citizen documents (Identity, Academic, Financial, Legal, Photograph, Application).
   - Preview modal, download verification, file size metadata, and deletion.

6. **Sahulat AI Helper (سہولت دوست)**
   - Bilingual AI assistant responding to natural queries in English, Roman Urdu, and Urdu.
   - Pre-loaded prompt chips for common paperwork dilemmas.
   - Formats answers into structured checklists and next steps.
   - Legal disclaimer: *“Yeh information general guidance ke liye hai. Final requirement official authority se confirm karein.”*
   - Powered by Gemini API integration with an intelligent built-in offline knowledge engine fallback.

7. **Physical Office Directory**
   - 12+ verified facilitation centers (NADRA Mega Centers, DCO / e-Khidmat Markaz, Police Khidmat Markaz, DLIMS, Passport Offices, HEC Secretariat, FBR RTOs).
   - Public counter timings, phone hotlines, and direct Google Maps navigation links.

8. **Community Tips & Experiences**
   - Crowdsourced real tips (e.g., optimal arrival times to skip token queues, e-stamp precautions, reverse driving test advice).
   - Interactive upvoting system.
   - Verified citizen contributor badges.

9. **Follow-up Reminders & Alerts**
   - Timed notifications for challan payments, counter visits, and document collection.
   - Priority tagging (High, Medium, Low) and completion checkoff.

10. **Executive Admin Dashboard**
    - High-level KPIs: Total Users, Active Cases, Completed Cases, Vault Documents, Services Catalog, Offices.
    - Recharts visual charts: Popular Services Load, Case Status Breakdown (Pie Chart), City-wise Distribution, and Audit Logs.
    - Full CRUD management for Services, Required Documents Bank, Office Locations, and Citizen Accounts.
    - Exportable CSV and Printable Compliance Reports.

---

## 🎨 Design System & Colors

- **Primary Color:** Deep Blue `#1E3A8A`
- **Secondary Color:** Teal `#0D9488`
- **Accent Color:** Amber `#F59E0B`
- **Background:** Light Gray `#F8FAFC`
- **Cards Background:** White `#FFFFFF`
- **Typography:** Dark Slate `#0F172A` & Muted Slate `#64748B` with support for Urdu typography

---

## 👤 User Roles & Demo Credentials

Switch roles directly from the **Role Switcher** in the top navigation bar or use the demo login buttons:

| Role | Access Level | Description |
|---|---|---|
| **Guest** | View-Only | Can browse Services, FAQs, and Office Directory |
| **User (Citizen)** | Full Access | Can create cases, upload documents, use AI Helper, receive reminders |
| **Admin (Officer)** | Governance Suite | Can manage services, documents bank, offices, users, and audit reports |

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run in development mode
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

