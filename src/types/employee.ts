export interface Employee {
  id: number
  name: string
  nationality: string
  passportNo: string
  employerName: string
  position: string
  workPermitStatus: 'active' | 'expiring' | 'expired'
  workPermitExpiry: string
  visaStatus: 'active' | 'expiring' | 'expired'
  visaExpiry: string
  healthCheckExpiry: string
  status: 'active' | 'inactive'
  registeredDate: string
}