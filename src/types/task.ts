export interface Task {
  id: string;
  employerId: string;
  employeeIds: string[];
  typeOfTask: "register" | "renew";
  description: string;
  createdAt: string;
  stepCompletedDates: (Date | string | null)[];
}
