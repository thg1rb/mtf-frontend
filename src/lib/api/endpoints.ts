/**
 * API Endpoints
 * Centralized endpoint definitions for the entire application
 */

export const ENDPOINTS = {
  // Agent endpoints
  agents: {
    base: "/agents",
    statistics: "/agents/statistics",
    detail: (id: string | number) => `/agents/${id}`,
    create: "/agents",
    update: (id: string | number) => `/agents/${id}`,
    delete: (id: string | number) => `/agents/${id}`,
  },

  // Employer endpoints
  employers: {
    base: "/employers",
    statistics: "/employers/statistics",
    detail: (id: string | number) => `/employers/${id}`,
    create: "/employers",
    update: (id: string | number) => `/employers/${id}`,
    delete: (id: string | number) => `/employers/${id}`,
  },

  // Employee endpoints
  employees: {
    base: "/employees",
    statistics: "/employees/statistics",
    detail: (passportNumber: string | number) => `/employees/${passportNumber}`,
    create: "/employees",
    update: (id: string | number) => `/employees/${id}`,
    delete: (id: string | number) => `/employees/${id}`,
    // Nested resources
    contract: (id: string | number) => `/employees/${id}/contract`,
    workPermit: (id: string | number) => `/employees/${id}/work-permit`,
  },

  // Employment Contract endpoints
  employmentContracts: {
    base: "/employment-contracts",
    history: "/employment-contracts/history",
    detail: (id: string | number) => `/employment-contracts/${id}`,
    create: "/employment-contracts",
  },

  // Work Permit endpoints
  workPermits46: {
    base: "/wp46",
    history: "/wp46/history",
    detail: (id: string | number) => `/wp46/${id}`,
    create: "/wp46",
  },

  // Receipt endpoints
  receipts: {
    base: "/receipts",
    detail: (id: string | number) => `/receipts/${id}`,
    create: "/receipts",
    update: (id: string | number) => `/receipts/${id}`,
    delete: (id: string | number) => `/receipts/${id}`,
  },

  // Work endpoints
  works: {
    base: "/works",
    statistics: "/works/statistics",
    detail: (id: string | number) => `/works/${id}`,
    create: "/works",
    update: (id: string | number) => `/works/${id}`,
    delete: (id: string | number) => `/works/${id}`,
    register: "/works/register",
    renew: "/works/renew",
  },
} as const;
