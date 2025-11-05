export type EmployerStats = {
  totalEmployers: number;
  activeEmployers: number;
  inactiveEmployers: number;
};

export interface Employer {
  taxId: string;
  firstname: string;
  lastname: string;
  companyName: string;
  businessType: string;
  phoneNumber: string;
  email: string;
  financialStatusYear: number;
  financialStatusIncome: number;
  financialStatusTax: number;
  currentIncome: number;
  currentIncomeDuration: number;
  addressDetailsTh: string;
  addressDetailsEn: string;
  districtTh: string;
  districtEn: string;
  subDistrictTh: string;
  subDistrictEn: string;
  provinceTh: string;
  provinceEn: string;
  postalCode: string;
  status: "active" | "inactive";
}
