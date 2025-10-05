import { z } from "zod";

export const taskSchema = z.object({
  employerId: z.string().min(1, "กรุณาเลือกนายจ้าง"),

  description: z.string().min(1, "กรุณาระบุหมายเหตุเพิ่มเติม"),

  employeeIds: z.array(z.string()).min(1, "กรุณาเลือกลูกจ้างอย่างน้อย 1 คน"),

  stepCompletedDates: z.array(z.union([z.string(), z.date()]).nullable()).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const taskUpdateSchema = taskSchema.partial();
export type TaskUpdateData = z.infer<typeof taskUpdateSchema>;
