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

const initialCustomers = [
  {
    id: 1,
    customerId: "CUS-1001",
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "+91 98765 43210",
    type: "Individual",
    policies: 2,
    status: "Active",
    joinedDate: "12 Jan 2025",
  },
  {
    id: 2,
    customerId: "CUS-1002",
    name: "Anjali Nair",
    email: "anjali@gmail.com",
    phone: "+91 98470 12345",
    type: "Individual",
    policies: 1,
    status: "Active",
    joinedDate: "18 Feb 2025",
  },
  {
    id: 3,
    customerId: "CUS-1003",
    name: "Arun Raj",
    email: "arun@gmail.com",
    phone: "+91 98950 67890",
    type: "Individual",
    policies: 3,
    status: "Active",
    joinedDate: "05 Mar 2025",
  },
  {
    id: 4,
    customerId: "CUS-1004",
    name: "Meera Thomas",
    email: "meera@gmail.com",
    phone: "+91 94470 34567",
    type: "Individual",
    policies: 1,
    status: "Inactive",
    joinedDate: "20 Apr 2025",
  },
  {
    id: 5,
    customerId: "CUS-1005",
    name: "Vishnu Prasad",
    email: "vishnu@gmail.com",
    phone: "+91 99610 54321",
    type: "Corporate",
    policies: 4,
    status: "Active",
    joinedDate: "10 May 2025",
  },
  {
    id: 6,
    customerId: "CUS-1006",
    name: "Sneha Joseph",
    email: "sneha@gmail.com",
    phone: "+91 95670 11223",
    type: "Individual",
    policies: 2,
    status: "Active",
    joinedDate: "22 Jun 2025",
  },
];

const initialPolicies = [
  {
    id: 1,
    policyNo: "POL-2026-001",
    customer: "Rahul Kumar",
    customerId: "CUS-1001",
    type: "Health Insurance",
    premium: 18500,
    coverage: 500000,
    startDate: "05 Oct 2025",
    expiryDate: "05 Oct 2026",
    status: "Active",
  },
  {
    id: 2,
    policyNo: "POL-2026-014",
    customer: "Anjali Nair",
    customerId: "CUS-1002",
    type: "Life Insurance",
    premium: 25000,
    coverage: 1000000,
    startDate: "08 Oct 2025",
    expiryDate: "08 Oct 2026",
    status: "Active",
  },
  {
    id: 3,
    policyNo: "POL-2026-021",
    customer: "Arun Raj",
    customerId: "CUS-1003",
    type: "Vehicle Insurance",
    premium: 12800,
    coverage: 700000,
    startDate: "12 Oct 2025",
    expiryDate: "12 Oct 2026",
    status: "Active",
  },
  {
    id: 4,
    policyNo: "POL-2026-028",
    customer: "Meera Thomas",
    customerId: "CUS-1004",
    type: "Home Insurance",
    premium: 9500,
    coverage: 2500000,
    startDate: "15 Oct 2025",
    expiryDate: "15 Oct 2026",
    status: "Active",
  },
  {
    id: 5,
    policyNo: "POL-2026-035",
    customer: "Vishnu Prasad",
    customerId: "CUS-1005",
    type: "Health Insurance",
    premium: 22000,
    coverage: 800000,
    startDate: "20 Oct 2025",
    expiryDate: "20 Oct 2026",
    status: "Active",
  },
  {
    id: 6,
    policyNo: "POL-2026-041",
    customer: "Sneha Joseph",
    customerId: "CUS-1006",
    type: "Travel Insurance",
    premium: 6500,
    coverage: 300000,
    startDate: "25 Oct 2025",
    expiryDate: "25 Oct 2026",
    status: "Pending",
  },
];

const initialClaims = [
  {
    id: 1,
    claimId: "CLM-1001",
    customer: "Arun Kumar",
    policyNo: "POL-2024001",
    type: "Health Insurance",
    amount: 85000,
    date: "28 Sep 2026",
    status: "Approved",
  },
  {
    id: 2,
    claimId: "CLM-1002",
    customer: "Meera Nair",
    policyNo: "POL-2024008",
    type: "Life Insurance",
    amount: 250000,
    date: "26 Sep 2026",
    status: "Pending",
  },
  {
    id: 3,
    claimId: "CLM-1003",
    customer: "Rahul Thomas",
    policyNo: "POL-2024012",
    type: "Vehicle Insurance",
    amount: 45000,
    date: "24 Sep 2026",
    status: "Under Review",
  },
  {
    id: 4,
    claimId: "CLM-1004",
    customer: "Anjali Menon",
    policyNo: "POL-2024017",
    type: "Health Insurance",
    amount: 65000,
    date: "22 Sep 2026",
    status: "Rejected",
  },
  {
    id: 5,
    claimId: "CLM-1005",
    customer: "Vishnu Raj",
    policyNo: "POL-2024021",
    type: "Travel Insurance",
    amount: 30000,
    date: "20 Sep 2026",
    status: "Approved",
  },
  {
    id: 6,
    claimId: "CLM-1006",
    customer: "Sneha Joseph",
    policyNo: "POL-2024028",
    type: "Vehicle Insurance",
    amount: 75000,
    date: "18 Sep 2026",
    status: "Pending",
  },
];

