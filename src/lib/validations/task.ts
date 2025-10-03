import { z } from "zod";

export const taskSchema = z.object({
  employerId: z.string().min(1, "กรุณาเลือกนายจ้าง"),

  startStep: z.enum(
    {
      STEP_1: 1,
      STEP_2: 2,
      STEP_3: 3,
      STEP_4: 4,
      STEP_5: 5,
    },
    "กรุณาระบุขั้นตอนเริ่มต้น"
  ),

  desc: z.string().min(1, "กรุณาระบุหมายเหตุเพิ่มเติม"),

  selectedEmployeeIds: z
    .array(z.string())
    .min(1, "กรุณาเลือกลูกจ้างอย่างน้อย 1 คน"),

  periodUpdates: z.array(z.union([z.string(), z.date()]).nullable()).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const taskUpdateSchema = taskSchema.partial();
export type TaskUpdateData = z.infer<typeof taskUpdateSchema>;
