export interface Employee {
  id: string
  passportNo: string
  firstname: string
  lastname: string
  nationality: "myanmar" | "laos" | "cambodia"
  bloodType: "A" | "B" | "AB" | "O"
  currentEmployerCompany: string
  status: "active" | "inactive"
  address_details: string
  district: string
  subDistrict: string
  province: string
  postelCode: string
  healthCheckExpiryDate: string
  insuranceExpiryDate: string
  workPermitExpiryDate: string
  certificateOfIdentityExpiryDate: string
  nonThaiIdentificationExpiryDate: string
}

export interface EmployeeTableHeader {
    index: string
    headerName: string
}