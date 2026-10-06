import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  loginUser,
  logoutUser,
  clearError,
} from "../slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, rbac, isAuthenticated, loading, error, accessToken } =
    useSelector((state) => state.auth);

  const login = async (email, password) => {
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
      return { success: true };
    }
    return { success: false, error: result.payload };
  };

  const logout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const resetError = () => dispatch(clearError());

  /**
   * Permission checker
   * checkPermission("POLICY_MANAGEMENT", "CREATE")
   */
  const checkPermission = (permissionAlias, action) => {
    if (!rbac?.insuranceTypes) return false;

    for (const ins of rbac.insuranceTypes) {
      for (const perm of ins.permissions || []) {
        if (perm.permission?.nameAlias === permissionAlias) {
          if (!action) return true;
          return perm.actions?.includes(action);
        }
      }
    }
    return false;
  };

  return {
    user,
    rbac,
    isAuthenticated,
    loading,
    error,
    accessToken,
    login,
    logout,
    resetError,
    checkPermission,
  };
};