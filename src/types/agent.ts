export interface Agent {
  citizenId: string;
  email: string;
  firstname: string;
  lastname: string;
  status: "active" | "inactive";
  addressDetails: string;
  subDistrict: string;
  district: string;
  province: string;
  postelCode: string;
}
