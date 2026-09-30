import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import Dashboard from "./pages/Dashboard";

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
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

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

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default App;