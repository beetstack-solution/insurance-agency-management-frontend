// src/rbac/constants.js

/* ─────────────────────────────────────────────────────────────
   MENU KEYS  →  PERMISSION NAME ALIAS (from API: permission.nameAlias)
   - A menu key maps to ONE permission alias.
   - null = always visible (no permission required).
   - Scope: the sidebar's canAccessMenu() resolves this against the
     CURRENTLY SELECTED insurance type's permissions.
   ───────────────────────────────────────────────────────────── */
export const MENU_PERMISSIONS = {
  /* ── Main menu ── */
  DASHBOARD: null,

  /* Policies dropdown */
  POLICIES: "POLICY_MANAGEMENT",
  POLICIES_ALL: "POLICY_MANAGEMENT",
  POLICIES_NEW: "POLICY_MANAGEMENT",
  POLICIES_RENEW: "POLICY_MANAGEMENT",

  /* Customers dropdown */
  CUSTOMERS: "CUSTOMER_MANAGEMENT",
  CUSTOMERS_ALL: "CUSTOMER_MANAGEMENT",
  CUSTOMERS_NEW: "CUSTOMER_MANAGEMENT",
  CUSTOMERS_AGENT: "CUSTOMER_MANAGEMENT",
  CUSTOMERS_CORP: "CUSTOMER_MANAGEMENT",

  /* Claims (flat – module type = Claim) */
  CLAIMS: "CLAIM_MANAGEMENT",

  /* Quotations (flat – module type = Quotation) */
  QUOTATIONS: "QUOTATION_MANAGEMENT",

  /* Renewals dropdown */
  RENEWALS: "POLICY_MANAGEMENT",
  RENEWALS_UPCOMING: "POLICY_MANAGEMENT",
  RENEWALS_DUE: "POLICY_MANAGEMENT",
  RENEWALS_DONE: "POLICY_MANAGEMENT",

  /* Reports dropdown */
  REPORTS: null,
  REPORTS_SALES: null,
  REPORTS_POLICY: null,
  REPORTS_CUSTOMER: null,
  REPORTS_CLAIM: null,

  /* ── Settings submenu ── */
  USERS: "USER_MANAGEMENT",
  ROLES: "ROLE_MANAGEMENT",
  PERMISSIONS: "PERMISSION_MODULE_MANAGEMENT",
  INSURANCE_TYPES: "INSURANCE_TYPE_MANAGEMENT",
  MODULES: "MODULE_MANAGEMENT",
  MODULE_ACTIONS: "MODULE_ACTION_MANAGEMENT",
  MODULE_TYPES: "MODULE_TYPE_MANAGEMENT",
  ROLE_PERMISSIONS: "USER_PERMISSION_MANAGEMENT",
};

/* Optional: routes → permission alias (for PermissionRoute) */
export const ROUTE_PERMISSIONS = {
  "/policies": "POLICY_MANAGEMENT",
  "/policies/new": "POLICY_MANAGEMENT",
  "/policies/renew": "POLICY_MANAGEMENT",
  "/customers": "CUSTOMER_MANAGEMENT",
  "/customers/new": "CUSTOMER_MANAGEMENT",
  "/customers/agents": "CUSTOMER_MANAGEMENT",
  "/customers/corporate": "CUSTOMER_MANAGEMENT",
  "/claims": "CLAIM_MANAGEMENT",
  "/quotations": "QUOTATION_MANAGEMENT",
  "/renewals": "POLICY_MANAGEMENT",
  "/renewals/due": "POLICY_MANAGEMENT",
  "/renewals/completed": "POLICY_MANAGEMENT",

  "/settings/users": "USER_MANAGEMENT",
  "/settings/roles": "ROLE_MANAGEMENT",
  "/settings/permissions": "PERMISSION_MODULE_MANAGEMENT",
  "/settings/insurance-types": "INSURANCE_TYPE_MANAGEMENT",
  "/settings/modules": "MODULE_MANAGEMENT",
  "/settings/module-actions": "MODULE_ACTION_MANAGEMENT",
  "/settings/module-types": "MODULE_TYPE_MANAGEMENT",
  "/settings/role-permissions": "USER_PERMISSION_MANAGEMENT",
};

export const ACTIONS = {
  CREATE: "CREATE",
  READ: "READ",
  UPDATE: "UPDATE",
  SOFT_DELETE: "SOFT_DELETE",
  PERMANENT_DELETE: "PERMANENT_DELETE",
  STATUS_CHANGE: "STATUS_CHANGE",
  EXPORT: "EXPORT",
  APPROVE: "APPROVE",
  REJECT: "REJECT",
  RENEW: "RENEW",
  SETTLE: "SETTLE",
};