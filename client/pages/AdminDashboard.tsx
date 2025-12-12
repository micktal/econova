import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://wkdupbqnobijzmqohpnr.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZHVwYnFub2JpanptcW9ocG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1NjMwMjAsImV4cCI6MjA4MTEzOTAyMH0.YswYQcR56oM1S-HHkrnOxUxqzz_VbPPT2eXaDtd1bN8",
);

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  project_types: string[];
  message: string;
  source: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("desc");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    fetchLeads();
  }, [isAuthenticated, navigate]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      let query = supabase.from("leads").select("*");

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query.order("created_at", {
        ascending: sortBy === "asc",
      });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter, sortBy]);

  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    try {
      await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);
      fetchLeads();
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-slate-600 text-sm">Total Leads</p>
            <p className="text-3xl font-bold text-slate-900">{leads.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-slate-600 text-sm">New</p>
            <p className="text-3xl font-bold text-blue-600">
              {leads.filter((l) => l.status === "new").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-slate-600 text-sm">Contacted</p>
            <p className="text-3xl font-bold text-yellow-600">
              {leads.filter((l) => l.status === "contacted").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-slate-600 text-sm">Qualified</p>
            <p className="text-3xl font-bold text-green-600">
              {leads.filter((l) => l.status === "qualified").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Sort by Date
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-600">
              Loading leads...
            </div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center text-slate-600">
              No leads found for this filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Project Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {lead.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <a
                          href={`mailto:${lead.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {lead.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {lead.phone || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {lead.project_types?.join(", ") || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatDate(lead.created_at)}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStatus(lead.id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                            lead.status === "new"
                              ? "bg-blue-100 text-blue-800"
                              : lead.status === "contacted"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-600 text-center mt-6">
          {leads.length} leads total
        </p>
      </div>
    </div>
  );
}
