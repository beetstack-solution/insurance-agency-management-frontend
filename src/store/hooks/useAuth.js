import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  loginUser,
  logoutUser,
  clearError,
  setInsuranceType as setInsuranceTypeAction,
  syncFromStorage,
  forceLogout,
} from "../slices/authSlice";
import { MENU_PERMISSIONS } from "../../rbac/constants";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((s) => s.auth.user);
  const rbac = useSelector((s) => s.auth.rbac);
  const insuranceType = useSelector((s) => s.auth.insuranceType);
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  const loading = useSelector((s) => s.auth.loading);
  const error = useSelector((s) => s.auth.error);
  const accessToken = useSelector((s) => s.auth.accessToken);

  /* Cross-tab sync ONLY (App.jsx handles this globally now — do NOT duplicate here) */

  /* ---------- Permission index ---------- */
  const { flat, byInsuranceType } = useMemo(() => {
    const flat = {};
    const byInsuranceType = {};
    if (!rbac?.insuranceTypes) return { flat, byInsuranceType };

    for (const it of rbac.insuranceTypes) {
      const key = it.nameAlias || it.code || it.id;
      byInsuranceType[key] = {};
      for (const p of it.permissions || []) {
        const alias = p.permission?.nameAlias;
        if (!alias) continue;
        const actions = p.actions || [];
        flat[alias] = Array.from(new Set([...(flat[alias] || []), ...actions]));
        byInsuranceType[key][alias] = Array.from(
          new Set([...(byInsuranceType[key][alias] || []), ...actions])
        );
      }
    }
    return { flat, byInsuranceType };
  }, [rbac]);

  const currentInsuranceKey = useMemo(
    () => insuranceType?.nameAlias || insuranceType?.code || null,
    [insuranceType]
  );

  const currentPermissions = useMemo(() => {
    if (!currentInsuranceKey) return {};
    return byInsuranceType[currentInsuranceKey] || {};
  }, [byInsuranceType, currentInsuranceKey]);

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

  /* ---------- Permission helpers ---------- */
  const checkPermission = useCallback(
    (permissionAlias, action) => {
      if (!permissionAlias) return true;
      const actions = flat[permissionAlias];
      if (!actions) return false;
      if (!action) return true;
      return actions.includes(action);
    },
    [flat]
  );

  const canScoped = useCallback(
    (permissionAlias, action = "READ") => {
      if (!permissionAlias) return true;
      if (!currentInsuranceKey) return checkPermission(permissionAlias, action);
      const actions = currentPermissions[permissionAlias];
      if (!actions) return false;
      return actions.includes(action);
    },
    [currentPermissions, currentInsuranceKey, checkPermission]
  );

  const canAccessMenu = useCallback(
    (menuKey) => {
      const alias = MENU_PERMISSIONS[menuKey];
      if (!alias) return true;
      return canScoped(alias, "READ");
    },
    [canScoped]
  );

  const hasAnyInModule = useCallback(
    (aliases = []) => aliases.some((a) => Boolean(flat[a]?.length)),
    [flat]
  );

  /* ---------- Actions ---------- */
  const login = useCallback(
    async (email, password) => {
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(result)) {
        navigate("/dashboard", { replace: true });
        return { success: true };
      }
      return { success: false, error: result.payload };
    },
    [dispatch, navigate]
  );

  /**
   * Synchronous logout — clears Redux + storage immediately.
   * ProtectedRoute handles the redirect to /login automatically
   * because isAuthenticated flips to false.
   *
   * We ALSO call navigate() here so logout works even if the caller
   * is on a page that isn't wrapped by ProtectedRoute.
   */
  const logout = useCallback(() => {
    dispatch(forceLogout());
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  /**
   * Async logout — calls the API first, then clears state.
   * Use when you specifically need the server-side session invalidated.
   */
  const logoutAsync = useCallback(async () => {
    try {
      await dispatch(logoutUser());
    } finally {
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate]);

  const resetError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const changeInsuranceType = useCallback(
    (it) => {
      dispatch(setInsuranceTypeAction(it));
    },
    [dispatch]
  );

  return {
    user,
    rbac,
    role: rbac?.role || null,
    isAuthenticated,
    loading,
    error,
    accessToken,

    insuranceTypes,
    insuranceType,
    currentInsuranceKey,
    changeInsuranceType,

    checkPermission,
    canScoped,
    canAccessMenu,
    hasAnyInModule,
    flatPermissions: flat,
    currentPermissions,

    login,
    logout,        // synchronous — instant
    logoutAsync,   // async — calls API
    resetError,
  };
};