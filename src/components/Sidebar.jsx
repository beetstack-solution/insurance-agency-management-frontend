// src/components/Sidebar.jsx
import {
  BarChart3,
  Boxes,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileText,
  KeyRound,
  Layers3,
  LayoutDashboard,
  ListChecks,
  Settings,
  Shield,
  ShieldCheck,
  UserCog,
  UserRound,
  Users,
  X,
  Receipt,
  FilePlus2,
  FileSearch,
  FileCheck2,
  UserPlus,
  UserCog2,
  Building2,
  UserCheck,
  Clock,
  RefreshCcw,
  AlertTriangle,
  PieChart,
  TrendingUp,
  FileBarChart2,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useRbac } from "../rbac/useRbac";

/* ============================================================
   MENU CONFIG — supports flat items AND dropdown groups
   ============================================================ */
const MENU_CONFIG = [
  {
    key: "DASHBOARD",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },

  /* ---------- POLICIES (dropdown) ---------- */
  {
    key: "POLICIES",
    label: "Policies Management",
    icon: FileText,
    children: [
      { key: "POLICIES_ALL",   label: "All Policies",  icon: FileText,   path: "/policies" },
      { key: "POLICIES_NEW",   label: "New Policy",    icon: FilePlus2,  path: "/policies/new" },
      { key: "POLICIES_RENEW", label: "Renew Policy",  icon: RefreshCcw, path: "/policies/renew" },
    ],
  },

  /* ---------- CUSTOMERS (dropdown) ---------- */
  {
    key: "CUSTOMERS",
    label: "Customers Management",
    icon: Users,
    children: [
      { key: "CUSTOMERS_ALL",   label: "All Customers", icon: Users,     path: "/customers" },
      { key: "CUSTOMERS_NEW",   label: "Add Customer",  icon: UserPlus,  path: "/customers/new" },
      { key: "CUSTOMERS_AGENT", label: "Agents",        icon: UserCog2,  path: "/customers/agents" },
      { key: "CUSTOMERS_CORP",  label: "Corporate",     icon: Building2, path: "/customers/corporate" },
    ],
  },

  /* ---------- CLAIMS (flat) ---------- */
  { key: "CLAIMS",     label: "Claims",     icon: ShieldCheck, path: "/claims" },

  /* ---------- QUOTATIONS (flat) ---------- */
  { key: "QUOTATIONS", label: "Quotations", icon: Receipt,     path: "/quotations" },

  /* ---------- RENEWALS (dropdown) ---------- */
  {
    key: "RENEWALS",
    label: "Renewals Management",
    icon: CalendarDays,
    children: [
      { key: "RENEWALS_UPCOMING", label: "Upcoming Renewals", icon: Clock,         path: "/renewals" },
      { key: "RENEWALS_DUE",      label: "Due Today",         icon: AlertTriangle, path: "/renewals/due" },
      { key: "RENEWALS_DONE",     label: "Completed",         icon: UserCheck,     path: "/renewals/completed" },
    ],
  },

  /* ---------- REPORTS (dropdown) ---------- */
  {
    key: "REPORTS",
    label: "Reports Management",
    icon: BarChart3,
    children: [
      { key: "REPORTS_SALES",    label: "Sales Report",    icon: TrendingUp,    path: "/reports" },
      { key: "REPORTS_POLICY",   label: "Policy Report",   icon: FileBarChart2, path: "/reports/policies" },
      { key: "REPORTS_CUSTOMER", label: "Customer Report", icon: PieChart,      path: "/reports/customers" },
      { key: "REPORTS_CLAIM",    label: "Claims Report",   icon: FileSearch,    path: "/reports/claims" },
    ],
  },
];

const SETTINGS_CONFIG = [
  { key: "USERS",            label: "Users",            icon: UserCog,     path: "/settings/users" },
  { key: "ROLES",            label: "Roles",            icon: UserRound,   path: "/settings/roles" },
  { key: "PERMISSIONS",      label: "Permissions",      icon: KeyRound,    path: "/settings/permissions" },
  { key: "INSURANCE_TYPES",  label: "Insurance Types",  icon: Shield,      path: "/settings/insurance-types" },
  { key: "MODULES",          label: "Modules",          icon: Boxes,       path: "/settings/modules" },
  { key: "MODULE_ACTIONS",   label: "Module Actions",   icon: ListChecks,  path: "/settings/module-actions" },
  { key: "MODULE_TYPES",     label: "Module Types",     icon: Layers3,     path: "/settings/module-types" },
  { key: "ROLE_PERMISSIONS", label: "Role Permissions", icon: ShieldCheck, path: "/settings/role-permissions" },
];

