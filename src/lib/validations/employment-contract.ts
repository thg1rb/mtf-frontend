import { z } from "zod";

export const employmentContractSchema = z.object({
  typeOfWorkTh: z.string().min(1, "กรุณาระบุประเภทงาน (ภาษาไทย)"),

  typeOfWorkEn: z.string().min(1, "กรุณาระบุประเภทงาน (ภาษาอังกฤษ)"),

  incomePerDay: z.coerce
    .number("กรุณาระบุค่าจ้างต่อวัน")
    .min(0, "ค่าจ้างรายวันต้องไม่น้อยกว่า 0"),

  payIncomeDate: z.coerce
    .number("กรุณาระบุวันที่จ่ายค่าจ้าง")
    .min(1, "วันจ่ายเงินเดือนต้องไม่น้อยกว่า 1")
    .max(31, "วันจ่ายเงินเดือนต้องไม่เกิน 31"),

  periodOfEmployment: z.coerce
    .number("กรุณาระบุระยะเวลาจ้าง")
    .min(1, "ระยะเวลาการจ้างงานต้องไม่น้อยกว่า 1 เดือน"),

  workingHourLimit: z.coerce
    .number("กรุณาระบุชั่วโมงการทำงานสูงสุด")
    .min(1, "จำนวนชั่วโมงทำงานต้องไม่น้อยกว่า 1")
    .max(24, "จำนวนชั่วโมงทำงานต้องไม่เกิน 24"),

  workingDayPerWeek: z.coerce
    .number("กรุณาระบุจำนวนวันทำงานใน 1 สัปดาห์")
    .min(1, "จำนวนวันทำงานต่อสัปดาห์ต้องไม่น้อยกว่า 1")
    .max(7, "จำนวนวันทำงานต่อสัปดาห์ต้องไม่เกิน 7"),

  daysOffWeeklyTh: z.string().min(1, "กรุณาระบุวันหยุดประจำสัปดาห์ (ภาษาไทย)"),

  daysOffWeeklyEn: z
    .string()
    .min(1, "กรุณาระบุวันหยุดประจำสัปดาห์ (ภาษาอังกฤษ)"),

  daysOffHolidayTh: z.string().min(1, "กรุณาระบุวันหยุดนักขัตฤกษ์ (ภาษาไทย)"),

  daysOffHolidayEn: z
    .string()
    .min(1, "กรุณาระบุวันหยุดนักขัตฤกษ์ (ภาษาอังกฤษ)"),

  daysAnnualLeaveTh: z
    .string()
    .min(1, "กรุณาระบุวันลาพักผ่อนประจำปี (ภาษาไทย)"),

  daysAnnualLeaveEn: z
    .string()
    .min(1, "กรุณาระบุวันลาพักผ่อนประจำปี (ภาษาอังกฤษ)"),

  overtimeRateTh: z.string().min(1, "กรุณาระบุอัตราค่าจ้างล่วงเวลา (ภาษาไทย)"),

  overtimeRateEn: z
    .string()
    .min(1, "กรุณาระบุอัตราค่าจ้างล่วงเวลา (ภาษาอังกฤษ)"),

  holidayOvertimeRateTh: z
    .string()
    .min(1, "กรุณาระบุอัตราค่าจ้างล่วงเวลาวันหยุด (ภาษาไทย)"),

  holidayOvertimeRateEn: z
    .string()
    .min(1, "กรุณาระบุอัตราค่าจ้างล่วงเวลาวันหยุด (ภาษาอังกฤษ)"),
});
export type EmploymentContractFormData = z.infer<
  typeof employmentContractSchema
>;
