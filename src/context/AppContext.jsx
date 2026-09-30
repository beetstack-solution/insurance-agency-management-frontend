import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

const initialUsers = [
  {
    id: 1,
    name: "Joyal Shaji",
    email: "joyal@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul Nair",
    email: "rahul@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Anita Joseph",
    email: "anita@example.com",
    role: "Agent",
    status: "Active",
  },
  {
    id: 4,
    name: "Sajith Kumar",
    email: "sajith@example.com",
    role: "Staff",
    status: "Inactive",
  },
];

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    status: "Active",
  },
  {
    id: 2,
    name: "Manager",
    description: "Manage customers, policies and claims",
    status: "Active",
  },
  {
    id: 3,
    name: "Agent",
    description: "Manage assigned customers and policies",
    status: "Active",
  },
  {
    id: 4,
    name: "Staff",
    description: "Limited system access",
    status: "Active",
  },
];

const initialInsuranceTypes = [
  {
    id: 1,
    name: "Life Insurance",
    code: "LIFE",
    description: "Life protection plans",
    status: "Active",
  },
  {
    id: 2,
    name: "Health Insurance",
    code: "HEALTH",
    description: "Health and medical coverage",
    status: "Active",
  },
  {
    id: 3,
    name: "Vehicle Insurance",
    code: "VEHICLE",
    description: "Vehicle insurance plans",
    status: "Active",
  },
  {
    id: 4,
    name: "Home Insurance",
    code: "HOME",
    description: "Home and property protection",
    status: "Active",
  },
];

const initialModules = [
  {
    id: 1,
    name: "Customers",
    code: "CUSTOMERS",
    type: "Core",
    status: "Active",
  },
  {
    id: 2,
    name: "Policies",
    code: "POLICIES",
    type: "Transaction",
    status: "Active",
  },
  {
    id: 3,
    name: "Claims",
    code: "CLAIMS",
    type: "Transaction",
    status: "Active",
  },
  {
    id: 4,
    name: "Renewals",
    code: "RENEWALS",
    type: "Transaction",
    status: "Active",
  },
  {
    id: 5,
    name: "Reports",
    code: "REPORTS",
    type: "Reporting",
    status: "Active",
  },
];

const initialModuleActions = [
  {
    id: 1,
    name: "Create",
    code: "CREATE",
    status: "Active",
  },
  {
    id: 2,
    name: "Read",
    code: "READ",
    status: "Active",
  },
  {
    id: 3,
    name: "Update",
    code: "UPDATE",
    status: "Active",
  },
  {
    id: 4,
    name: "Delete",
    code: "DELETE",
    status: "Active",
  },
];

const initialModuleTypes = [
  {
    id: 1,
    name: "Core",
    code: "CORE",
    description: "Main system modules",
    status: "Active",
  },
  {
    id: 2,
    name: "Transaction",
    code: "TRANSACTION",
    description: "Business transaction modules",
    status: "Active",
  },
  {
    id: 3,
    name: "Reporting",
    code: "REPORTING",
    description: "Analytics and reporting modules",
    status: "Active",
  },
];

const initialPermissions = [
  {
    id: 1,
    module: "Dashboard",
    action: "Read",
    code: "dashboard.read",
  },
  {
    id: 2,
    module: "Policies",
    action: "Create",
    code: "policies.create",
  },
  {
    id: 3,
    module: "Policies",
    action: "Read",
    code: "policies.read",
  },
  {
    id: 4,
    module: "Policies",
    action: "Update",
    code: "policies.update",
  },
  {
    id: 5,
    module: "Policies",
    action: "Delete",
    code: "policies.delete",
  },
  {
    id: 6,
    module: "Customers",
    action: "Create",
    code: "customers.create",
  },
  {
    id: 7,
    module: "Customers",
    action: "Read",
    code: "customers.read",
  },
  {
    id: 8,
    module: "Customers",
    action: "Update",
    code: "customers.update",
  },
  {
    id: 9,
    module: "Customers",
    action: "Delete",
    code: "customers.delete",
  },
];

