import { Task, TableHeader } from "@/types";
import { isTaskCompleted } from "../utils/task";

export const taskTableHeaders: TableHeader[] = [
  {
    index: "header-1",
    headerName: "ประเภทงาน",
  },
  {
    index: "header-2",
    headerName: "นายจ้าง",
  },
  {
    index: "header-3",
    headerName: "ขั้นตอนปัจจุบัน",
  },
  {
    index: "header-4",
    headerName: "สถานะ",
  },
  {
    index: "header-5",
    headerName: "ดำเนินการ",
  },
];

const registerSteps = [
  {
    step: 1,
    detail: "รวบรวมเอกสารเพิ่มเติม",
  },
  {
    step: 2,
    detail: "ตรวจสอบโรคและซื้อประกันสุขภาพ",
  },
  {
    step: 3,
    detail: "ทำบัตรประจำตัวคนซึ่งไม่มีสัญชาติไทย (เล่มชมพู)",
  },
  {
    step: 4,
    detail: "ทำเอกสารรับรองบุคคลเข้าออกระหว่างประเทศ (เล่ม CI)",
  },
];

const renewSteps = [
  {
    step: 1,
    detail: "รวบรวมเอกสารเพิ่มเติม",
  },
  {
    step: 2,
    detail: "ตรวจสอบโรคและซื้อประกันสุขภาพ",
  },
  {
    step: 3,
    detail: "ยื่น Calling Visa กับกรมแรงงาน",
  },
  {
    step: 4,
    detail: "ซื้อใบอนุญาตทำงานกับกรมแรงงาน",
  },
  {
    step: 5,
    detail: "ตีวีซ่าตรวจคนเข้าเมือง",
  },
];

export const mockTasks: Task[] = [
  {
    id: "TSK001",
    employerId: "0755556677882",
    employeeIds: ["EMP001", "EMP021"],
    typeOfTask: "register",
    description: "ขึ้นทะเบียนใบอนุญาตทำงานใหม่สำหรับพนักงานครัวและบริการ",
    createdAt: "2024-09-15",
    stepCompletedDates: [
      new Date("2024-09-16"),
      new Date("2024-09-22"),
      new Date("2024-09-23"),
      null,
      null,
    ],
  },
];

export const getTasks = (): Task[] => mockTasks;

export const getTaskById = (id: string) =>
  mockTasks.find((task) => task.id === id);

export const getCurrentStep = (stepStartDates: (Date | string | null)[]) => {
  let i: number = 0;
  const steps = stepStartDates.length;

  for (; i < steps; i++) {
    if (stepStartDates[i] === null) return i;
  }

  return i;
};

export const getTypeOfTaskLabelAndSteps = (typeOfTask: "register" | "renew") =>
  typeOfTask === "register"
    ? { label: "ขึ้นทะเบียนใหม่", steps: registerSteps }
    : { label: "ต่อใบอนุญาตทำงาน", steps: renewSteps };

export const countTotalTasks = (): number => getTasks().length;

export const countCompletedTasks = (): number =>
  getTasks().filter((task) => isTaskCompleted(task)).length;

export const countInProgressTasks = (): number =>
  getTasks().filter((task) => !isTaskCompleted(task)).length;
