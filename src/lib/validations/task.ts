import { z } from "zod";

export const taskSchema = z.object({
  employerId: z.string().min(1, "กรุณาเลือกนายจ้าง"),

  startStep: z.coerce.number("กรุณาระบุขั้นตอนเริ่มต้น").min(1).max(5),

  desc: z.string().min(1, "กรุณาระบุหมายเหตุเพิ่มเติม"),

  employeeIds: z.array(z.string()).min(1, "กรุณาเลือกลูกจ้างอย่างน้อย 1 คน"),

  periodUpdates: z.array(z.union([z.string(), z.date()]).nullable()).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

export const taskUpdateSchema = taskSchema.partial();
export type TaskUpdateData = z.infer<typeof taskUpdateSchema>;
