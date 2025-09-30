export enum HighestEducation {
  NO_FORMAL_EDUCATION = "no_formal_education", // ไม่มีการศึกษา
  LOWER_THAN_PRIMARY = "lower_than_primary", // ต่ำกว่าประถมศึกษา
  PRIMARY_SCHOOL = "primary_school", // ประถมศึกษา
  JUNIOR_HIGH_SCHOOL = "junior_high_school", // มัธยมศึกษาตอนต้น
  SENIOR_HIGH_SCHOOL = "senior_high_school", // มัธยมศึกษาตอนปลาย
  VOCATIONAL = "vocational", // ประกาศนียบัตรวิชาชีพ (ปวช./ปวส.)
  BACHELOR_DEGREE = "bachelor_degree", // ปริญญาตรี หรือเทียบเท่า
  MASTER_OR_HIGHER = "master_or_higher", // สูงกว่าปริญญาตรี
}

export const highestEducationMapping = {
  [HighestEducation.NO_FORMAL_EDUCATION]: "ไม่มีการศึกษา",
  [HighestEducation.LOWER_THAN_PRIMARY]: "ต่ำกว่าประถมศึกษา",
  [HighestEducation.PRIMARY_SCHOOL]: "ประถมศึกษา",
  [HighestEducation.JUNIOR_HIGH_SCHOOL]: "มัธยมศึกษาตอนต้น",
  [HighestEducation.SENIOR_HIGH_SCHOOL]: "มัธยมศึกษาตอนปลาย",
  [HighestEducation.VOCATIONAL]: "ประกาศนียบัตรวิชาชีพ (ปวช./ปวส.)",
  [HighestEducation.BACHELOR_DEGREE]: "ปริญญาตรี หรือเทียบเท่า",
  [HighestEducation.MASTER_OR_HIGHER]: "สูงกว่าปริญญาตรี",
};

export interface WorkPermit {
  id: string;
  employeeId: string;
  typeOfWork: string;
  natureOfWork: string;
  periodOfEmploymentYear: number;
  periodOfEmploymentMonth: number;
  periodOfEmploymentDay: number;
  employmentValidUntil: Date;
  incomePerDay: number;
  benefitPerDay: number;
  highestEducation: HighestEducation;
  workExperiences: number;
  reasonOfNotEmployingThaiPerson: string;
  createdAt: Date;
}
