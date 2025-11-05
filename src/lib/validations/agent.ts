import { z } from "zod";

export const agentSchema = z.object({
  citizenId: z
    .string()
    .min(1, "กรุณาระบุเลขประจำตัวประชาชน")
    .length(13, "เลขประจำตัวประชาชนต้องมี 13 หลัก")
    .regex(/^\d{13}$/, "เลขประจำตัวประชาชนต้องเป็นตัวเลขเท่านั้น"),

  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),

  firstname: z
    .string()
    .min(1, "กรุณาระบุชื่อจริง"),

  lastname: z
    .string()
    .min(1, "กรุณาระบุนามสกุล"),

  status: z.enum(["ACTIVE", "INACTIVE"], "กรุณาระบุสถานะ"),

  addressDetails: z.string().min(1, "กรุณาระบุบ้านเลขที่, หมู่, ซอย, ถนน"),

  district: z.string().min(1, "กรุณาระบุเขต/อำเภอ"),

  subDistrict: z.string().min(1, "กรุณาระบุแขวง/ตำบล"),

  province: z.string().min(1, "กรุณาระบุจังหวัด"),

  postelCode: z
    .string()
    .min(1, "กรุณาระบุรหัสไปรษณีย์")
    .length(5, "รหัสไปรษณีย์ต้องมี 5 หลัก")
    .regex(/^\d{5}$/, "รหัสไปรษณีย์ต้องเป็นตัวเลขเท่านั้น"),
});

export type AgentFormData = z.infer<typeof agentSchema>;

// สำหรับ partial update (edit mode)
export const agentUpdateSchema = agentSchema.partial();
export type AgentUpdateData = z.infer<typeof agentUpdateSchema>;
