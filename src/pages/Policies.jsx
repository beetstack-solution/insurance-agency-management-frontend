import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Eye,
  FileText,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";

function Policies() {
  const { policies, customers, deletePolicy } = useApp();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  const getCustomer = (customerId) => {
    return customers.find(
      (customer) => customer.customerId === customerId
    );
  };

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const customer = getCustomer(policy.customerId);

      const customerName = customer?.name || "";
      const customerEmail = customer?.email || "";

      const matchesSearch =
        policy.policyNo
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customerName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customerEmail
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        policy.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        policy.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [policies, customers, search, statusFilter, typeFilter]);

  const totalPolicies = policies.length;

  const activePolicies = policies.filter(
    (policy) => policy.status === "Active"
  ).length;

  const pendingPolicies = policies.filter(
    (policy) => policy.status === "Pending"
  ).length;

  const expiredPolicies = policies.filter(
    (policy) => policy.status === "Expired"
  ).length;

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return "bg-emerald-50 text-emerald-600";
    }

    if (status === "Pending") {
      return "bg-amber-50 text-amber-600";
    }

    return "bg-red-50 text-red-500";
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this policy?"
    );

    if (!confirmed) return;

    deletePolicy(id);
    setOpenMenu(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#243b5a]">
            Policies
          </h1>

          <p className="mt-1 text-[12px] text-[#8190a3]">
            Manage and monitor all insurance policies
          </p>
        </div>

        <button
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-[#2869df]
            px-4
            text-[12px]
            font-semibold
            text-white
            transition
            hover:bg-[#1f5ac5]
          "
        >
          <Plus size={16} />
          Add Policy
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Total Policies
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-[#243b5a]">
                {totalPolicies}
              </h2>

              <p className="mt-1 text-[10px] text-emerald-500">
                Current policies
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <FileText
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
                Active Policies
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-[#243b5a]">
                {activePolicies}
              </h2>

              <p className="mt-1 text-[10px] text-emerald-500">
                {totalPolicies > 0
                  ? Math.round(
                      (activePolicies / totalPolicies) * 100
                    )
                  : 0}
                % of total
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
              <ShieldCheck
                size={20}
                className="text-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium text-[#8190a3]">
                Pending Policies
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-[#243b5a]">
                {pendingPolicies}
              </h2>

              <p className="mt-1 text-[10px] text-amber-500">
                Requires attention
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <CalendarDays
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
                Expired Policies
              </p>

              <h2 className="mt-2 text-[24px] font-bold text-[#243b5a]">
                {expiredPolicies}
              </h2>

              <p className="mt-1 text-[10px] text-red-500">
                Need renewal
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <FileText
                size={20}
                className="text-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e6ebf1] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#edf0f4] p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-[320px]">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa6b5]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search policy or customer..."
              className="
                h-10
                w-full
                rounded-lg
                border
                border-[#e3e8ee]
                bg-[#f8fafc]
                pl-9
                pr-3
                text-[12px]
                text-[#243b5a]
                outline-none
                placeholder:text-[#9aa6b5]
                focus:border-[#2869df]
                focus:bg-white
              "
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="
                flex
                h-10
                items-center
                gap-2
                rounded-lg
                border
                border-[#e3e8ee]
                px-3
                text-[11px]
                font-medium
                text-[#526174]
                hover:bg-[#f8fafc]
              "
            >
              <Filter size={15} />
              Filter

              <ChevronDown
                size={14}
                className={
                  showFilter ? "rotate-180" : ""
                }
              />
            </button>

            <span className="hidden text-[11px] text-[#9aa6b5] sm:block">
              {filteredPolicies.length} policies
            </span>
          </div>
        </div>

        {showFilter && (
          <div className="flex flex-col gap-3 border-b border-[#edf0f4] bg-[#f8fafc] p-4 sm:flex-row">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-[#718096]">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="
                  h-9
                  rounded-lg
                  border
                  border-[#e3e8ee]
                  bg-white
                  px-3
                  text-[11px]
                  text-[#526174]
                  outline-none
                "
              >
                <option>All</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Expired</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[10px] font-medium text-[#718096]">
                Insurance Type
              </label>

              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value)
                }
                className="
                  h-9
                  rounded-lg
                  border
                  border-[#e3e8ee]
                  bg-white
                  px-3
                  text-[11px]
                  text-[#526174]
                  outline-none
                "
              >
                <option>All</option>
                <option>Health Insurance</option>
                <option>Life Insurance</option>
                <option>Vehicle Insurance</option>
                <option>Home Insurance</option>
                <option>Travel Insurance</option>
              </select>
            </div>

            <button
              onClick={() => {
                setStatusFilter("All");
                setTypeFilter("All");
                setSearch("");
              }}
              className="mt-4 flex h-9 items-center gap-1 text-[11px] text-red-500"
            >
              <X size={14} />
              Clear
            </button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
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
                  Start Date
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  End Date
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredPolicies.map((policy) => {
                const customer = getCustomer(
                  policy.customerId
                );

                const customerName =
                  customer?.name || "Unknown";

                const customerEmail =
                  customer?.email || "";

                return (
                  <tr
                    key={policy.id}
                    className="border-b border-[#edf0f4] last:border-b-0 hover:bg-[#fafbfd]"
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
                            {policy.policyNo}
                          </p>

                          <p className="mt-0.5 text-[9px] text-[#9aa6b5]">
                            Policy ID #{policy.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8f0ff] text-[10px] font-semibold text-[#2869df]">
                          {customerName
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold text-[#34445a]">
                            {customerName}
                          </p>

                          <p className="text-[9px] text-[#9aa6b5]">
                            {customerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-[11px] text-[#526174]">
                        {policy.type}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-[11px] font-semibold text-[#34445a]">
                        ₹
                        {Number(
                          policy.premium || 0
                        ).toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-[10px] text-[#526174]">
                        {policy.startDate}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-[10px] text-[#526174]">
                        {policy.expiryDate}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-2.5
                          py-1
                          text-[9px]
                          font-semibold
                          ${getStatusStyle(policy.status)}
                        `}
                      >
                        {policy.status}
                      </span>
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === policy.id
                              ? null
                              : policy.id
                          )
                        }
                        className="
                          rounded-lg
                          p-1.5
                          text-[#8190a3]
                          hover:bg-[#f1f4f8]
                          hover:text-[#2869df]
                        "
                      >
                        <MoreHorizontal size={17} />
                      </button>

                      {openMenu === policy.id && (
                        <div className="absolute right-5 top-12 z-20 w-[150px] rounded-xl border border-[#e5e9ef] bg-white p-1.5 text-left shadow-lg">
                          <button
                            onClick={() =>
                              setOpenMenu(null)
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-[#526174] hover:bg-[#f5f8fc]"
                          >
                            <Eye size={14} />
                            View Policy
                          </button>

                          <button
                            onClick={() =>
                              setOpenMenu(null)
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-[#526174] hover:bg-[#f5f8fc]"
                          >
                            <Edit3 size={14} />
                            Edit Policy
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(policy.id)
                            }
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredPolicies.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f4f8]">
                        <FileText
                          size={20}
                          className="text-[#9aa6b5]"
                        />
                      </div>

                      <p className="mt-3 text-[12px] font-semibold text-[#526174]">
                        No policies found
                      </p>

                      <p className="mt-1 text-[10px] text-[#9aa6b5]">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#edf0f4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#8190a3]">
            Showing{" "}
            <span className="font-semibold text-[#526174]">
              {filteredPolicies.length > 0 ? 1 : 0}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-[#526174]">
              {filteredPolicies.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#526174]">
              {policies.length}
            </span>{" "}
            policies
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

export default Policies;