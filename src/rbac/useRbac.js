// src/rbac/useRbac.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { MENU_PERMISSIONS } from "./constants";

const RBAC_KEY = "rbac";
const USER_KEY = "user";
const INSURANCE_TYPE_KEY = "selectedInsuranceType";
const EVT = "rbac-updated";

/* ───────── Storage helpers ───────── */
export function getRbacFromStorage() {
  try {
    const raw = localStorage.getItem(RBAC_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export function getUserFromStorage() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
export function getInsuranceTypeFromStorage() {
  try {
    const raw = localStorage.getItem(INSURANCE_TYPE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/* ───────── Permission index builder ───────── */
function buildPermissionIndex(rbac) {
  const flat = {};                 // { PERMISSION_ALIAS: ["CREATE", "READ", ...] }
  const byInsuranceType = {};      // { INSURANCE_ALIAS: { PERMISSION_ALIAS: [...] } }

  if (!rbac?.insuranceTypes) return { flat, byInsuranceType };

  for (const it of rbac.insuranceTypes) {
    const itKey = it.nameAlias || it.code || it.id;
    byInsuranceType[itKey] = {};

    for (const p of it.permissions || []) {
      const alias = p.permission?.nameAlias;
      if (!alias) continue;
      const actions = p.actions || [];

      flat[alias] = Array.from(new Set([...(flat[alias] || []), ...actions]));
      byInsuranceType[itKey][alias] = Array.from(
        new Set([...(byInsuranceType[itKey][alias] || []), ...actions]),
      );
    }
  }
  return { flat, byInsuranceType };
}

/* ───────── Main hook ───────── */
export function useRbac() {
  const [rbac, setRbac] = useState(getRbacFromStorage());
  const [user, setUser] = useState(getUserFromStorage());
  const [insuranceType, setInsuranceTypeState] = useState(
    getInsuranceTypeFromStorage(),
  );

  /* Auto-select first insurance type if none is chosen
     (so the sidebar isn't empty on first login). */
  useEffect(() => {
    if (!rbac?.insuranceTypes?.length) return;
    if (insuranceType) return;

    const first = rbac.insuranceTypes[0];
    const stored = {
      id: first.id,
      name: first.insuranceTypeName,
      nameAlias: first.nameAlias,
      code: first.code,
    };
    localStorage.setItem(INSURANCE_TYPE_KEY, JSON.stringify(stored));
    setInsuranceTypeState(stored);
  }, [rbac, insuranceType]);

  /* Sync across tabs / manual events */
  useEffect(() => {
    const sync = () => {
      setRbac(getRbacFromStorage());
      setUser(getUserFromStorage());
      setInsuranceTypeState(getInsuranceTypeFromStorage());
    };
    window.addEventListener("storage", sync);
    window.addEventListener(EVT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(EVT, sync);
    };
  }, []);

  /* Flat + scoped indexes */
  const { flat, byInsuranceType } = useMemo(
    () => buildPermissionIndex(rbac),
    [rbac],
  );

  /* List of insurance types (flattened) */
  const insuranceTypes = useMemo(() => {
    if (!rbac?.insuranceTypes) return [];
    return rbac.insuranceTypes.map((it) => ({
      id: it.id,
      name: it.insuranceTypeName,
      nameAlias: it.nameAlias,
      code: it.code,
      description: it.insuranceTypeDescription,
    }));
  }, [rbac]);

  const currentInsuranceKey = useMemo(
    () => insuranceType?.nameAlias || insuranceType?.code || null,
    [insuranceType],
  );

  const currentPermissions = useMemo(() => {
    if (!currentInsuranceKey) return {};
    return byInsuranceType[currentInsuranceKey] || {};
  }, [byInsuranceType, currentInsuranceKey]);

  /* ── GLOBAL can (union of all insurance types) ── */
  const can = useCallback(
    (permissionAlias, action = "READ") => {
      if (!permissionAlias) return true;
      const actions = flat[permissionAlias];
      if (!actions) return false;
      return actions.includes(action);
    },
    [flat],
  );

  /* ── SCOPED can (only current insurance type) ── */
  const canScoped = useCallback(
    (permissionAlias, action = "READ") => {
      if (!permissionAlias) return true;
      if (!currentInsuranceKey) return can(permissionAlias, action);
      const actions = currentPermissions[permissionAlias];
      if (!actions) return false;
      return actions.includes(action);
    },
    [currentPermissions, currentInsuranceKey, can],
  );

  /* ── Sidebar visibility (scoped) ── */
  const canAccessMenu = useCallback(
    (menuKey) => {
      const alias = MENU_PERMISSIONS[menuKey];
      if (!alias) return true;              // DASHBOARD, REPORTS → always visible
      return canScoped(alias, "READ");
    },
    [canScoped],
  );

  const hasAnyInModule = useCallback(
    (aliases = []) => aliases.some((a) => Boolean(flat[a]?.length)),
    [flat],
  );

  /* ── Set selected insurance type ── */
  const setSelectedInsuranceType = useCallback((it) => {
    if (it) {
      localStorage.setItem(INSURANCE_TYPE_KEY, JSON.stringify(it));
      setInsuranceTypeState(it);
    } else {
      localStorage.removeItem(INSURANCE_TYPE_KEY);
      setInsuranceTypeState(null);
    }
    window.dispatchEvent(new Event(EVT));
  }, []);

  /* ── Logout ── */
  const clearRbac = useCallback(() => {
    [RBAC_KEY, USER_KEY, INSURANCE_TYPE_KEY, "accessToken",
     "refreshToken", "isLoggedIn"].forEach((k) => localStorage.removeItem(k));
    setRbac(null);
    setUser(null);
    setInsuranceTypeState(null);
    window.dispatchEvent(new Event(EVT));
  }, []);

  return {
    rbac,
    user,
    role: rbac?.role || null,
    insuranceTypes,
    insuranceType,
    currentInsuranceKey,
    setSelectedInsuranceType,
    flatPermissions: flat,
    currentPermissions,
    permissionsByInsuranceType: byInsuranceType,
    can,
    canScoped,
    canAccessMenu,
    hasAnyInModule,
    clearRbac,
  };
}