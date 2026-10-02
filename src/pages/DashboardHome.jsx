import {
  FileText,
  ShieldCheck,
  Clock,
  Users,
  TrendingUp,
  CalendarDays,
  Megaphone,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { useApp } from "../context/AppContext";

function DashboardHome() {
  const {
    customers,
    policies,
    claims,
    renewals,
  } = useApp();

  const totalPolicies = policies.length;

  const activePolicies = policies.filter(
    (policy) => policy.status === "Active"
  ).length;

  const expiringPolicies = renewals.filter(
    (renewal) =>
      renewal.status === "Due Soon" ||
      renewal.status === "Expired"
  ).length;

  const totalCustomers = customers.length;

  const totalPremium = policies.reduce(
    (total, policy) => total + Number(policy.premium || 0),
    0
  );

  const approvedClaims = claims.filter(
    (claim) => claim.status === "Approved"
  ).length;

  const pendingClaims = claims.filter(
    (claim) =>
      claim.status === "Pending" ||
      claim.status === "Under Review"
  ).length;

  const rejectedClaims = claims.filter(
    (claim) => claim.status === "Rejected"
  ).length;

  const totalClaims = claims.length;

  const stats = [
    {
      title: "Total Policies",
      value: totalPolicies,
      change: "12%",
      icon: FileText,
      color: "blue",
      positive: true,
    },
    {
      title: "Active Policies",
      value: activePolicies,
      change: "10%",
      icon: ShieldCheck,
      color: "green",
      positive: true,
    },
    {
      title: "Expiring Policies",
      value: expiringPolicies,
      change: "5%",
      icon: Clock,
      color: "orange",
      positive: false,
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      change: "8%",
      icon: Users,
      color: "purple",
      positive: true,
    },
  ];

  const recentPolicies = [...policies].slice(-5).reverse();

  const upcomingRenewals = [...renewals]
    .filter(
      (renewal) =>
        renewal.status === "Due Soon" ||
        renewal.status === "Upcoming"
    )
    .slice(0, 5);

  const recentCustomers = [...customers].slice(-5).reverse();

  const getCustomerName = (customerId) => {
    const customer = customers.find(
      (item) => item.customerId === customerId
    );

    return customer?.name || "Unknown";
  };

  const getCustomerPolicy = (customerId) => {
    return policies.find(
      (policy) => policy.customerId === customerId
    );
  };

  const iconStyles = {
    blue: "bg-[#e6f0ff] text-[#2869df]",
    green: "bg-[#e4f8ef] text-[#20a46b]",
    orange: "bg-[#fff1df] text-[#ed9b2f]",
    purple: "bg-[#f0eaff] text-[#7b4dd8]",
  };

  return (
    <>
      <div
        id="top"
        className="scroll-mt-24 mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-[23px] font-bold leading-7 tracking-[-0.3px] text-[#102b52] sm:text-[25px]">
            Good Morning, Joyal 👋
          </h1>

          <p className="mt-1 text-[12px] leading-5 text-[#728094] sm:text-[13px]">
            Here's what's happening with your insurance business today.
          </p>
        </div>

        <p className="text-[11px] font-medium text-[#6f7d90]">
          Tue, 2 Sep 2026
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-[10px] border border-[#e7ebf1] bg-white px-4 py-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[12px] font-medium text-[#718096]">
                    {stat.title}
                  </p>

                  <h2 className="mt-1.5 text-[25px] font-bold leading-8 text-[#102b52]">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-[38px] w-[38px] items-center justify-center rounded-[9px] ${iconStyles[stat.color]}`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <div
                className={`mt-2 flex items-center gap-1 text-[10px] ${
                  stat.positive
                    ? "text-[#20a46b]"
                    : "text-[#e89b35]"
                }`}
              >
                {stat.positive ? (
                  <ArrowUp size={11} />
                ) : (
                  <ArrowDown size={11} />
                )}

                <span className="font-medium">
                  {stat.change}
                </span>

                <span className="text-[#8a95a4]">
                  from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
        <div
          id="reports"
          className="scroll-mt-24 rounded-[10px] border border-[#e7ebf1] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)] sm:p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp
                size={18}
                className="text-[#2869df]"
              />

              <h2 className="text-[13px] font-semibold text-[#1a3151] sm:text-[14px]">
                Premium Collection
              </h2>
            </div>

            <button className="flex items-center gap-1 text-[10px] text-[#68778a] sm:text-[11px]">
              This Month
              <ChevronDown size={13} />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="text-[24px] font-bold text-[#102b52]">
              ₹ {totalPremium.toLocaleString("en-IN")}
            </h3>

            <p className="mt-1 flex items-center gap-1 text-[10px] text-[#20a46b]">
              <ArrowUp size={11} />
              Total premium from policies
            </p>
          </div>

          <div className="mt-4 h-[170px] w-full sm:h-[185px]">
            <svg
              viewBox="0 0 600 200"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient
                  id="chartFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#2869df"
                    stopOpacity="0.20"
                  />

                  <stop
                    offset="100%"
                    stopColor="#2869df"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <line
                x1="0"
                y1="40"
                x2="600"
                y2="40"
                stroke="#edf0f4"
              />

              <line
                x1="0"
                y1="80"
                x2="600"
                y2="80"
                stroke="#edf0f4"
              />

              <line
                x1="0"
                y1="120"
                x2="600"
                y2="120"
                stroke="#edf0f4"
              />

              <line
                x1="0"
                y1="160"
                x2="600"
                y2="160"
                stroke="#edf0f4"
              />

              <path
                d="M40 150 C85 137 130 132 180 120 C225 110 255 115 300 98 C345 84 380 91 420 77 C470 60 520 45 560 28 L560 180 L40 180 Z"
                fill="url(#chartFill)"
              />

              <path
                d="M40 150 C85 137 130 132 180 120 C225 110 255 115 300 98 C345 84 380 91 420 77 C470 60 520 45 560 28"
                fill="none"
                stroke="#2869df"
                strokeWidth="3"
              />

              <circle
                cx="40"
                cy="150"
                r="4"
                fill="#2869df"
              />

              <circle
                cx="180"
                cy="120"
                r="4"
                fill="#2869df"
              />

              <circle
                cx="300"
                cy="98"
                r="4"
                fill="#2869df"
              />

              <circle
                cx="420"
                cy="77"
                r="4"
                fill="#2869df"
              />

              <circle
                cx="560"
                cy="28"
                r="4"
                fill="#2869df"
              />
            </svg>
          </div>

          <div className="flex justify-between px-2 text-[10px] text-[#8792a1]">
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </div>

        <div
          id="claims"
          className="scroll-mt-24 rounded-[10px] border border-[#e7ebf1] bg-white p-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)] sm:p-5"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={18}
                className="text-[#2869df]"
              />

              <h2 className="text-[13px] font-semibold text-[#1a3151] sm:text-[14px]">
                Claims Overview
              </h2>
            </div>

            <button className="flex items-center gap-1 text-[10px] text-[#68778a] sm:text-[11px]">
              This Month
              <ChevronDown size={13} />
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <div className="relative h-[145px] w-[145px] sm:h-[155px] sm:w-[155px]">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: `conic-gradient(
                    #36b87e 0deg ${totalClaims ? (approvedClaims / totalClaims) * 360 : 0}deg,
                    #f4c644 ${totalClaims ? (approvedClaims / totalClaims) * 360 : 0}deg ${totalClaims ? ((approvedClaims + pendingClaims) / totalClaims) * 360 : 0}deg,
                    #ef6666 ${totalClaims ? ((approvedClaims + pendingClaims) / totalClaims) * 360 : 0}deg 360deg
                  )`,
                }}
              />

              <div className="absolute inset-[23px] flex flex-col items-center justify-center rounded-full bg-white">
                <span className="text-[21px] font-bold text-[#102b52]">
                  {totalClaims}
                </span>

                <span className="text-[10px] text-[#7c8795]">
                  Total Claims
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#36b87e]" />

                <span className="w-[75px] text-[11px] text-[#69788a]">
                  Approved
                </span>

                <span className="rounded-md bg-[#eaf8f1] px-2 py-1 text-[10px] font-medium text-[#20a46b]">
                  {approvedClaims}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f4c644]" />

                <span className="w-[75px] text-[11px] text-[#69788a]">
                  In Progress
                </span>

                <span className="rounded-md bg-[#fff8df] px-2 py-1 text-[10px] font-medium text-[#d99f22]">
                  {pendingClaims}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ef6666]" />

                <span className="w-[75px] text-[11px] text-[#69788a]">
                  Rejected
                </span>

                <span className="rounded-md bg-[#fff0f0] px-2 py-1 text-[10px] font-medium text-[#e15c5c]">
                  {rejectedClaims}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div
          id="policies"
          className="scroll-mt-24 overflow-hidden rounded-[10px] border border-[#e7ebf1] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03)]"
        >
          <div className="flex items-center justify-between border-b border-[#edf0f4] px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2">
              <FileText
                size={17}
                className="text-[#2869df]"
              />

              <h2 className="text-[13px] font-semibold text-[#1a3151] sm:text-[14px]">
                Recent Policies
              </h2>
            </div>

            <button className="text-[10px] font-medium text-[#2869df] sm:text-[11px]">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[590px]">
              <thead>
                <tr className="bg-[#fafbfd] text-left text-[10px] text-[#7a8797]">
                  <th className="px-4 py-2.5 font-medium">
                    Policy No
                  </th>

                  <th className="px-4 py-2.5 font-medium">
                    Customer
                  </th>

                  <th className="px-4 py-2.5 font-medium">
                    Type
                  </th>

                  <th className="px-4 py-2.5 font-medium">
                    Status
                  </th>

                  <th className="px-4 py-2.5 font-medium">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {recentPolicies.map((policy) => (
                  <tr
                    key={policy.id}
                    className="border-t border-[#f0f2f5] text-[11px] text-[#536274]"
                  >
                    <td className="px-4 py-2.5 font-medium text-[#44536a]">
                      {policy.policyNo}
                    </td>

                    <td className="px-4 py-2.5">
                      {getCustomerName(policy.customerId)}
                    </td>

                    <td className="px-4 py-2.5">
                      {policy.type}
                    </td>

                    <td className="px-4 py-2.5">
                      <span className="rounded-md bg-[#e7f8f0] px-2 py-1 text-[10px] font-medium text-[#20a46b]">
                        {policy.status}
                      </span>
                    </td>

                    <td className="px-4 py-2.5">
                      {policy.startDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="renewals"
          className="scroll-mt-24 overflow-hidden rounded-[10px] border border-[#e7ebf1] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03)]"
        >
          <div className="flex items-center justify-between border-b border-[#edf0f4] px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2">
              <CalendarDays
                size={17}
                className="text-[#2869df]"
              />

              <h2 className="text-[13px] font-semibold text-[#1a3151] sm:text-[14px]">
                Upcoming Renewals
              </h2>
            </div>

            <button className="text-[10px] font-medium text-[#2869df] sm:text-[11px]">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[470px]">
              <thead>
                <tr className="bg-[#fafbfd] text-left text-[10px] text-[#7a8797]">
                  <th className="px-5 py-2.5 font-medium">
                    Customer
                  </th>

                  <th className="px-5 py-2.5 font-medium">
                    Policy Type
                  </th>

                  <th className="px-5 py-2.5 font-medium">
                    Renewal Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {upcomingRenewals.map((renewal) => (
                  <tr
                    key={renewal.id}
                    className="border-t border-[#f0f2f5] text-[11px] text-[#536274]"
                  >
                    <td className="px-5 py-2.5">
                      {renewal.customer}
                    </td>

                    <td className="px-5 py-2.5">
                      {renewal.type}
                    </td>

                    <td className="px-5 py-2.5">
                      <span
                        className={`rounded-md px-2 py-1 text-[10px] font-medium ${
                          renewal.status === "Due Soon"
                            ? "bg-[#fff0f0] text-[#e15c5c]"
                            : "bg-[#e7f8f0] text-[#20a46b]"
                        }`}
                      >
                        {renewal.expiry}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        id="customers"
        className="scroll-mt-24 mt-5 overflow-hidden rounded-[10px] border border-[#e7ebf1] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.03)]"
      >
        <div className="flex items-center justify-between border-b border-[#edf0f4] px-4 py-3.5 sm:px-5">
          <div className="flex items-center gap-2">
            <Users
              size={17}
              className="text-[#2869df]"
            />

            <div>
              <h2 className="text-[13px] font-semibold text-[#1a3151] sm:text-[14px]">
                Customers
              </h2>

              <p className="mt-0.5 text-[10px] text-[#8792a1]">
                Recent customers
              </p>
            </div>
          </div>

          <span className="rounded-md bg-[#e6f0ff] px-2.5 py-1 text-[10px] font-medium text-[#2869df]">
            {totalCustomers} Total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="bg-[#fafbfd] text-left text-[10px] text-[#7a8797]">
                <th className="px-5 py-3 font-medium">
                  Customer
                </th>

                <th className="px-5 py-3 font-medium">
                  Policy No
                </th>

                <th className="px-5 py-3 font-medium">
                  Policy Type
                </th>

                <th className="px-5 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentCustomers.map((customer) => {
                const customerPolicy = getCustomerPolicy(
                  customer.customerId
                );

                return (
                  <tr
                    key={customer.customerId}
                    className="border-t border-[#f0f2f5] text-[11px] text-[#536274]"
                  >
                    <td className="px-5 py-3 font-medium text-[#243b5a]">
                      {customer.name}
                    </td>

                    <td className="px-5 py-3">
                      {customerPolicy?.policyNo || "-"}
                    </td>

                    <td className="px-5 py-3">
                      {customerPolicy?.type || "-"}
                    </td>

                    <td className="px-5 py-3">
                      <span className="rounded-md bg-[#e7f8f0] px-2 py-1 text-[10px] font-medium text-[#20a46b]">
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-4 rounded-[10px] bg-[#e5f0ff] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <Megaphone
              size={19}
              className="text-[#2869df]"
            />
          </div>

          <div>
            <p className="text-[11px] text-[#2869df] sm:text-[12px]">
              New Offer:

              <span className="font-semibold text-[#183254]">
                {" "}
                Get 10% extra discount on health insurance policies!
              </span>
            </p>

            <p className="mt-1 text-[10px] text-[#738196] sm:text-[11px]">
              Protect your health and save more. Offer valid till 30 Sep 2026.
            </p>
          </div>
        </div>

        <button className="flex items-center justify-center gap-2.5 rounded-lg bg-[#2869df] px-5 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#1f5dcc]">
          View Details

          <ArrowRight size={14} />
        </button>
      </div>
    </>
  );
}

export default DashboardHome;