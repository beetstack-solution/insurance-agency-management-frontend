import { Navigate, Route, Routes } from "react-router";

import Login from "./pages/Login";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardHome from "./pages/DashboardHome";
import Policies from "./pages/Policies";
import Customers from "./pages/Customers";
import Claims from "./pages/Claims";
import Renewals from "./pages/Renewals";
import Reports from "./pages/Reports";

// Settings
import Users from "./pages/settings/Users";
import Roles from "./pages/settings/Roles";
import Permissions from "./pages/settings/Permissions";
import InsuranceTypes from "./pages/settings/InsuranceTypes";
import Modules from "./pages/settings/Modules";
import ModuleActions from "./pages/settings/ModuleActions";
import ModuleTypes from "./pages/settings/ModuleTypes";
import RolePermissions from "./pages/settings/RolePermissions";

function App() {
  return (
    <Routes>

      {/* ================= LOGIN ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ============== PROTECTED AREA ============== */}

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >

        {/* ================= MAIN ================= */}

        <Route
          path="/dashboard"
          element={<DashboardHome />}
        />

        <Route
          path="/policies"
          element={<Policies />}
        />

        <Route
          path="/customers"
          element={<Customers />}
        />

        <Route
          path="/claims"
          element={<Claims />}
        />

        <Route
          path="/renewals"
          element={<Renewals />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* ================= SETTINGS ================= */}

        <Route
          path="/settings/users"
          element={<Users />}
        />

        <Route
          path="/settings/roles"
          element={<Roles />}
        />

        <Route
          path="/settings/permissions"
          element={<Permissions />}
        />

        <Route
          path="/settings/insurance-types"
          element={<InsuranceTypes />}
        />

        <Route
          path="/settings/modules"
          element={<Modules />}
        />

        <Route
          path="/settings/module-actions"
          element={<ModuleActions />}
        />

        <Route
          path="/settings/module-types"
          element={<ModuleTypes />}
        />

        <Route
          path="/settings/role-permissions"
          element={<RolePermissions />}
        />

      </Route>

      {/* ================= DEFAULT ================= */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;