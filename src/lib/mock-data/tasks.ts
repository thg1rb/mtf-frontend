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
      new Date("2024-09-15"),
      new Date("2024-09-22"),
      new Date("2024-09-22"),
      null,
      null,
    ],
  },
  {
    id: "TSK002",
    employerId: "0105556123456",
    employeeIds: ["EMP002", "EMP011", "EMP022"],
    typeOfTask: "register",
    description: "ขึ้นทะเบียนใบอนุญาตทำงานใหม่สำหรับพนักงานบริการและก่อสร้าง",
    createdAt: "2024-08-20",
    stepCompletedDates: [
      new Date("2024-08-20"),
      new Date("2024-08-28"),
      new Date("2024-09-05"),
      new Date("2024-09-12"),
      null,
    ],
  },
  {
    id: "TSK003",
    employerId: "0305552468135",
    employeeIds: ["EMP008", "EMP016"],
    typeOfTask: "register",
    description: "ขึ้นทะเบียนใบอนุญาตทำงานใหม่สำหรับช่างเทคนิคและคนงานโรงงาน",
    createdAt: "2024-07-10",
    stepCompletedDates: [
      new Date("2024-07-10"),
      new Date("2024-07-18"),
      new Date("2024-07-25"),
      new Date("2024-08-01"),
      null,
    ],
  },
  {
    id: "TSK004",
    employerId: "0435559988776",
    employeeIds: ["EMP005", "EMP018", "EMP029"],
    typeOfTask: "register",
    description: "ขึ้นทะเบียนใบอนุญาตทำงานใหม่สำหรับคนงานเกษตรและแปรรูปอาหาร",
    createdAt: "2024-06-01",
    stepCompletedDates: [
      new Date("2024-06-01"),
      new Date("2024-06-08"),
      new Date("2024-06-15"),
      new Date("2024-06-22"),
      null,
    ],
  },
  {
    id: "TSK005",
    employerId: "0105556123456",
    employeeIds: ["EMP002", "EMP011"],
    typeOfTask: "register",
    description: "ขึ้นทะเบียนใบอนุญาตทำงานใหม่สำหรับพนักงานฟาร์มและคลังสินค้า",
    createdAt: "2024-05-15",
    stepCompletedDates: [new Date("2024-05-15"), null, null, null, null],
  },
  {
    id: "TSK006",
    employerId: "0385554433221",
    employeeIds: ["EMP009", "EMP019", "EMP030"],
    typeOfTask: "renew",
    description: "ต่ออายุใบอนุญาตทำงานสำหรับพนักงานโลจิสติกส์และขนส่ง",
    createdAt: "2024-04-01",
    stepCompletedDates: [
      new Date("2024-04-01"),
      new Date("2024-04-10"),
      new Date("2024-04-18"),
      new Date("2024-04-25"),
      new Date("2024-05-02"),
    ],
  },
  {
    id: "TSK007",
    employerId: "0305552468135",
    employeeIds: ["EMP008", "EMP016", "EMP027"],
    typeOfTask: "renew",
    description: "ต่ออายุใบอนุญาตทำงานสำหรับช่างและคนงานประกอบชิ้นส่วน",
    createdAt: "2024-03-20",
    stepCompletedDates: [
      new Date("2024-03-20"),
      new Date("2024-03-28"),
      new Date("2024-04-05"),
      new Date("2024-04-12"),
      new Date("2024-04-19"),
    ],
  },
  {
    id: "TSK008",
    employerId: "0385554433221",
    employeeIds: ["EMP009", "EMP019", "EMP030"],
    typeOfTask: "renew",
    description: "ต่ออายุใบอนุญาตทำงานสำหรับพนักงานโรงงานยางและปิโตรเคมี",
    createdAt: "2024-02-15",
    stepCompletedDates: [
      new Date("2024-02-15"),
      new Date("2024-02-22"),
      new Date("2024-03-01"),
      null,
      null,
    ],
  },
  {
    id: "TSK009",
    employerId: "0835557654321",
    employeeIds: ["EMP010", "EMP014", "EMP025"],
    typeOfTask: "renew",
    description: "ต่ออายุใบอนุญาตทำงานสำหรับพนักงานโรงแรมและแปรรูปอาหารทะเล",
    createdAt: "2024-01-30",
    stepCompletedDates: [
      new Date("2024-01-30"),
      new Date("2024-02-06"),
      new Date("2024-02-13"),
      new Date("2024-02-20"),
      new Date("2024-02-27"),
    ],
  },
  {
    id: "TSK010",
    employerId: "0505559876543",
    employeeIds: ["EMP003", "EMP012", "EMP023"],
    typeOfTask: "renew",
    description: "ต่ออายุใบอนุญาตทำงานสำหรับพนักงานโรงแรมและบริการ",
    createdAt: "2024-01-10",
    stepCompletedDates: [
      new Date("2024-01-10"),
      new Date("2024-01-17"),
      null,
      null,
      null,
    ],
  },
  {
    id: "TSK011",
    employerId: "0755556677882",
    employeeIds: ["EMP001", "EMP021"],
    typeOfTask: "register",
    description: "ขึ้นทะเบียนใบอนุญาตทำงานใหม่สำหรับพนักงานบริการทำความสะอาด",
    createdAt: "2024-10-01",
    stepCompletedDates: [null, null, null, null, null],
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
