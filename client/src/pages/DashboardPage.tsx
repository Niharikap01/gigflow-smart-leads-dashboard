import {
  useEffect,
  useState,
} from "react";

import { CSVLink } from "react-csv";

import DashboardLayout from "../layouts/DashboardLayout";

import { useAuthStore } from "../store/authStore";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../api/leadApi";

import { Lead } from "../types/lead";

const DashboardPage = () => {
  const token = useAuthStore(
    (state) => state.token
  );

  const [leads, setLeads] =
    useState<Lead[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [editingLeadId, setEditingLeadId] =
    useState<string | null>(null);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [company, setCompany] =
    useState("");

  const [status, setStatus] =
    useState("new");

  const [source, setSource] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const query =
        `?search=${search}&status=${filterStatus}&page=${page}&limit=5`;

      const data =
        await getLeads(
          token!,
          query
        );

      setLeads(data.leads);

      setTotalPages(
        data.totalPages
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, filterStatus, page]);

  const clearForm = () => {
    setName("");
    setEmail("");
    setCompany("");
    setStatus("new");
    setSource("");
    setNotes("");
    setEditingLeadId(null);
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      if (editingLeadId) {
        await updateLead(
          token!,
          editingLeadId,
          {
            name,
            email,
            company,
            status,
            source,
            notes,
          }
        );

        alert(
          "Lead updated successfully"
        );
      } else {
        await createLead(
          token!,
          {
            name,
            email,
            company,
            status,
            source,
            notes,
          }
        );

        alert(
          "Lead created successfully"
        );
      }

      clearForm();

      fetchLeads();
    } catch (error) {
      console.log(error);

      alert("Operation failed");
    }
  };

  const handleEdit = (
    lead: Lead
  ) => {
    setEditingLeadId(
      lead._id
    );

    setName(lead.name);

    setEmail(lead.email);

    setCompany(
      lead.company
    );

    setStatus(
      lead.status
    );

    setSource(
      lead.source
    );

    setNotes(
      lead.notes || ""
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    id: string
  ) => {
    try {
      await deleteLead(
        token!,
        id
      );

      fetchLeads();

      alert(
        "Lead deleted successfully"
      );
    } catch (error) {
      console.log(error);

      alert(
        "Delete failed"
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold">
          Leads Dashboard
        </h1>

        <CSVLink
          data={leads}
          filename={"leads.csv"}
          className="bg-green-600 text-white px-4 py-3 rounded"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Lead Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded"
          required
        />

        <input
          type="email"
          placeholder="Lead Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) =>
            setCompany(
              e.target.value
            )
          }
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) =>
            setSource(
              e.target.value
            )
          }
          className="border p-3 rounded"
          required
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
          className="border p-3 rounded"
        >
          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="lost">
            Lost
          </option>
        </select>

        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          className="border p-3 rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-black text-white p-3 rounded"
        >
          {editingLeadId
            ? "Update Lead"
            : "Add Lead"}
        </button>
      </form>

      {/* Search */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="border p-3 rounded w-full bg-white"
        />

        <select
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
          className="border p-3 rounded bg-white"
        >
          <option value="">
            All Status
          </option>

          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="lost">
            Lost
          </option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-xl">
            Loading...
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Company
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Source
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {leads.map(
                (lead) => (
                  <tr
                    key={lead._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {lead.name}
                    </td>

                    <td className="p-4">
                      {
                        lead.company
                      }
                    </td>

                    <td className="p-4 capitalize">
                      {
                        lead.status
                      }
                    </td>

                    <td className="p-4">
                      {
                        lead.source
                      }
                    </td>

                    <td className="p-4 flex gap-2">
                      <button
                        onClick={() =>
                          handleEdit(
                            lead
                          )
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            lead._id
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              page - 1
            )
          }
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Prev
        </button>

        <p className="text-lg font-semibold">
          Page {page} of{" "}
          {totalPages}
        </p>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(
              page + 1
            )
          }
          className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;