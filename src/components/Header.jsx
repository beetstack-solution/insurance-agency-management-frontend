import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  UserRound,
  Check,
  Maximize2,
  Minimize2,
  Search,
  Heart,
  Car,
  Home,
  Plane,
  Briefcase,
  ShieldCheck,
  Building2,
  Umbrella,
  X,
  CheckCheck,
  FileText,
  AlertTriangle,
  CalendarClock,
  UserPlus,
  CreditCard,
  Info,
  Mail,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../store/hooks/useAuth";

/* ══════════════════════════════════════════════════════════════
   Insurance icon map
   ══════════════════════════════════════════════════════════════ */
const ICON_RULES = [
  { match: ["HEALTH"], icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
  { match: ["LIFE"], icon: Umbrella, color: "text-violet-500", bg: "bg-violet-50" },
  { match: ["VEHICLE", "MOTOR", "AUTO"], icon: Car, color: "text-sky-500", bg: "bg-sky-50" },
  { match: ["HOME", "PROPERTY", "HOUSE"], icon: Home, color: "text-amber-500", bg: "bg-amber-50" },
  { match: ["TRAVEL"], icon: Plane, color: "text-cyan-500", bg: "bg-cyan-50" },
  { match: ["CORPORATE", "BUSINESS", "COMMERCIAL"], icon: Briefcase, color: "text-indigo-500", bg: "bg-indigo-50" },
  { match: ["GROUP", "INSTITUTIONAL"], icon: Building2, color: "text-emerald-500", bg: "bg-emerald-50" },
];
function pickIcon(item) {
  const key = `${item?.nameAlias ?? ""} ${item?.code ?? ""} ${item?.name ?? ""}`.toUpperCase();
  for (const rule of ICON_RULES) if (rule.match.some((m) => key.includes(m))) return rule;
  return { icon: ShieldCheck, color: "text-[#2869df]", bg: "bg-[#eaf1ff]" };
}

/* ══════════════════════════════════════════════════════════════
   Notification type → icon + color map
   ══════════════════════════════════════════════════════════════ */
const NOTIF_TYPES = {
  POLICY:   { icon: FileText,       color: "text-[#2869df]", bg: "bg-[#eaf1ff]" },
  CLAIM:    { icon: AlertTriangle,  color: "text-amber-600", bg: "bg-amber-50" },
  RENEWAL:  { icon: CalendarClock,  color: "text-rose-500",  bg: "bg-rose-50" },
  CUSTOMER: { icon: UserPlus,       color: "text-emerald-600", bg: "bg-emerald-50" },
  PAYMENT:  { icon: CreditCard,     color: "text-violet-600", bg: "bg-violet-50" },
  SYSTEM:   { icon: Info,           color: "text-slate-600", bg: "bg-slate-100" },
};

/* ══════════════════════════════════════════════════════════════
   Demo notifications — replace with your API later
   ══════════════════════════════════════════════════════════════ */
const DEMO_NOTIFICATIONS = [
  {
    id: "n1", type: "POLICY", title: "New policy issued", read: false,
    message: "POL-2026-014 has been issued for Anjali Nair.",
    time: "2 min ago",
  },
  {
    id: "n2", type: "CLAIM", title: "Claim requires review", read: false,
    message: "CLM-1002 is pending assessment for over 24 hours.",
    time: "1 hour ago",
  },
  {
    id: "n3", type: "RENEWAL", title: "Policy expiring soon", read: false,
    message: "POL-2026-001 expires in 4 days. Notify the customer.",
    time: "3 hours ago",
  },
  {
    id: "n4", type: "CUSTOMER", title: "New customer registered", read: true,
    message: "Sneha Joseph was added by Agent Joyal.",
    time: "Yesterday",
  },
  {
    id: "n5", type: "SYSTEM", title: "System maintenance", read: true,
    message: "Scheduled maintenance on Sunday, 2:00 AM–4:00 AM IST.",
    time: "2 days ago",
  },
];

const timeAgo = (s) => s;

/* ══════════════════════════════════════════════════════════════
   HEADER
   ══════════════════════════════════════════════════════════════ */
export default function Header({ setIsOpen }) {
  /* ── dropdown open state ── */
  const [profileOpen, setProfileOpen] = useState(false);
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);

  /* ── notifications (local state — swap for Redux/API later) ── */
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);

  /* ── refs ── */
  const profileRef = useRef(null);
  const insuranceRef = useRef(null);
  const notifRef = useRef(null);
  const searchInputRef = useRef(null);

  const navigate = useNavigate();

  const {
    insuranceTypes,
    insuranceType,
    changeInsuranceType,
    user,
    role,
    canScoped,
    logout,
  } = useAuth();

  /* ── close all dropdowns on outside click ── */
  useEffect(() => {
    const onClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
      if (insuranceRef.current && !insuranceRef.current.contains(e.target)) {
        setInsuranceOpen(false);
        setSearch("");
      }
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  /* ── Esc closes everything ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setInsuranceOpen(false);
        setProfileOpen(false);
        setNotifOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* ── autofocus search ── */
  useEffect(() => {
    if (insuranceOpen && searchInputRef.current) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [insuranceOpen]);

  /* ── fullscreen tracking ── */
  useEffect(() => {
    const onFsChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch (err) {
      console.warn("Fullscreen not available:", err);
    }
  }, []);

  /* ══════════ Insurance actions ══════════ */
  const handleInsuranceSelect = (it) => {
    setInsuranceOpen(false);
    setSearch("");
    if (insuranceType?.id === it?.id) return;
    changeInsuranceType(it);
    window.location.href = "/dashboard";
  };

  /* ══════════ Notification actions ══════════ */
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const removeNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  const handleNotificationClick = (n) => {
    markAsRead(n.id);
    setNotifOpen(false);
    // TODO: navigate based on n.type / n.link
    // if (n.type === "CLAIM") navigate(`/claims/${n.linkId}`);
  };

  /* ══════════ Auth ══════════ */
  const handleLogout = () => {
    setProfileOpen(false);
    logout();
  };

  /* ══════════ Derived ══════════ */
  const filteredTypes = useMemo(() => {
    if (!search.trim()) return insuranceTypes;
    const q = search.toLowerCase();
    return insuranceTypes.filter(
      (it) =>
        (it.name || "").toLowerCase().includes(q) ||
        (it.code || "").toLowerCase().includes(q) ||
        (it.nameAlias || "").toLowerCase().includes(q),
    );
  }, [insuranceTypes, search]);

  const userName = user?.userName || "User";
  const userRole = role?.roleName || "User";
  const userEmail = user?.email || "";
  const initials = userName
    .split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const canSeeSettings =
    canScoped("USER_MANAGEMENT", "READ") ||
    canScoped("ROLE_MANAGEMENT", "READ");

  const activeIconRule = useMemo(() => pickIcon(insuranceType), [insuranceType]);
  const ActiveIcon = activeIconRule.icon;

  const showSearch = insuranceTypes.length > 4;

  /* ══════════════════════════════════════════════════════════════
     RENDER
     ══════════════════════════════════════════════════════════════ */
  return (
    <header className="sticky top-0 z-30 flex h-[70px] shrink-0 items-center justify-between border-b border-[#e7ebf1] bg-white px-4 sm:px-6 lg:px-7">
      {/* ═══════════ LEFT ═══════════ */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-lg p-2 text-[#516174] hover:bg-gray-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        {insuranceTypes.length > 0 && (
          <div className="relative" ref={insuranceRef}>
            {/* TRIGGER */}
            <button
              onClick={() => setInsuranceOpen((v) => !v)}
              className="group relative flex h-11 items-center gap-3 rounded-xl border border-[#e3e8ee] bg-gradient-to-b from-white to-[#f8fafc] pl-2 pr-3 text-left transition-all hover:border-[#cfd9e6] hover:shadow-[0_2px_8px_rgba(40,105,223,0.08)]"
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${activeIconRule.bg} ${activeIconRule.color}`}
              >
                <ActiveIcon size={15} />
              </span>

              <span className="flex min-w-0 flex-col leading-tight">
                <span className="text-[9px] font-medium uppercase tracking-wider text-[#9aa6b5]">
                  Insurance Type
                </span>
                <span className="max-w-[160px] truncate text-[12px] font-semibold text-[#243b5a]">
                  {insuranceType?.name || "Select Insurance Type"}
                </span>
              </span>

              {insuranceTypes.length > 1 && (
                <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#eaf1ff] px-1.5 text-[9px] font-bold text-[#2869df]">
                  {insuranceTypes.length}
                </span>
              )}

              <ChevronDown
                size={15}
                className={`shrink-0 text-[#667487] transition-transform duration-200 ${
                  insuranceOpen ? "rotate-180 text-[#2869df]" : ""
                }`}
              />

              <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] rounded-t-xl bg-white/60" />
            </button>

            {/* DROPDOWN */}
            {insuranceOpen && (
              <div
                className="absolute left-0 top-[54px] z-50 w-[320px] origin-top-left overflow-hidden rounded-2xl border border-[#e5e9ef] bg-white shadow-[0_12px_32px_-8px_rgba(15,40,80,0.18)]"
                style={{ animation: "dropdownIn 160ms cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {/* header */}
                <div className="relative bg-gradient-to-r from-[#eaf1ff] via-[#eef4ff] to-white px-4 pb-3 pt-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-bold text-[#243b5a]">
                        Switch Insurance Type
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#718096]">
                        Your workspace & permissions change per type
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setInsuranceOpen(false);
                        setSearch("");
                      }}
                      className="rounded-lg p-1.5 text-[#8595a8] hover:bg-white/70 hover:text-[#243b5a]"
                      aria-label="Close"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {showSearch && (
                    <div className="relative mt-3">
                      <Search
                        size={13}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9aa6b5]"
                      />
                      <input
                        ref={searchInputRef}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search insurance type…"
                        className="h-8 w-full rounded-lg border border-[#e3e8ee] bg-white pl-8 pr-3 text-[11px] outline-none placeholder:text-[#a8b3c2] focus:border-[#2869df] focus:ring-2 focus:ring-[#2869df]/15"
                      />
                    </div>
                  )}
                </div>

                {/* list */}
                <div className="max-h-[320px] overflow-y-auto p-1.5 insurance-scroll">
                  {filteredTypes.length === 0 && (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f4fa] text-[#8595a8]">
                        <Search size={16} />
                      </div>
                      <p className="mt-2 text-[11px] font-medium text-[#526174]">
                        No insurance types found
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#9aa6b5]">
                        Try a different search
                      </p>
                    </div>
                  )}

                  {filteredTypes.map((item) => {
                    const isSelected = insuranceType?.id === item.id;
                    const rule = pickIcon(item);
                    const Icon = rule.icon;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleInsuranceSelect(item)}
                        className={`
                          group/row relative flex w-full items-center gap-3
                          rounded-xl px-2.5 py-2.5 text-left transition-all
                          ${
                            isSelected
                              ? "bg-gradient-to-r from-[#eaf1ff] to-[#f4f8ff] ring-1 ring-[#cfdcf5]"
                              : "hover:bg-[#f7fafd]"
                          }
                        `}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform group-hover/row:scale-105 ${rule.bg} ${rule.color}`}
                        >
                          <Icon size={17} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`truncate text-[12px] font-semibold ${
                                isSelected ? "text-[#1a4fb8]" : "text-[#243b5a]"
                              }`}
                            >
                              {item.name}
                            </span>
                            {isSelected && (
                              <span className="shrink-0 rounded-full bg-[#2869df] px-1.5 py-[1px] text-[8px] font-bold uppercase tracking-wide text-white">
                                Active
                              </span>
                            )}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1.5">
                            <span className="rounded bg-[#f0f4fa] px-1.5 py-[1px] text-[9px] font-medium text-[#5f6f83]">
                              {item.code}
                            </span>
                            {item.description && (
                              <span className="truncate text-[10px] text-[#9aa6b5]">
                                {item.description}
                              </span>
                            )}
                          </span>
                        </span>

                        {isSelected ? (
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2869df] text-white">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        ) : (
                          <ChevronDown
                            size={14}
                            className="shrink-0 -rotate-90 text-transparent transition-colors group-hover/row:text-[#8595a8]"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="border-t border-[#eef2f7] bg-[#fafcff] px-4 py-2.5">
                  <p className="text-[10px] text-[#718096]">
                    Switching reloads your workspace with fresh permissions.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══════════ RIGHT ═══════════ */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="rounded-lg p-2 text-[#5f6f83] hover:bg-gray-100"
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={19} /> : <Maximize2 size={19} />}
        </button>

        {/* ═══════ NOTIFICATIONS ═══════ */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className={`relative rounded-lg p-2 transition-colors ${
              notifOpen
                ? "bg-[#eaf1ff] text-[#2869df]"
                : "text-[#5f6f83] hover:bg-gray-100"
            }`}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div
              className="absolute right-0 top-[52px] z-50 w-[380px] origin-top-right overflow-hidden rounded-2xl border border-[#e5e9ef] bg-white shadow-[0_12px_32px_-8px_rgba(15,40,80,0.18)]"
              style={{ animation: "dropdownIn 160ms cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {/* header strip */}
              <div className="flex items-center justify-between border-b border-[#eef2f7] bg-gradient-to-r from-[#fafcff] to-white px-4 py-3">
                <div className="flex items-center gap-2">
                  <p className="text-[13px] font-bold text-[#243b5a]">
                    Notifications
                  </p>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-[#eaf1ff] px-2 py-[2px] text-[9px] font-bold text-[#2869df]">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      title="Mark all as read"
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium text-[#2869df] hover:bg-[#eaf1ff]"
                    >
                      <CheckCheck size={13} />
                      Mark all
                    </button>
                  )}
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="rounded-lg p-1.5 text-[#8595a8] hover:bg-[#f0f4fa] hover:text-[#243b5a]"
                    aria-label="Close"
                  >
                    <X size={13} />
                  </button>
                </div>
              </div>

              {/* list */}
              <div className="max-h-[380px] overflow-y-auto insurance-scroll">
                {notifications.length === 0 && (
                  <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f0f4fa] text-[#8595a8]">
                      <Bell size={22} />
                    </div>
                    <p className="mt-3 text-[12px] font-semibold text-[#526174]">
                      You're all caught up
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#9aa6b5]">
                      No new notifications right now
                    </p>
                  </div>
                )}

                {notifications.map((n) => {
                  const meta = NOTIF_TYPES[n.type] || NOTIF_TYPES.SYSTEM;
                  const Icon = meta.icon;
                  return (
                    <div
                      key={n.id}
                      className={`group/n relative flex items-start gap-3 border-b border-[#f0f3f8] px-4 py-3 transition-colors last:border-b-0 ${
                        n.read ? "hover:bg-[#fafcff]" : "bg-[#f7fbff] hover:bg-[#eef6ff]"
                      }`}
                    >
                      {/* icon */}
                      <button
                        onClick={() => handleNotificationClick(n)}
                        className="flex flex-1 items-start gap-3 text-left"
                      >
                        <span
                          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${meta.bg} ${meta.color}`}
                        >
                          <Icon size={16} />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`truncate text-[12px] font-semibold ${
                                n.read ? "text-[#526174]" : "text-[#1a4fb8]"
                              }`}
                            >
                              {n.title}
                            </span>
                            {!n.read && (
                              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#2869df]" />
                            )}
                          </span>
                          <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-[#718096]">
                            {n.message}
                          </p>
                          <p className="mt-1 text-[10px] font-medium text-[#9aa6b5]">
                            {timeAgo(n.time)}
                          </p>
                        </span>
                      </button>

                      {/* delete on hover */}
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="shrink-0 self-start rounded-md p-1 text-[#c0c9d6] opacity-0 transition-opacity hover:bg-white hover:text-rose-500 group-hover/n:opacity-100"
                        title="Dismiss"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* footer */}
              <div className="border-t border-[#eef2f7] bg-[#fafcff] px-4 py-2.5">
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    navigate("/notifications");
                  }}
                  className="w-full rounded-lg py-1.5 text-center text-[11px] font-semibold text-[#2869df] hover:bg-[#eaf1ff]"
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="h-7 w-px bg-[#e5e9ef]" />

        {/* ═══════ PROFILE ═══════ */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className={`flex items-center gap-2.5 rounded-lg p-1.5 transition-colors ${
              profileOpen ? "bg-[#eaf1ff]" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2869df] to-[#1a4fb8] text-[12px] font-semibold text-white shadow-sm">
              {initials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-[12px] font-semibold text-[#243b5a]">
                {userName}
              </p>
              <p className="text-[10px] text-[#8190a3]">{userRole}</p>
            </div>
            <ChevronDown
              size={14}
              className={`text-[#667487] transition-transform ${
                profileOpen ? "rotate-180 text-[#2869df]" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div
              className="absolute right-0 top-[56px] z-50 w-[280px] origin-top-right overflow-hidden rounded-2xl border border-[#e5e9ef] bg-white shadow-[0_12px_32px_-8px_rgba(15,40,80,0.18)]"
              style={{ animation: "dropdownIn 160ms cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              {/* user card header */}
              <div className="bg-gradient-to-br from-[#f5f9ff] to-white px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2869df] to-[#1a4fb8] text-[14px] font-bold text-white shadow-sm">
                    {initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-[#243b5a]">
                      {userName}
                    </p>
                    {userEmail && (
                      <p className="mt-0.5 flex items-center gap-1 truncate text-[10px] text-[#718096]">
                        <Mail size={11} className="shrink-0" />
                        {userEmail}
                      </p>
                    )}
                    <span className="mt-1.5 inline-block rounded-full bg-[#eaf1ff] px-2 py-[2px] text-[9px] font-semibold uppercase tracking-wide text-[#2869df]">
                      {userRole}
                    </span>
                  </div>
                </div>
              </div>

              {/* menu */}
              <div className="border-t border-[#eef2f7] p-1.5">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#526174] transition-colors hover:bg-[#f5f8fc] hover:text-[#2869df]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f4fa]">
                    <UserRound size={14} />
                  </span>
                  My Profile
                </button>

                {canSeeSettings && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      if (canScoped("USER_MANAGEMENT", "READ"))
                        navigate("/settings/users");
                      else navigate("/settings/roles");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#526174] transition-colors hover:bg-[#f5f8fc] hover:text-[#2869df]"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f0f4fa]">
                      <Settings size={14} />
                    </span>
                    Settings
                  </button>
                )}
              </div>

              {/* logout */}
              <div className="border-t border-[#eef2f7] p-1.5">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50">
                    <LogOut size={14} />
                  </span>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// import {
//   Bell,
//   ChevronDown,
//   LogOut,
//   Menu,
//   Settings,
//   UserRound,
// } from "lucide-react";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router";
// import { useRbac } from "../rbac/useRbac";
// import InsuranceSwitcher from "../rbac/InsuranceSwitcher";

// const initialsOf = (name = "") =>
//   name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((w) => w[0]?.toUpperCase())
//     .join("");

// function Header({ setIsOpen }) {
//   const [profileOpen, setProfileOpen] = useState(false);
//   const profileRef = useRef(null);

//   const navigate = useNavigate();
//   const { user, role, clearRbac } = useRbac();

//   const initials = useMemo(
//     () => initialsOf(user?.userName) || "U",
//     [user?.userName],
//   );

//   /* Close profile dropdown on outside click */
//   useEffect(() => {
//     const onDown = (e) => {
//       if (profileRef.current && !profileRef.current.contains(e.target)) {
//         setProfileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", onDown);
//     return () => document.removeEventListener("mousedown", onDown);
//   }, []);

//   const handleLogout = async () => {
//     setProfileOpen(false);

//     // Best-effort: tell backend to revoke refresh token
//     try {
//       const token = localStorage.getItem("accessToken");
//       await fetch(
//         `${import.meta.env.VITE_API_BASE || "http://localhost:3000"}/auth/logout`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           credentials: "include",
//         },
//       );
//     } catch {
//       /* ignore network errors on logout */
//     }

//     // Clear RBAC + tokens from storage
//     clearRbac();

//     // Navigate
//     navigate("/login", { replace: true });
//   };

//   return (
//     <header className="sticky top-0 z-30 flex h-[70px] shrink-0 items-center justify-between border-b border-[#e7ebf1] bg-white px-4 sm:px-6 lg:px-7">
//       {/* ─────────── LEFT ─────────── */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => setIsOpen(true)}
//           className="rounded-lg p-2 text-[#516174] hover:bg-gray-100 lg:hidden"
//         >
//           <Menu size={21} />
//         </button>

//         {/* Insurance type switcher (RBAC-driven) */}
//         <InsuranceSwitcher />
//       </div>

//       {/* ─────────── RIGHT ─────────── */}
//       <div className="flex items-center gap-3 sm:gap-5">
//         {/* Notifications */}
//         <button className="relative rounded-lg p-2 text-[#5f6f83] hover:bg-gray-100">
//           <Bell size={20} />
//           <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
//         </button>

//         <div className="h-7 w-px bg-[#e5e9ef]" />

//         {/* Profile */}
//         <div ref={profileRef} className="relative">
//           <button
//             onClick={() => setProfileOpen((v) => !v)}
//             className="flex items-center gap-2.5 rounded-lg p-1.5 hover:bg-gray-50"
//           >
//             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2869df] text-[12px] font-semibold text-white">
//               {initials}
//             </div>

//             <div className="hidden text-left sm:block">
//               <p className="text-[12px] font-semibold text-[#243b5a]">
//                 {user?.userName ?? "User"}
//               </p>
//               <p className="text-[10px] text-[#8190a3]">
//                 {role?.roleName ?? "—"}
//               </p>
//             </div>

//             <ChevronDown
//               size={14}
//               className={`text-[#667487] transition-transform ${
//                 profileOpen ? "rotate-180" : ""
//               }`}
//             />
//           </button>

//           {profileOpen && (
//             <div className="absolute right-0 top-[52px] z-50 w-[210px] rounded-xl border border-[#e5e9ef] bg-white p-2 shadow-lg">
//               <button
//                 onClick={() => {
//                   setProfileOpen(false);
//                   navigate("/profile");
//                 }}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#526174] hover:bg-[#f5f8fc]"
//               >
//                 <UserRound size={16} />
//                 My Profile
//               </button>

//               <button
//                 onClick={() => {
//                   setProfileOpen(false);
//                   navigate("/settings/users");
//                 }}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#526174] hover:bg-[#f5f8fc]"
//               >
//                 <Settings size={16} />
//                 Settings
//               </button>

//               <div className="my-1 border-t border-[#edf0f4]" />

//               <button
//                 onClick={handleLogout}
//                 className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-red-500 hover:bg-red-50"
//               >
//                 <LogOut size={16} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;