/* ============================================================ */

const isGroupActive = (group, pathname) =>
  group.children?.some(
    (c) => pathname === c.path || pathname.startsWith(c.path + "/"),
  );

export default function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { canAccessMenu, user, role } = useRbac();

  const [collapsed, setCollapsed] = useState(false);

  /* Dropdown open state */
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    MENU_CONFIG.forEach((g) => {
      if (g.children && isGroupActive(g, location.pathname)) {
        initial[g.key] = true;
      }
    });
    initial.SETTINGS = location.pathname.startsWith("/settings");
    return initial;
  });

  /* Re-open the active group on route change */
  useEffect(() => {
    setOpenGroups((prev) => {
      const next = { ...prev };
      MENU_CONFIG.forEach((g) => {
        if (g.children && isGroupActive(g, location.pathname)) {
          next[g.key] = true;
        }
      });
      return next;
    });
  }, [location.pathname]);

  /* ── RBAC filter — children filtered individually,
       parent kept if any child (or parent itself) is allowed ── */
  const menuItems = useMemo(() => {
    return MENU_CONFIG.map((item) => {
      if (item.children) {
        const allowedChildren = item.children.filter((c) =>
          canAccessMenu(c.key),
        );
        if (allowedChildren.length === 0) return null;
        return { ...item, children: allowedChildren };
      }
      return canAccessMenu(item.key) ? item : null;
    }).filter(Boolean);
  }, [canAccessMenu]);

  const settingsItems = useMemo(
    () => SETTINGS_CONFIG.filter((i) => canAccessMenu(i.key)),
    [canAccessMenu],
  );
  const showSettings = settingsItems.length > 0;

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const toggleGroup = (key) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleCollapsed = () =>
    setCollapsed((c) => {
      const next = !c;
      if (!next && location.pathname.startsWith("/settings")) {
        setOpenGroups((p) => ({ ...p, SETTINGS: true }));
      }
      return next;
    });

  const userName = user?.userName || "User";
  const userRole = role?.roleName || "User";
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen shrink-0 bg-[#102b52]
          transition-[width,transform] duration-300 ease-in-out
          lg:sticky lg:top-0 lg:z-20
          ${collapsed ? "lg:w-[72px]" : "lg:w-[250px]"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* HEADER */}
          <div className="flex h-[70px] shrink-0 items-center border-b border-white/10 px-3">
            <button
              onClick={() => handleNavigate("/dashboard")}
              className={`flex items-center gap-2.5 rounded-lg ${
                collapsed ? "mx-auto" : "flex-1 min-w-0"
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2869df]">
                <ShieldCheck size={21} className="text-white" />
              </div>
              {!collapsed && (
                <div className="min-w-0 text-left">
                  <p className="truncate text-[15px] font-bold leading-tight text-white">
                    SecureLife
                  </p>
                  <p className="truncate text-[9px] leading-tight text-white/50">
                    Insurance Agency
                  </p>
                </div>
              )}
            </button>

            <button
              onClick={toggleCollapsed}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={`hidden lg:flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                          text-white/60 transition hover:bg-white/10 hover:text-white
                          ${collapsed ? "mx-auto" : "ml-2"}`}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="ml-auto rounded-lg p-1.5 text-white/60 hover:bg-white/10 lg:hidden"
            >
              <X size={19} />
            </button>
          </div>

          {/* NAV */}
          <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-5">
            {menuItems.length > 0 && !collapsed && (
              <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-wider text-white/40">
                Main Menu
              </p>
            )}

            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                /* ---------- DROPDOWN ---------- */
                if (item.children) {
                  const activeGroup = isGroupActive(item, location.pathname);
                  const isOpenGroup = !!openGroups[item.key];

                  return (
                    <div key={item.key}>
                      <button
                        onClick={() => {
                          if (collapsed) {
                            setCollapsed(false);
                            setOpenGroups((p) => ({ ...p, [item.key]: true }));
                          } else {
                            toggleGroup(item.key);
                          }
                        }}
                        title={collapsed ? item.label : undefined}
                        className={`
                          flex w-full items-center rounded-lg transition
                          ${collapsed ? "justify-center px-0 py-3" : "justify-between px-3 py-2.5"}
                          ${activeGroup ? "text-white" : "text-white/65 hover:bg-white/5 hover:text-white"}
                          hover:bg-white/5
                        `}
                      >
                        <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3 min-w-0"}`}>
                          <Icon size={17} className="shrink-0" />
                          {!collapsed && (
                            <span className="truncate text-[12px]">{item.label}</span>
                          )}
                        </span>

                        {!collapsed && (
                          <ChevronDown
                            size={15}
                            className={`shrink-0 transition-transform duration-200 ${
                              isOpenGroup ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {!collapsed && isOpenGroup && (
                        <div className="mt-1 space-y-1 pl-3">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            const active = location.pathname === child.path;
                            return (
                              <button
                                key={child.path}
                                onClick={() => handleNavigate(child.path)}
                                className={`
                                  flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                                  text-left text-[11px] transition
                                  ${
                                    active
                                      ? "bg-white/10 text-white"
                                      : "text-white/55 hover:bg-white/5 hover:text-white"
                                  }
                                `}
                              >
                                <ChildIcon size={15} className="shrink-0" />
                                <span className="truncate">{child.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                /* ---------- FLAT ---------- */
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    title={collapsed ? item.label : undefined}
                    className={`
                      flex w-full items-center rounded-lg transition
                      ${collapsed ? "justify-center px-0 py-3" : "gap-3 px-3 py-2.5"}
                      ${
                        active
                          ? "bg-[#2869df] text-white"
                          : "text-white/65 hover:bg-white/5 hover:text-white"
                      }
                    `}
                  >
                    <Icon size={17} className="shrink-0" />
                    {!collapsed && (
                      <span className="truncate text-[12px]">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* SETTINGS */}
            {showSettings && (
              <>
                {!collapsed && (
                  <p className="mb-2 mt-7 px-3 text-[9px] font-semibold uppercase tracking-wider text-white/40">
                    Administration
                  </p>
                )}

                <button
                  onClick={() => {
                    if (collapsed) {
                      setCollapsed(false);
                      setOpenGroups((p) => ({ ...p, SETTINGS: true }));
                    } else {
                      toggleGroup("SETTINGS");
                    }
                  }}
                  title={collapsed ? "Settings" : undefined}
                  className={`
                    mt-2 flex w-full items-center rounded-lg transition
                    ${collapsed ? "justify-center px-0 py-3" : "justify-between px-3 py-2.5"}
                    ${location.pathname.startsWith("/settings") ? "text-white" : "text-white/65"}
                    hover:bg-white/5
                  `}
                >
                  <span className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
                    <Settings size={17} className="shrink-0" />
                    {!collapsed && <span className="text-[12px]">Settings</span>}
                  </span>

                  {!collapsed && (
                    <ChevronDown
                      size={15}
                      className={`shrink-0 transition-transform duration-200 ${
                        openGroups.SETTINGS ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {!collapsed && openGroups.SETTINGS && (
                  <div className="mt-1 space-y-1 pl-3">
                    {settingsItems.map((item) => {
                      const Icon = item.icon;
                      const active = location.pathname === item.path;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavigate(item.path)}
                          className={`
                            flex w-full items-center gap-3 rounded-lg px-3 py-2.5
                            text-left text-[11px] transition
                            ${
                              active
                                ? "bg-white/10 text-white"
                                : "text-white/55 hover:bg-white/5 hover:text-white"
                            }
                          `}
                        >
                          <Icon size={15} className="shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </nav>

          {/* FOOTER */}
          <div className="shrink-0 border-t border-white/10 p-4">
            <div
              className={`flex items-center rounded-lg bg-white/5 ${
                collapsed ? "justify-center p-2" : "gap-3 p-3"
              }`}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2869df] text-[10px] font-semibold text-white">
                {initials}
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-white">
                    {userName}
                  </p>
                  <p className="truncate text-[9px] text-white/45">{userRole}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}