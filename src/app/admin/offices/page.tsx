"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  Trash2,
  Edit,
  Search,
  CheckCircle2,
  X,
  MapPin,
  Clock,
  PhoneCall,
  ExternalLink
} from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import {
  getOffices,
  saveOffice,
  deleteOffice,
  isClient
} from "@/lib/storage";
import { OfficeLocation, ServiceCategory } from "@/types";
import { useToast } from "@/components/Toast";

const CITIES = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Peshawar",
  "Quetta",
  "Faisalabad",
  "Multan"
];

export default function AdminOfficesPage() {
  const { showToast } = useToast();
  const [offices, setOffices] = useState<OfficeLocation[]>([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState<OfficeLocation | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [nameUrdu, setNameUrdu] = useState("");
  const [department, setDepartment] = useState("NADRA");
  const [category, setCategory] = useState<ServiceCategory>("Identity & Civil");
  const [city, setCity] = useState("Islamabad");
  const [address, setAddress] = useState("");
  const [timings, setTimings] = useState("Monday - Friday: 09:00 AM - 05:00 PM");
  const [phone, setPhone] = useState("051-111-786-100");
  const [mapUrl, setMapUrl] = useState("https://maps.google.com");

  const loadData = () => {
    if (!isClient()) return;
    setOffices(getOffices());
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingOffice(null);
    setName("");
    setNameUrdu("");
    setDepartment("NADRA");
    setCategory("Identity & Civil");
    setCity("Islamabad");
    setAddress("");
    setTimings("Monday - Friday: 09:00 AM - 05:00 PM");
    setPhone("051-111-786-100");
    setMapUrl("https://maps.google.com");
    setIsModalOpen(true);
  };

  const openEditModal = (o: OfficeLocation) => {
    setEditingOffice(o);
    setName(o.name);
    setNameUrdu(o.nameUrdu || "");
    setDepartment(o.department);
    setCategory(o.serviceCategory);
    setCity(o.city);
    setAddress(o.address);
    setTimings(o.timings);
    setPhone(o.phone);
    setMapUrl(o.mapUrl);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string, officeName: string) => {
    if (confirm(`Remove office "${officeName}" from directory?`)) {
      deleteOffice(id);
      showToast("Office removed from directory.", "info");
      loadData();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const id = editingOffice ? editingOffice.id : `off-${Date.now().toString().slice(-6)}`;

    saveOffice({
      id,
      name: name.trim(),
      nameUrdu: nameUrdu.trim(),
      department: department.trim(),
      serviceCategory: category,
      city,
      address: address.trim(),
      timings: timings.trim(),
      phone: phone.trim(),
      mapUrl: mapUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(name + " " + city)}`,
      servicesProvided: editingOffice ? editingOffice.servicesProvided : ["Public Documentation Counter", "Biometrics"]
    });

    setIsModalOpen(false);
    loadData();
    showToast(editingOffice ? "Office details updated!" : "New office added to directory!", "success");
  };

  const filtered = offices.filter(
    (o) =>
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase()) ||
      o.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 bg-slate-950/60">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" /> Physical Infrastructure Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Manage Government Office Locations ({offices.length})
            </h1>
            <p className="text-xs text-slate-400">
              Configure physical facilitation counters, public timings, phone hotlines, and maps links.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-[#0D9488] hover:bg-teal-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Office Location
          </button>
        </div>

        {/* Search */}
        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by office name, department, or city..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Office & Department</th>
                  <th className="py-3 px-4">City</th>
                  <th className="py-3 px-4">Public Timings</th>
                  <th className="py-3 px-4">Helpline Phone</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((off) => (
                  <tr key={off.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{off.name}</div>
                      <div className="text-[11px] text-teal-400">{off.department}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{off.address}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-200">
                      {off.city}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {off.timings}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-amber-400">
                      {off.phone}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(off)}
                          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                          title="Edit Office"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(off.id, off.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950 rounded transition-colors"
                          title="Delete Office"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-700 text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white">
                {editingOffice ? "Edit Office Details" : "Add Facilitation Center"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Center / Office Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. NADRA Mega Center (Blue Area)"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Office Name in Urdu</label>
                <input
                  type="text"
                  value={nameUrdu}
                  onChange={(e) => setNameUrdu(e.target.value)}
                  placeholder="نادرا میگا سینٹر، بلیو ایریا"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-urdu focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. NADRA, Punjab Police, PITB"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Physical Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Fazl-e-Haq Road, Sector G-7/2..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Timings</label>
                  <input
                    type="text"
                    value={timings}
                    onChange={(e) => setTimings(e.target.value)}
                    placeholder="Open 24 Hours or 09:00 - 05:00"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Helpline Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="051-111-786-100"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Google Maps Link</label>
                <input
                  type="text"
                  value={mapUrl}
                  onChange={(e) => setMapUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0D9488] hover:bg-teal-700 text-white rounded-lg font-bold shadow-sm"
                >
                  Save Office
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

