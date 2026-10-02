import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Edit3,
  Eye,
  FileText,
  Filter,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";

function Renewals() {
  const { renewals, deleteRenewal } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredRenewals = useMemo(() => {
    return renewals.filter((renewal) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        renewal.policyNo?.toLowerCase().includes(searchValue) ||
        renewal.customerName?.toLowerCase().includes(searchValue) ||
        renewal.type?.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All Status" ||
        renewal.status === statusFilter;

      const matchesType =
        typeFilter === "All Types" ||
        renewal.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [renewals, search, statusFilter, typeFilter]);

  const totalRenewals = renewals.length;

  const dueSoonRenewals = renewals.filter(
    (renewal) => renewal.status === "Due Soon"
  ).length;

  const upcomingRenewals = renewals.filter(
    (renewal) => renewal.status === "Upcoming"
  ).length;

  const expiredRenewals = renewals.filter(
    (renewal) => renewal.status === "Expired"
  ).length;

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Due Soon":
        return "bg-amber-50 text-amber-600";

      case "Upcoming":
        return "bg-blue-50 text-blue-600";

      case "Expired":
        return "bg-red-50 text-red-500";

      case "Renewed":
        return "bg-emerald-50 text-emerald-600";

      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Due Soon":
        return <AlertCircle size={13} />;

      case "Upcoming":
        return <CalendarDays size={13} />;

      case "Expired":
        return <XCircle size={13} />;

      case "Renewed":
        return <CheckCircle2 size={13} />;

      default:
        return null;
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this renewal?"
    );

    if (confirmed) {
      deleteRenewal(id);
      setOpenMenu(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#243b5a]">
            Renewals
          </h1>

          <p className="mt-1 text-[12px] text-[#8190a3]">
            Track upcoming policy renewals and expiration dates
          </p>
        </div>

        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2869df] px-4 text-[12px] font-semibold text-white transition hover:bg-[#1f5bc5]">
          <Plus size={16} />
          Create Renewal
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Total Renewals
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-[#243b5a]">
                {totalRenewals}
              </h2>

              <p className="mt-1 text-[10px] text-[#8190a3]">
                All renewals
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <CalendarDays
                size={20}
                className="text-[#2869df]"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Due Soon
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-amber-600">
                {dueSoonRenewals}
              </h2>

              <p className="mt-1 text-[10px] text-amber-500">
                Within 7 days
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <Clock3
                size={20}
                className="text-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Upcoming
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-[#243b5a]">
                {upcomingRenewals}
              </h2>

              <p className="mt-1 text-[10px] text-blue-500">
                Next 30 days
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <CalendarDays
                size={20}
                className="text-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Expired
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-red-500">
                {expiredRenewals}
              </h2>

              <p className="mt-1 text-[10px] text-red-500">
                Requires follow-up
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <XCircle
                size={20}
                className="text-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e6ebf1] bg-white">
        <div className="border-b border-[#edf0f4] p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-[#243b5a]">
                Renewal Schedule
              </h2>

              <p className="mt-1 text-[10px] text-[#8190a3]">
                Policies that require renewal attention
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
                  placeholder="Search renewals..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#e3e8ee] bg-[#f8fafc] pl-9 pr-3 text-[11px] text-[#243b5a] outline-none focus:border-[#2869df] sm:w-[220px]"
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
                  <option>Due Soon</option>
                  <option>Upcoming</option>
                  <option>Expired</option>
                  <option>Renewed</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8190a3]"
                />
              </div>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="h-10 rounded-lg border border-[#e3e8ee] bg-[#f8fafc] px-3 text-[11px] text-[#526174] outline-none focus:border-[#2869df]"
              >
                <option>All Types</option>
                <option>Life Insurance</option>
                <option>Health Insurance</option>
                <option>Vehicle Insurance</option>
                <option>Home Insurance</option>
                <option>Travel Insurance</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b border-[#edf0f4] bg-[#fafbfd]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Policy
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Customer
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Insurance Type
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Premium
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Expiry Date
                </th>

                <th className="px-5 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Days Left
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
              {filteredRenewals.map((renewal) => (
                <tr
                  key={renewal.id}
                  className="border-b border-[#edf0f4] last:border-b-0 transition hover:bg-[#fafbfd]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                        <FileText
                          size={16}
                          className="text-[#2869df]"
                        />
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold text-[#243b5a]">
                          {renewal.policyNo}
                        </p>

                        <p className="mt-0.5 text-[9px] text-[#9aa6b5]">
                          Policy
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f0ff] text-[10px] font-semibold text-[#2869df]">
                        {getInitials(renewal.customerName)}
                      </div>

                      <div>
                        <p className="text-[11px] font-semibold text-[#34445a]">
                          {renewal.customerName}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[9px] text-[#9aa6b5]">
                            <Mail size={10} />
                            Customer
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[10px] text-[#526174]">
                      {renewal.type}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[11px] font-semibold text-[#34445a]">
                      {renewal.premium}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-[10px] text-[#526174]">
                      {renewal.expiryDate}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`inline-flex min-w-[45px] justify-center rounded-lg px-2 py-1.5 text-[9px] font-semibold ${
                        renewal.daysLeft <= 7
                          ? "bg-red-50 text-red-500"
                          : renewal.daysLeft <= 15
                          ? "bg-amber-50 text-amber-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      {renewal.daysLeft === 0
                        ? "Expired"
                        : `${renewal.daysLeft} days`}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${getStatusStyle(
                        renewal.status
                      )}`}
                    >
                      {getStatusIcon(renewal.status)}
                      {renewal.status}
                    </span>
                  </td>

                  <td className="relative px-5 py-4 text-right">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === renewal.id
                            ? null
                            : renewal.id
                        )
                      }
                      className="rounded-lg p-1.5 text-[#8190a3] hover:bg-[#f1f4f8] hover:text-[#2869df]"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                    {openMenu === renewal.id && (
                      <div className="absolute right-5 top-12 z-20 w-[155px] rounded-xl border border-[#e5e9ef] bg-white p-1.5 text-left shadow-lg">
                        <button
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-[#526174] hover:bg-[#f5f8fc]"
                        >
                          <Eye size={14} />
                          View Policy
                        </button>

                        <button
                          onClick={() => setOpenMenu(null)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-[#526174] hover:bg-[#f5f8fc]"
                        >
                          <Edit3 size={14} />
                          Edit Renewal
                        </button>

                        <button
                          onClick={() => handleDelete(renewal.id)}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRenewals.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f5f9]">
                <CalendarDays
                  size={20}
                  className="text-[#94a3b8]"
                />
              </div>

              <p className="mt-3 text-[12px] font-medium text-[#526174]">
                No renewals found
              </p>

              <p className="mt-1 text-[10px] text-[#9aa6b5]">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#edf0f4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#8190a3]">
            Showing{" "}
            <span className="font-semibold text-[#526174]">
              {filteredRenewals.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#526174]">
              {renewals.length}
            </span>{" "}
            renewals
          </p>

          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8ee] text-[#9aa6b5] hover:bg-[#f5f8fc]">
              <ChevronLeft size={15} />
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2869df] text-[10px] font-semibold text-white">
              1
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8ee] text-[10px] text-[#526174] hover:bg-[#f5f8fc]">
              2
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8ee] text-[10px] text-[#526174] hover:bg-[#f5f8fc]">
              3
            </button>

            <span className="px-1 text-[10px] text-[#9aa6b5]">
              ...
            </span>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8ee] text-[10px] text-[#526174] hover:bg-[#f5f8fc]">
              10
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e3e8ee] text-[#526174] hover:bg-[#f5f8fc]">
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Renewals;