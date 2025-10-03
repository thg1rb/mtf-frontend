export interface Task {
  id: string;
  employerId: string;
  employeeIds: string[];
  typeOfTask: "register" | "renew";
  startStep: number;
  desc: string;
  createAt: string;
  periodUpdates: (Date | string | null)[];
}
