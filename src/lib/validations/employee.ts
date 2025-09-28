import { z } from "zod";

export const employeeSchema = z.object({
  employerId: z.string().min(1, "กรุณาระบุรหัสนายจ้าง"),

  passportNo: z
    .string()
    .min(1, "กรุณาระบุหมายเลขหนังสือเดินทาง")
    .nullable()
    .optional(),

  firstname: z.string().min(1, "กรุณาระบุชื่อจริง"),

  lastname: z.string().min(1, "กรุณาระบุนามสกุล"),

  nationality: z.enum(["myanmar", "laos", "cambodia"], "กรุณาเลือกสัญชาติ"),

  bloodType: z.enum(["A", "B", "AB", "O"], "กรุณาเลือกกรุ๊ปเลือด"),

  status: z.enum(["active", "inactive"], "กรุณาระบุสถานะ"),

  addressDetails: z.string().min(1, "กรุณาระบุที่อยู่"),

  district: z.string().min(1, "กรุณาระบุเขตหรืออำเภอ"),

  subDistrict: z.string().min(1, "กรุณาระบุแขวงหรือตำบล"),

  province: z.string().min(1, "กรุณาระบุจังหวัด"),

  postalCode: z
    .string()
    .min(1, "กรุณาระบุรหัสไปรษณีย์")
    .length(5, "รหัสไปรษณีย์ต้องมี 5 หลัก")
    .regex(/^[0-9]{5}$/, "รหัสไปรษณีย์ต้องเป็นตัวเลขเท่านั้น"),

  healthCheckExpiryDate: z.union([z.string(), z.date()]).nullable().optional(),

  insuranceExpiryDate: z.union([z.string(), z.date()]).nullable().optional(),

  workPermitExpiryDate: z.union([z.string(), z.date()]).nullable().optional(),

  certificateOfIdentityExpiryDate: z
    .union([z.string(), z.date()])
    .nullable()
    .optional(),

  nonThaiIdentificationExpiryDate: z
    .union([z.string(), z.date()])
    .nullable()
    .optional(),
});
export type EmployeeFormData = z.infer<typeof employeeSchema>;

export const employeeUpdateSchema = employeeSchema.partial();
export type EmployeeUpdateData = z.infer<typeof employeeUpdateSchema>;
