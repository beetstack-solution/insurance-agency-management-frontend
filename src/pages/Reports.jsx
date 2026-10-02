import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  Download,
  FileText,
  Filter,
  PieChart,
  TrendingUp,
  Users,
  ShieldCheck,
  CircleDollarSign,
  AlertCircle,
} from "lucide-react";
import { useMemo } from "react";
import { useApp } from "../context/AppContext";

function Reports() {
  const { customers, policies, claims, renewals } = useApp();

  const totalPremium = useMemo(() => {
    return policies.reduce(
      (total, policy) => total + Number(policy.premium || 0),
      0
    );
  }, [policies]);

  const claimsPaid = useMemo(() => {
    return claims
      .filter((claim) => claim.status === "Approved")
      .reduce((total, claim) => {
        const amount = String(claim.amount || "")
          .replace(/[₹,\s]/g, "")
          .replace(/L/gi, "");

        return total + Number(amount || 0);
      }, 0);
  }, [claims]);

  const activePolicies = policies.filter(
    (policy) => policy.status === "Active"
  ).length;

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

  const dueSoonRenewals = renewals.filter(
    (renewal) => renewal.status === "Due Soon"
  ).length;

  const upcomingRenewals = renewals.filter(
    (renewal) => renewal.status === "Upcoming"
  ).length;

  const expiredRenewals = renewals.filter(
    (renewal) => renewal.status === "Expired"
  ).length;

  const policyData = useMemo(() => {
    const types = [
      "Health Insurance",
      "Life Insurance",
      "Vehicle Insurance",
      "Travel Insurance",
      "Home Insurance",
    ];

    const total = policies.length || 1;

    return types
      .map((type) => {
        const typePolicies = policies.filter(
          (policy) => policy.type === type
        );

        const premium = typePolicies.reduce(
          (sum, policy) => sum + Number(policy.premium || 0),
          0
        );

        return {
          name: type,
          count: typePolicies.length,
          percentage: Math.round((typePolicies.length / total) * 100),
          amount: `₹${(premium / 100000).toFixed(1)}L`,
        };
      })
      .filter((item) => item.count > 0);
  }, [policies]);

  const monthlyData = [
    { month: "Apr", value: 62 },
    { month: "May", value: 78 },
    { month: "Jun", value: 71 },
    { month: "Jul", value: 88 },
    { month: "Aug", value: 94 },
    { month: "Sep", value: 82 },
  ];

  const recentReports = [
    {
      id: "REP-1001",
      name: "Monthly Premium Report",
      type: "Premium",
      date: "30 Sep 2026",
      status: "Generated",
    },
    {
      id: "REP-1002",
      name: "Claims Summary Report",
      type: "Claims",
      date: "29 Sep 2026",
      status: "Generated",
    },
    {
      id: "REP-1003",
      name: "Policy Performance Report",
      type: "Policies",
      date: "28 Sep 2026",
      status: "Generated",
    },
    {
      id: "REP-1004",
      name: "Renewal Due Report",
      type: "Renewals",
      date: "27 Sep 2026",
      status: "Generated",
    },
  ];

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    }

    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }

    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#243b5a]">
            Reports
          </h1>

          <p className="mt-1 text-[12px] text-[#8190a3]">
            Analyze insurance performance and generate reports
          </p>
        </div>

        <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#2869df] px-4 text-[12px] font-semibold text-white transition hover:bg-[#1f5bc5]">
          <Download size={16} />
          Export Report
        </button>
      </div>

      <div className="rounded-xl border border-[#e6ebf1] bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#8190a3]" />

            <span className="text-[12px] font-semibold text-[#243b5a]">
              Report Filters
            </span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex h-9 items-center gap-2 rounded-lg border border-[#dfe5ec] px-3 text-[12px] text-[#52647a]">
              <CalendarDays size={14} />
              Sep 01 - Sep 30, 2026
              <ChevronDown size={14} />
            </button>

            <button className="flex h-9 items-center gap-2 rounded-lg border border-[#dfe5ec] px-3 text-[12px] text-[#52647a]">
              All Reports
              <ChevronDown size={14} />
            </button>

            <button className="h-9 rounded-lg bg-[#eef4ff] px-4 text-[12px] font-medium text-[#2869df]">
              Apply Filter
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
              <CircleDollarSign
                size={20}
                className="text-[#2869df]"
              />
            </div>

            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500">
              <TrendingUp size={13} />
              12.5%
            </span>
          </div>

          <p className="mt-4 text-[12px] text-[#8190a3]">
            Total Premium
          </p>

          <h2 className="mt-1 text-[23px] font-bold text-[#243b5a]">
            {formatCurrency(totalPremium)}
          </h2>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
              <AlertCircle
                size={20}
                className="text-red-500"
              />
            </div>

            <span className="text-[11px] font-medium text-red-500">
              8.2%
            </span>
          </div>

          <p className="mt-4 text-[12px] text-[#8190a3]">
            Claims Paid
          </p>

          <h2 className="mt-1 text-[23px] font-bold text-[#243b5a]">
            {formatCurrency(claimsPaid)}
          </h2>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <ShieldCheck
                size={20}
                className="text-emerald-500"
              />
            </div>

            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500">
              <TrendingUp size={13} />
              6.8%
            </span>
          </div>

          <p className="mt-4 text-[12px] text-[#8190a3]">
            Active Policies
          </p>

          <h2 className="mt-1 text-[23px] font-bold text-[#243b5a]">
            {activePolicies}
          </h2>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
              <Users
                size={20}
                className="text-purple-500"
              />
            </div>

            <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-500">
              <TrendingUp size={13} />
              9.4%
            </span>
          </div>

          <p className="mt-4 text-[12px] text-[#8190a3]">
            Total Customers
          </p>

          <h2 className="mt-1 text-[23px] font-bold text-[#243b5a]">
            {customers.length}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#243b5a]">
                Premium Collection
              </h2>

              <p className="mt-1 text-[11px] text-[#8190a3]">
                Monthly premium collection overview
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <BarChart3
                size={18}
                className="text-[#2869df]"
              />
            </div>
          </div>

          <div className="mt-8 flex h-[240px] items-end justify-between gap-3 border-b border-[#edf0f4] px-2">
            {monthlyData.map((item) => (
              <div
                key={item.month}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[10px] font-medium text-[#8190a3]">
                  ₹{item.value}K
                </span>

                <div
                  className="w-full max-w-[42px] rounded-t-md bg-[#2869df] transition hover:bg-[#1f5bc5]"
                  style={{
                    height: `${item.value * 2}px`,
                  }}
                />

                <span className="mb-2 text-[10px] text-[#8190a3]">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#243b5a]">
                Policy Distribution
              </h2>

              <p className="mt-1 text-[11px] text-[#8190a3]">
                Policies by insurance type
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50">
              <PieChart
                size={18}
                className="text-purple-500"
              />
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {policyData.map((policy) => (
              <div key={policy.name}>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#52647a]">
                    {policy.name}
                  </span>

                  <span className="text-[11px] font-semibold text-[#243b5a]">
                    {policy.count}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf1f6]">
                  <div
                    className="h-full rounded-full bg-[#2869df]"
                    style={{
                      width: `${policy.percentage}%`,
                    }}
                  />
                </div>

                <div className="mt-1 flex justify-between">
                  <span className="text-[10px] text-[#9aa6b5]">
                    {policy.percentage}%
                  </span>

                  <span className="text-[10px] text-[#8190a3]">
                    {policy.amount}
                  </span>
                </div>
              </div>
            ))}

            {policyData.length === 0 && (
              <p className="py-6 text-center text-[11px] text-[#8190a3]">
                No policy data available
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#243b5a]">
                Claims Summary
              </h2>

              <p className="mt-1 text-[11px] text-[#8190a3]">
                Current claims overview
              </p>
            </div>

            <FileText
              size={18}
              className="text-[#8190a3]"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-[#f8fafc] p-4">
              <p className="text-[11px] text-[#8190a3]">
                Total Claims
              </p>

              <p className="mt-1 text-[20px] font-bold text-[#243b5a]">
                {totalClaims}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8fafc] p-4">
              <p className="text-[11px] text-[#8190a3]">
                Approved
              </p>

              <p className="mt-1 text-[20px] font-bold text-emerald-500">
                {approvedClaims}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8fafc] p-4">
              <p className="text-[11px] text-[#8190a3]">
                Pending
              </p>

              <p className="mt-1 text-[20px] font-bold text-amber-500">
                {pendingClaims}
              </p>
            </div>

            <div className="rounded-lg bg-[#f8fafc] p-4">
              <p className="text-[11px] text-[#8190a3]">
                Rejected
              </p>

              <p className="mt-1 text-[20px] font-bold text-red-500">
                {rejectedClaims}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#e6ebf1] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-[#243b5a]">
                Renewal Summary
              </h2>

              <p className="mt-1 text-[11px] text-[#8190a3]">
                Policy renewal status
              </p>
            </div>

            <CalendarDays
              size={18}
              className="text-[#8190a3]"
            />
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <div className="flex justify-between">
                <span className="text-[11px] text-[#52647a]">
                  Due Soon
                </span>

                <span className="text-[11px] font-semibold text-amber-500">
                  {dueSoonRenewals}
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-[#edf1f6]">
                <div
                  className="h-full rounded-full bg-amber-400"
                  style={{
                    width: `${
                      renewals.length
                        ? (dueSoonRenewals / renewals.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-[11px] text-[#52647a]">
                  Upcoming
                </span>

                <span className="text-[11px] font-semibold text-blue-500">
                  {upcomingRenewals}
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-[#edf1f6]">
                <div
                  className="h-full rounded-full bg-[#2869df]"
                  style={{
                    width: `${
                      renewals.length
                        ? (upcomingRenewals / renewals.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-[11px] text-[#52647a]">
                  Expired
                </span>

                <span className="text-[11px] font-semibold text-red-500">
                  {expiredRenewals}
                </span>
              </div>

              <div className="mt-2 h-2 rounded-full bg-[#edf1f6]">
                <div
                  className="h-full rounded-full bg-red-400"
                  style={{
                    width: `${
                      renewals.length
                        ? (expiredRenewals / renewals.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e6ebf1] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#edf0f4] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-[#243b5a]">
              Recent Reports
            </h2>

            <p className="mt-1 text-[11px] text-[#8190a3]">
              Recently generated reports
            </p>
          </div>

          <button className="flex items-center gap-2 text-[11px] font-medium text-[#2869df]">
            View All
            <TrendingUp size={14} />
          </button>
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#edf0f4] bg-[#fafbfd]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Report ID
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Report Name
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Type
                </th>

                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wide text-[#8190a3]">
                  Date
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
              {recentReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-[#f0f2f5] last:border-0 hover:bg-[#fafbfd]"
                >
                  <td className="px-5 py-4 text-[11px] font-semibold text-[#2869df]">
                    {report.id}
                  </td>

                  <td className="px-5 py-4 text-[11px] font-medium text-[#243b5a]">
                    {report.name}
                  </td>

                  <td className="px-5 py-4 text-[11px] text-[#52647a]">
                    {report.type}
                  </td>

                  <td className="px-5 py-4 text-[11px] text-[#52647a]">
                    {report.date}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                      {report.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button className="rounded-lg p-2 text-[#8190a3] transition hover:bg-blue-50 hover:text-[#2869df]">
                      <Download size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-3 p-4 md:hidden">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="rounded-lg border border-[#edf0f4] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold text-[#2869df]">
                    {report.id}
                  </p>

                  <h3 className="mt-1 text-[12px] font-semibold text-[#243b5a]">
                    {report.name}
                  </h3>

                  <p className="mt-1 text-[10px] text-[#8190a3]">
                    {report.type} • {report.date}
                  </p>
                </div>

                <button className="rounded-lg bg-blue-50 p-2 text-[#2869df]">
                  <Download size={14} />
                </button>
              </div>

              <span className="mt-3 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-600">
                {report.status}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-[#edf0f4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] text-[#8190a3]">
            Showing {recentReports.length} recently generated reports
          </p>

          <button className="text-[11px] font-medium text-[#2869df]">
            Generate New Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reports;