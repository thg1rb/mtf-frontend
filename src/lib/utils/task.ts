import { Task } from "@/types";
import { isPaidByTaskIdAndStep } from "../mock-data";

// Helper functions for step management
export const getMaxStepTypeOfTask = (
  taskType: "register" | "renew"
): number => {
  switch (taskType) {
    case "register":
      return 4;
    case "renew":
      return 5;
    default:
      return 0;
  }
};

export const getCurrentStepByTask = (task: Task): number => {
  const currentStep = task.stepCompletedDates.filter(
    (stepCompleteDate) => stepCompleteDate !== null
  ).length + 1;
  const maxStep = getMaxStepTypeOfTask(task.typeOfTask);

  return currentStep > maxStep ? maxStep : currentStep;
};

export const isTaskCompleted = (task: Task): boolean => {
  const maxStep = getMaxStepTypeOfTask(task.typeOfTask);
  const currentStep = getCurrentStepByTask(task);
  return (
    task.stepCompletedDates[maxStep - 1] !== null && isPaidByTaskIdAndStep(task.id, currentStep)
  );
};
