import { z } from "zod";

const currentYear = new Date().getFullYear();

export const financialStatusYearOptions = Array.from(
  { length: 4 },
  (_, index) => currentYear - index
);

export const employerSchema = z.object({
  id: z
    .string()
    .min(1, "กรุณาระบุเลขประจำตัวผู้เสียภาษี")
    .length(13, "เลขประจำตัวผู้เสียภาษีต้องมี 13 หลัก")
    .regex(/^[0-9]{13}$/, "เลขประจำตัวผู้เสียภาษีต้องเป็นตัวเลขเท่านั้น"),

  firstname: z.string().min(1, "กรุณาระบุชื่อจริง"),

  lastname: z.string().min(1, "กรุณาระบุนามสกุล"),

  companyName: z.string().min(1, "กรุณาระบุชื่อบริษัท"),

  businessType: z.string().min(1, "กรุณาระบุประเภทธุรกิจ"),

  phoneNumber: z
    .string()
    .min(1, "กรุณาระบุหมายเลขโทรศัพท์")
    .length(10, "หมายเลขโทรศัพท์ต้องมี 10 หลัก")
    .regex(/^[0-9]{10}$/, "หมายเลขโทรศัพท์ต้องเป็นตัวเลขเท่านั้น"),

  email: z.email("รูปแบบอีเมลไม่ถูกต้อง"),

  financialStatusYear: z.coerce
    .number()
    .int("ปีงบการเงินต้องเป็นจำนวนเต็ม")
    .refine(
      (val) => financialStatusYearOptions.includes(val),
      "กรุณาเลือกปีงบการเงินให้ถูกต้อง"
    ),

  financialStatusIncome: z.coerce
    .number("กรุณาระบุรายได้รวมเป็นตัวเลข")
    .min(0, "รายได้รวมต้องมากกว่าหรือเท่ากับ 0"),

  financialStatusTax: z.coerce
    .number("กรุณาระบุภาษีที่ชำระเป็นตัวเลข")
    .min(0, "ภาษีที่ชำระต้องมากกว่าหรือเท่ากับ 0"),

  currentIncome: z.coerce
    .number("กรุณาระบุรายได้ปัจจุบัน")
    .min(0, "รายได้ปัจจุบันต้องมากกว่าหรือเท่ากับ 0"),

  incomeDuration: z.coerce
    .number("กรุณาระบุช่วงระยะเวลาของรายได้ปัจจุบัน")
    .min(1, "ช่วงระยะเวลาของรายได้ปัจจุบันต้องมากกว่า 0"),

  address: z.object({
    addrDetailTh: z.string().min(1, "กรุณาระบุบ้านเลขที่, หมู่, ซอย, ถนนเป็นภาษาไทย"),

    addrDetailEn: z.string().min(1, "กรุณาระบุบ้านเลขที่, หมู่, ซอย, ถนนเป็นภาษาอังกฤษ"),

    districtTh: z.string().min(1, "กรุณาระบุเขตหรืออำเภอเป็นภาษาไทย"),

    districtEn: z.string().min(1, "กรุณาระบุเขตหรืออำเภอเป็นภาษาอังกฤษ"),

    subDistrictTh: z.string().min(1, "กรุณาระบุแขวงหรือตำบลเป็นภาษาไทย"),

    subDistrictEn: z.string().min(1, "กรุณาระบุแขวงหรือตำบลเป็นภาษาอังกฤษ"),

    provinceTh: z.string().min(1, "กรุณาระบุจังหวัดเป็นภาษาไทย"),

    provinceEn: z.string().min(1, "กรุณาระบุจังหวัดเป็นภาษาอังกฤษ"),

    postalCode: z
      .string()
      .min(1, "กรุณาระบุรหัสไปรษณีย์")
      .length(5, "รหัสไปรษณีย์ต้องมี 5 หลัก")
      .regex(/^[0-9]{5}$/, "รหัสไปรษณีย์ต้องเป็นตัวเลขเท่านั้น"),
  }),

  status: z.enum(["ACTIVE", "INACTIVE"]),
});
export type EmployerFormData = z.infer<typeof employerSchema>;

export const employerUpdateSchema = employerSchema.partial();
export type EmployerUpdateData = z.infer<typeof employerUpdateSchema>;
