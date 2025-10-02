export enum TypeOfTask {
  REGISTER = "register",
  RENEW = "renew",
}

export enum StatusOfTask {
  COMPLETED = "completed",
  IN_PROGRESS = "in_progress",
  CANCELLED = "cancelled",
}

export const typeOfTaskMappingRecord: Record<TypeOfTask, string> = {
  [TypeOfTask.REGISTER]: "ขึ้นทะเบียนใหม่",
  [TypeOfTask.RENEW]: "ต่ออายุใบอนุญาต",
};

export const statusOfTaskMappingRecord: Record<StatusOfTask, string> = {
  [StatusOfTask.COMPLETED]: "เสร็จสิ้น",
  [StatusOfTask.IN_PROGRESS]: "กำลังดำเนินการ",
  [StatusOfTask.CANCELLED]: "ยกเลิก",
};

export interface Task {
  id: string;
  employerId: string;
  employeeIds: string[];
  typeOfTask: TypeOfTask;
  desc: string;
  createAt: string;
  periodUpdates: (Date | null)[];
}