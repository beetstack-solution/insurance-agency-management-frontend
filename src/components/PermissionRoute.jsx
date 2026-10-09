import { Navigate } from "react-router";
import { useAuth } from "../store/hooks/useAuth";

export default function PermissionRoute({
  permission,
  action = "READ",
  children,
}) {
  const { canScoped } = useAuth();

  if (!canScoped(permission, action)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}