const initialRenewals = [
  {
    id: 1,
    policyNo: "POL-2026-001",
    customer: "Rahul Kumar",
    email: "rahul@gmail.com",
    phone: "+91 98765 43210",
    type: "Health Insurance",
    premium: 18500,
    expiryDate: "05 Oct 2026",
    daysLeft: 4,
    status: "Due Soon",
  },
  {
    id: 2,
    policyNo: "POL-2026-014",
    customer: "Anjali Nair",
    email: "anjali@gmail.com",
    phone: "+91 98470 12345",
    type: "Life Insurance",
    premium: 25000,
    expiryDate: "08 Oct 2026",
    daysLeft: 7,
    status: "Due Soon",
  },
  {
    id: 3,
    policyNo: "POL-2026-021",
    customer: "Arun Raj",
    email: "arun@gmail.com",
    phone: "+91 98950 67890",
    type: "Vehicle Insurance",
    premium: 12800,
    expiryDate: "12 Oct 2026",
    daysLeft: 11,
    status: "Upcoming",
  },
  {
    id: 4,
    policyNo: "POL-2026-028",
    customer: "Meera Thomas",
    email: "meera@gmail.com",
    phone: "+91 94470 34567",
    type: "Home Insurance",
    premium: 9500,
    expiryDate: "15 Oct 2026",
    daysLeft: 14,
    status: "Upcoming",
  },
  {
    id: 5,
    policyNo: "POL-2026-035",
    customer: "Vishnu Prasad",
    email: "vishnu@gmail.com",
    phone: "+91 99610 54321",
    type: "Health Insurance",
    premium: 22000,
    expiryDate: "20 Oct 2026",
    daysLeft: 19,
    status: "Upcoming",
  },
  {
    id: 6,
    policyNo: "POL-2026-041",
    customer: "Sneha Joseph",
    email: "sneha@gmail.com",
    phone: "+91 95670 11223",
    type: "Travel Insurance",
    premium: 6500,
    expiryDate: "25 Oct 2026",
    daysLeft: 24,
    status: "Upcoming",
  },
  {
    id: 7,
    policyNo: "POL-2026-048",
    customer: "Nikhil S",
    email: "nikhil@gmail.com",
    phone: "+91 97460 22334",
    type: "Vehicle Insurance",
    premium: 15200,
    expiryDate: "30 Sep 2026",
    daysLeft: 0,
    status: "Expired",
  },
  {
    id: 8,
    policyNo: "POL-2026-053",
    customer: "Divya Menon",
    email: "divya@gmail.com",
    phone: "+91 96330 44556",
    type: "Life Insurance",
    premium: 30000,
    expiryDate: "28 Oct 2026",
    daysLeft: 27,
    status: "Renewed",
  },
];

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

  const [customers, setCustomers] = useState(initialCustomers);
  const [policies, setPolicies] = useState(initialPolicies);
  const [claims, setClaims] = useState(initialClaims);
  const [renewals, setRenewals] = useState(initialRenewals);

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
        item.id === id ? { ...item, ...data } : item
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
        item.id === id ? { ...item, ...data } : item
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
        item.id === id ? { ...item, ...data } : item
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
        item.id === id ? { ...item, ...data } : item
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
        item.id === id ? { ...item, ...data } : item
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
        item.id === id ? { ...item, ...data } : item
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

    return rolePermissions[role]?.[key] || false;
  };

  const addCustomer = (data) => {
    setCustomers((prev) => [
      ...prev,
      {
        id: Date.now(),
        customerId: `CUS-${Date.now()}`,
        ...data,
      },
    ]);
  };

  const updateCustomer = (id, data) => {
    setCustomers((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addPolicy = (data) => {
    setPolicies((prev) => [
      ...prev,
      {
        id: Date.now(),
        policyNo: `POL-${Date.now()}`,
        ...data,
      },
    ]);
  };

  const updatePolicy = (id, data) => {
    setPolicies((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deletePolicy = (id) => {
    setPolicies((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addClaim = (data) => {
    setClaims((prev) => [
      ...prev,
      {
        id: Date.now(),
        claimId: `CLM-${Date.now()}`,
        ...data,
      },
    ]);
  };

  const updateClaim = (id, data) => {
    setClaims((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteClaim = (id) => {
    setClaims((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const addRenewal = (data) => {
    setRenewals((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...data,
      },
    ]);
  };

  const updateRenewal = (id, data) => {
    setRenewals((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, ...data }
          : item
      )
    );
  };

  const deleteRenewal = (id) => {
    setRenewals((prev) =>
      prev.filter((item) => item.id !== id)
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

        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,

        policies,
        addPolicy,
        updatePolicy,
        deletePolicy,

        claims,
        addClaim,
        updateClaim,
        deleteClaim,

        renewals,
        addRenewal,
        updateRenewal,
        deleteRenewal,
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