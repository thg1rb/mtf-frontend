export interface Employee {
  id: string
  employerId: string
  passportNo: string
  firstname: string
  lastname: string
  nationality: "myanmar" | "laos" | "cambodia"
  bloodType: "A" | "B" | "AB" | "O"
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