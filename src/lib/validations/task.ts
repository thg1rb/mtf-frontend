import { z } from "zod";

export const taskSchema = z.object({
  employerId: z.string().min(1, "กรุณาเลือกนายจ้าง"),

  description: z.string().min(1, "กรุณาระบุหมายเหตุเพิ่มเติม"),

  employeeIds: z.array(z.string()).min(1, "กรุณาเลือกลูกจ้างอย่างน้อย 1 คน"),

  currentStepIndex: z.number().min(1).max(5),

  currentStep: z.enum([
    "รวบรวมเอกสารเพิ่มเติม",
    "ตรวจสอบโรคและซื้อประกันสุขภาพ",
    "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)",
    "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)",
    "ยื่น Calling Visa กับกรมแรงงาน",
    "ซื้อใบอนุญาตการทำงานกับกรมแรงงาน",
    "ตีซ่าตรวจคนเข้าเมือง",
  ]),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const taskUpdateSchema = taskSchema.partial();
export type TaskUpdateData = z.infer<typeof taskUpdateSchema>;
