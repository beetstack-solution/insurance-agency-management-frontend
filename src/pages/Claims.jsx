import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Filter,
  ChevronDown,
  FileText,
  CheckCircle2,
  Clock3,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

function Claims() {
  const { claims, deleteClaim } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.claimId?.toLowerCase().includes(search.toLowerCase()) ||
      claim.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      claim.policyNo?.toLowerCase().includes(search.toLowerCase()) ||
      claim.type?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || claim.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalClaims = claims.length;

  const approvedClaims = claims.filter(
    (claim) => claim.status === "Approved"
  ).length;

  const pendingClaims = claims.filter(
    (claim) => claim.status === "Pending"
  ).length;

  const rejectedClaims = claims.filter(
    (claim) => claim.status === "Rejected"
  ).length;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-600";

      case "Pending":
        return "bg-yellow-50 text-yellow-600";

      case "Under Review":
        return "bg-blue-50 text-blue-600";

      case "Rejected":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 size={13} />;

      case "Pending":
        return <Clock3 size={13} />;

      case "Under Review":
        return <AlertCircle size={13} />;

      case "Rejected":
        return <XCircle size={13} />;

      default:
        return null;
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this claim?"
    );

    if (confirmed) {
      deleteClaim(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#243b5a]">
            Claims
          </h1>

          <p className="mt-1 text-[12px] text-[#8190a3]">
            Manage and track insurance claims
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#2869df] px-4 py-2.5 text-[12px] font-medium text-white transition hover:bg-[#1f5bc7]">
          <Plus size={16} />
          New Claim
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#e7ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Total Claims
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-[#243b5a]">
                {totalClaims}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#2869df]">
              <FileText size={19} />
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#8190a3]">
            All submitted claims
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Approved
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-green-600">
                {approvedClaims}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 size={19} />
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#8190a3]">
            Successfully approved
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Pending
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-yellow-600">
                {pendingClaims}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-600">
              <Clock3 size={19} />
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#8190a3]">
            Waiting for processing
          </p>
        </div>

        <div className="rounded-xl border border-[#e7ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Rejected
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-red-500">
                {rejectedClaims}
              </h2>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
              <XCircle size={19} />
            </div>
          </div>

          <p className="mt-3 text-[10px] text-[#8190a3]">
            Claims not approved
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e7ebf1] bg-white">
        <div className="border-b border-[#edf0f4] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-[#243b5a]">
                All Claims
              </h2>

              <p className="mt-1 text-[10px] text-[#8190a3]">
                View and manage submitted claims
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa6b5]"
                />

                <input
                  type="text"
                  placeholder="Search claims..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#e3e8ee] bg-[#f8fafc] pl-9 pr-3 text-[11px] text-[#243b5a] outline-none transition focus:border-[#2869df] sm:w-[210px]"
                />
              </div>

              <div className="relative">
                <Filter
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8190a3]"
                />

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 appearance-none rounded-lg border border-[#e3e8ee] bg-[#f8fafc] pl-9 pr-9 text-[11px] text-[#526174] outline-none focus:border-[#2869df]"
                >
                  <option>All Status</option>
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Under Review</option>
                  <option>Rejected</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8190a3]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-[#edf0f4] bg-[#fafbfd]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Claim ID
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Policy
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Insurance Type
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Claim Amount
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Date
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredClaims.map((claim) => (
                <tr
                  key={claim.id}
                  className="border-b border-[#f0f2f5] transition hover:bg-[#fafbfd]"
                >
                  <td className="px-5 py-4">
                    <span className="text-[11px] font-semibold text-[#2869df]">
                      {claim.claimId}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf1ff] text-[10px] font-semibold text-[#2869df]">
                        {claim.customerName
                          ?.split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold text-[#243b5a]">
                          {claim.customerName}
                        </p>

                        <p className="text-[9px] text-[#9aa6b5]">
                          Customer
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[11px] text-[#526174]">
                      {claim.policyNo}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[11px] text-[#526174]">
                      {claim.type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[11px] font-semibold text-[#243b5a]">
                      {claim.amount}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[11px] text-[#526174]">
                      {claim.date}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-medium ${getStatusStyle(
                        claim.status
                      )}`}
                    >
                      {getStatusIcon(claim.status)}
                      {claim.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        title="View"
                        className="rounded-lg p-2 text-[#718096] transition hover:bg-blue-50 hover:text-[#2869df]"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        title="Edit"
                        className="rounded-lg p-2 text-[#718096] transition hover:bg-yellow-50 hover:text-yellow-600"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => handleDelete(claim.id)}
                        className="rounded-lg p-2 text-[#718096] transition hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredClaims.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f5f9]">
                <FileText size={20} className="text-[#94a3b8]" />
              </div>

              <p className="mt-3 text-[12px] font-medium text-[#526174]">
                No claims found
              </p>

              <p className="mt-1 text-[10px] text-[#9aa6b5]">
                Try changing your search or filter
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 border-t border-[#edf0f4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#8190a3]">
            Showing{" "}
            <span className="font-medium text-[#526174]">
              {filteredClaims.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[#526174]">
              {claims.length}
            </span>{" "}
            claims
          </p>

          <div className="flex items-center gap-1">
            <button className="rounded-lg border border-[#e3e8ee] px-3 py-1.5 text-[10px] text-[#8190a3] hover:bg-[#f8fafc]">
              Previous
            </button>

            <button className="rounded-lg bg-[#2869df] px-3 py-1.5 text-[10px] text-white">
              1
            </button>

            <button className="rounded-lg border border-[#e3e8ee] px-3 py-1.5 text-[10px] text-[#526174] hover:bg-[#f8fafc]">
              2
            </button>

            <button className="rounded-lg border border-[#e3e8ee] px-3 py-1.5 text-[10px] text-[#526174] hover:bg-[#f8fafc]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Claims;