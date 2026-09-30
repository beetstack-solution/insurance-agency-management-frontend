import {
  BarChart3,
  Boxes,
  CalendarDays,
  ChevronDown,
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
} from "lucide-react";
import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router";

function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [settingsOpen, setSettingsOpen] =
    useState(
      location.pathname.startsWith("/settings")
    );

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "Policies",
      icon: FileText,
      path: "/policies",
    },
    {
      label: "Customers",
      icon: Users,
      path: "/customers",
    },
    {
      label: "Claims",
      icon: ShieldCheck,
      path: "/claims",
    },
    {
      label: "Renewals",
      icon: CalendarDays,
      path: "/renewals",
    },
    {
      label: "Reports",
      icon: BarChart3,
      path: "/reports",
    },
  ];

  const settingsItems = [
    {
      label: "Users",
      icon: UserCog,
      path: "/settings/users",
    },
    {
      label: "Roles",
      icon: UserRound,
      path: "/settings/roles",
    },
    {
      label: "Permissions",
      icon: KeyRound,
      path: "/settings/permissions",
    },
    {
      label: "Insurance Types",
      icon: Shield,
      path: "/settings/insurance-types",
    },
    {
      label: "Modules",
      icon: Boxes,
      path: "/settings/modules",
    },
    {
      label: "Module Actions",
      icon: ListChecks,
      path: "/settings/module-actions",
    },
    {
      label: "Module Types",
      icon: Layers3,
      path: "/settings/module-types",
    },
    {
      label: "Role Permissions",
      icon: ShieldCheck,
      path: "/settings/role-permissions",
    },
  ];

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) =>
    location.pathname === path;

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-[250px] shrink-0 bg-[#102b52] transition-transform duration-300 lg:sticky lg:z-20 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[70px] items-center justify-between border-b border-white/10 px-5">
            <button
              onClick={() =>
                handleNavigate("/dashboard")
              }
              className="flex items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2869df]">
                <ShieldCheck
                  size={21}
                  className="text-white"
                />
              </div>

              <div className="text-left">
                <p className="text-[15px] font-bold text-white">
                  SecureLife
                </p>

                <p className="text-[9px] text-white/50">
                  Insurance Agency
                </p>
              </div>
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 lg:hidden"
            >
              <X size={19} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-5">
            <p className="mb-2 px-3 text-[9px] font-semibold uppercase tracking-wider text-white/40">
              Main Menu
            </p>

            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(
                  item.path
                );

                return (
                  <button
                    key={item.path}
                    onClick={() =>
                      handleNavigate(item.path)
                    }
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] transition ${
                      active
                        ? "bg-[#2869df] text-white"
                        : "text-white/65 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            <p className="mb-2 mt-7 px-3 text-[9px] font-semibold uppercase tracking-wider text-white/40">
              Administration
            </p>

            <button
              onClick={() =>
                setSettingsOpen(!settingsOpen)
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[12px] ${
                location.pathname.startsWith(
                  "/settings"
                )
                  ? "text-white"
                  : "text-white/65"
              } hover:bg-white/5`}
            >
              <span className="flex items-center gap-3">
                <Settings size={17} />
                Settings
              </span>

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  settingsOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {settingsOpen && (
              <div className="mt-1 space-y-1 pl-3">
                {settingsItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(
                    item.path
                  );

                  return (
                    <button
                      key={item.path}
                      onClick={() =>
                        handleNavigate(item.path)
                      }
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[11px] ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/55 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon size={15} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2869df] text-[10px] font-semibold text-white">
                JS
              </div>

              <div>
                <p className="text-[11px] font-semibold text-white">
                  Joyal Shaji
                </p>

                <p className="text-[9px] text-white/45">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;