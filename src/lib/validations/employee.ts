import { z } from "zod";

export const employeeSchema = z.object({
  passportNumber: z
    .string()
    .min(1, "กรุณาระบุหมายเลขหนังสือเดินทาง")
    .optional(),

  employerId: z
    .string()
    .min(1, "กรุณาระบุรหัสนายจ้าง")
    .length(13, "รหัสไปรษณีย์ต้องมี 13 หลัก")
    .regex(/^[0-9]{13}$/, "รหัสไปรษณีย์ต้องเป็นตัวเลขเท่านั้น"),

  firstname: z.string().min(1, "กรุณาระบุชื่อจริง"),

  lastname: z.string().min(1, "กรุณาระบุนามสกุล"),

  nationality: z.enum(["เมียนมา", "ลาว", "กัมพูชา"], "กรุณาเลือกสัญชาติ"),

  bloodType: z.enum(["A", "B", "AB", "O"], "กรุณาเลือกกรุ๊ปเลือด"),

  status: z.enum(["ACTIVE", "INACTIVE"], "กรุณาระบุสถานะ"),

  address: z.object({
    addrDetailTh: z.string().min(1, "กรุณาระบุบ้านเลขที่, หมู่, ซอย, ถนน"),

    districtTh: z.string().min(1, "กรุณาระบุเขตหรืออำเภอ"),

    subDistrictTh: z.string().min(1, "กรุณาระบุแขวงหรือตำบล"),

    provinceTh: z.string().min(1, "กรุณาระบุจังหวัด"),

    postalCode: z
      .string()
      .min(1, "กรุณาระบุรหัสไปรษณีย์")
      .length(5, "รหัสไปรษณีย์ต้องมี 5 หลัก")
      .regex(/^[0-9]{5}$/, "รหัสไปรษณีย์ต้องเป็นตัวเลขเท่านั้น"),
  }),

  documents: z.object({
    healthCheckExpiryDate: z.string().nullable().optional(),

    insuranceExpiryDate: z.string().nullable().optional(),

    workPermitExpiryDate: z.string().nullable().optional(),

    certificateOfIdentityExpiryDate: z.string().nullable().optional(),

    nonThaiIdentificationExpiryDate: z.string().nullable().optional(),
  }),
});
export type EmployeeFormData = z.infer<typeof employeeSchema>;

export const employeeUpdateSchema = employeeSchema.partial();
export type EmployeeUpdateData = z.infer<typeof employeeUpdateSchema>;
