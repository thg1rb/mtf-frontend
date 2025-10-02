export interface Employee {
  id: string
  passportNo: string | null
  employerId: string
  firstname: string
  lastname: string
  nationality: "myanmar" | "laos" | "cambodia"
  bloodType: "A" | "B" | "AB" | "O"
  status: "active" | "inactive"
  addressDetails: string
  district: string
  subDistrict: string
  province: string
  postalCode: string
  healthCheckExpiryDate: string | Date | null
  insuranceExpiryDate: string | Date | null
  workPermitExpiryDate: string | Date | null
  certificateOfIdentityExpiryDate: string | Date | null
  nonThaiIdentificationExpiryDate: string | Date | null
}
