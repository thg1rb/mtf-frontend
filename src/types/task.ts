export interface Task {
  id: string;
  employerId: string;
  employeeIds: string[];
  typeOfTask: "register" | "renew";
  startStep: number;
  description: string;
  createAt: string;
  stepStartDates: (Date | string | null)[];
}
