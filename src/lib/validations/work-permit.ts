import { HighestEducation } from "@/types";
import { z } from "zod";

export const workPermitSchema = z.object({

  typeOfWork: z.string().min(1, "กรุณาระบุประเภทงาน"),

  natureOfWork: z.string().min(1, "กรุณาระบุลักษณะงาน"),

  periodOfEmploymentYear: z.coerce
    .number("กรุณาระบุระยะเวลาจ้าง (ปี)")
    .min(0, "จำนวนปีต้องไม่น้อยกว่า 0"),

  periodOfEmploymentMonth: z.coerce
    .number("กรุณาระบุระยะเวลาจ้าง (เดือน)")
    .min(0, "จำนวนเดือนต้องไม่น้อยกว่า 0")
    .max(11, "จำนวนเดือนต้องไม่เกิน 11"),

  periodOfEmploymentDay: z.coerce
    .number("กรุณาระบุระยะเวลาจ้าง (วัน)")
    .min(0, "จำนวนวันต้องไม่น้อยกว่า 0")
    .max(31, "จำนวนวันต้องไม่เกิน 31"),

  employmentValidUntil: z.coerce.date("กรุณาระบุวันที่สิ้นสุดสัญญาจ้าง"),

  incomePerDay: z.coerce
    .number("กรุณาระบุค่าจ้างต่อวัน")
    .min(0, "ค่าจ้างรายวันต้องไม่น้อยกว่า 0"),

  benefitPerDay: z.coerce
    .number("กรุณาระบุค่าผลประโยชน์ต่อวัน")
    .min(0, "สวัสดิการต่อวันต้องไม่น้อยกว่า 0"),

  highestEducation: z.enum(HighestEducation, "กรุณาระบุระดับการศึกษาสูงสุด"),

  workExperiences: z.coerce
    .number("กรุณาระบุประสบการณ์ทำงาน")
    .min(0, "ประสบการณ์ทำงานต้องไม่น้อยกว่า 0"),

  reasonOfNotEmployingThaiPerson: z
    .string()
    .min(1, "กรุณาระบุเหตุผลในการไม่จ้างแรงงานไทย"),
});
export type WorkPermitFormData = z.infer<typeof workPermitSchema>;