const initialRolePermissions = {
  Admin: {
    "Dashboard.Read": true,
    "Policies.Create": true,
    "Policies.Read": true,
    "Policies.Update": true,
    "Policies.Delete": true,
    "Customers.Create": true,
    "Customers.Read": true,
    "Customers.Update": true,
    "Customers.Delete": true,
    "Claims.Create": true,
    "Claims.Read": true,
    "Claims.Update": true,
    "Claims.Delete": true,
    "Renewals.Read": true,
    "Reports.Read": true,
  },

  Manager: {
    "Dashboard.Read": true,
    "Policies.Create": true,
    "Policies.Read": true,
    "Policies.Update": true,
    "Policies.Delete": false,
    "Customers.Create": true,
    "Customers.Read": true,
    "Customers.Update": true,
    "Customers.Delete": false,
    "Claims.Create": true,
    "Claims.Read": true,
    "Claims.Update": true,
    "Claims.Delete": false,
    "Renewals.Read": true,
    "Reports.Read": true,
  },

  Agent: {
    "Dashboard.Read": true,
    "Policies.Create": true,
    "Policies.Read": true,
    "Policies.Update": true,
    "Policies.Delete": false,
    "Customers.Create": true,
    "Customers.Read": true,
    "Customers.Update": true,
    "Customers.Delete": false,
    "Claims.Create": false,
    "Claims.Read": true,
    "Claims.Update": false,
    "Claims.Delete": false,
    "Renewals.Read": true,
    "Reports.Read": false,
  },

  Staff: {
    "Dashboard.Read": true,
    "Policies.Create": false,
    "Policies.Read": true,
    "Policies.Update": false,
    "Policies.Delete": false,
    "Customers.Create": false,
    "Customers.Read": true,
    "Customers.Update": false,
    "Customers.Delete": false,
    "Claims.Create": false,
    "Claims.Read": true,
    "Claims.Update": false,
    "Claims.Delete": false,
    "Renewals.Read": true,
    "Reports.Read": false,
  },
};

export function AppProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [insuranceTypes, setInsuranceTypes] = useState(
    initialInsuranceTypes
  );
  const [modules, setModules] = useState(initialModules);
  const [moduleActions, setModuleActions] = useState(
    initialModuleActions
  );
  const [moduleTypes, setModuleTypes] = useState(
    initialModuleTypes
  );
  const [permissions, setPermissions] = useState(
    initialPermissions
  );
  const [rolePermissions, setRolePermissions] = useState(
    initialRolePermissions
  );

  const addUser = (data) => {
    setUsers((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const updateUser = (id, data) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addRole = (data) => {
    setRoles((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const updateRole = (id, data) => {
    setRoles((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteRole = (id) => {
    setRoles((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addInsuranceType = (data) => {
    setInsuranceTypes((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const updateInsuranceType = (id, data) => {
    setInsuranceTypes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteInsuranceType = (id) => {
    setInsuranceTypes((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addModule = (data) => {
    setModules((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const updateModule = (id, data) => {
    setModules((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteModule = (id) => {
    setModules((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addModuleAction = (data) => {
    setModuleActions((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const updateModuleAction = (id, data) => {
    setModuleActions((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteModuleAction = (id) => {
    setModuleActions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addModuleType = (data) => {
    setModuleTypes((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const updateModuleType = (id, data) => {
    setModuleTypes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteModuleType = (id) => {
    setModuleTypes((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addPermission = (data) => {
    setPermissions((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const deletePermission = (id) => {
    setPermissions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const toggleRolePermission = (
    role,
    module,
    action
  ) => {
    const key = `${module}.${action}`;

    setRolePermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [key]: !prev[role]?.[key],
      },
    }));
  };

  const hasRolePermission = (
    role,
    module,
    action
  ) => {
    const key = `${module}.${action}`;

    return (
      rolePermissions[role]?.[key] || false
    );
  };

  return (
    <AppContext.Provider
      value={{
        users,
        addUser,
        updateUser,
        deleteUser,

        roles,
        addRole,
        updateRole,
        deleteRole,

        insuranceTypes,
        addInsuranceType,
        updateInsuranceType,
        deleteInsuranceType,

        modules,
        addModule,
        updateModule,
        deleteModule,

        moduleActions,
        addModuleAction,
        updateModuleAction,
        deleteModuleAction,

        moduleTypes,
        addModuleType,
        updateModuleType,
        deleteModuleType,

        permissions,
        addPermission,
        deletePermission,

        rolePermissions,
        toggleRolePermission,
        hasRolePermission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider"
    );
  }

  return context;
}