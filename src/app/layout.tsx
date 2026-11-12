import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Sahulat Desk | Paperwork, ab asaan. - Citizen Documentation Portal",
  description: "Understand Pakistani government & university document requirements, step-by-step processes, estimated fees, and track your case progress easily.",
  keywords: [
    "Sahulat Desk",
    "NADRA CNIC renewal",
    "Domicile certificate Pakistan",
    "Police Character Certificate",
    "Driving License DLIMS",
    "HEC Degree Verification",
    "FBR NTN Filer",
    "Citizen Paperwork Pakistan"
  ],
  authors: [{ name: "Sahulat Desk Project Team" }]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] antialiased">
        <ToastProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}

