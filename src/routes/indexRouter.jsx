import { Navigate, Route, Routes } from "react-router";

import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import PermissionRoute from "../components/PermissionRoute";

import Login from "../pages/Login-Page/Login";
import DashboardHome from "../pages/DashboardHome";
import Policies from "../pages/Policies";
import Customers from "../pages/Customers";
import Claims from "../pages/Claims";
import Renewals from "../pages/Renewals";
import Reports from "../pages/Reports";
import Quotations from "../pages/Quotations";

import Users from "../pages/Settings-Page/Users";
import Roles from "../pages/Settings-Page/Roles";
import Permissions from "../pages/Settings-Page/Permissions";
import InsuranceTypes from "../pages/Settings-Page/InsuranceTypes";
import Modules from "../pages/Settings-Page/Modules";
import ModuleActions from "../pages/Settings-Page/ModuleActions";
import ModuleTypes from "../pages/Settings-Page/ModuleTypes";
import RolePermissions from "../pages/Settings-Page/RolePermissions";

/**
 * Route Configuration
 * ------------------------------------------------------
 * Each protected page declares its permission here.
 * Components without a `permission` key are accessible
 * to any authenticated user.
 * ------------------------------------------------------
 */
const protectedRoutes = [
  { path: "/dashboard", element: <DashboardHome /> },
  { path: "/reports", element: <Reports /> },

  // Policy / Customer / Claim / Renewal / Quotation
  { path: "/policies", element: <Policies />, permission: "POLICY_MANAGEMENT" },
  { path: "/customers", element: <Customers />, permission: "CUSTOMER_MANAGEMENT" },
  { path: "/claims", element: <Claims />, permission: "CLAIM_MANAGEMENT" },
  { path: "/renewals", element: <Renewals />, permission: "POLICY_MANAGEMENT" },
  { path: "/quotations", element: <Quotations />, permission: "QUOTATION_MANAGEMENT" },

  // Settings
  { path: "/settings/users", element: <Users />, permission: "USER_MANAGEMENT" },
  { path: "/settings/roles", element: <Roles />, permission: "ROLE_MANAGEMENT" },
  {
    path: "/settings/permissions",
    element: <Permissions />,
    permission: "PERMISSION_MODULE_MANAGEMENT",
  },
  {
    path: "/settings/insurance-types",
    element: <InsuranceTypes />,
    permission: "INSURANCE_TYPE_MANAGEMENT",
  },
  { path: "/settings/modules", element: <Modules />, permission: "MODULE_MANAGEMENT" },
  {
    path: "/settings/module-actions",
    element: <ModuleActions />,
    permission: "MODULE_ACTION_MANAGEMENT",
  },
  {
    path: "/settings/module-types",
    element: <ModuleTypes />,
    permission: "MODULE_TYPE_MANAGEMENT",
  },
  {
    path: "/settings/role-permissions",
    element: <RolePermissions />,
    permission: "ROLE_MANAGEMENT",
  },
];

/**
 * Wraps an element with PermissionRoute only if a permission is defined.
 */
const withPermission = (element, permission) => {
  if (!permission) return element;
  return <PermissionRoute permission={permission}>{element}</PermissionRoute>;
};

export default function IndexRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected (requires authentication) */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {protectedRoutes.map(({ path, element, permission }) => (
          <Route
            key={path}
            path={path}
            element={withPermission(element, permission)}
          />
        ))}
      </Route>

      {/* Fallbacks */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}