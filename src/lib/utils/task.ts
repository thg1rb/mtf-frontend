import { Task } from "@/types";

// Helper functions for step management
export const getMaxStepsForTaskType = (taskType: "register" | "renew"): number => {
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
  const { stepStartDates } = task;

  for (let i: number = 0; i < stepStartDates.length; i++) {
    if (stepStartDates[i] === null) {
      return i;
    }
  }

  return getMaxStepsForTaskType(task.typeOfTask);
};

export const isTaskCompleted = (task: Task): boolean => {
  const maxSteps = getMaxStepsForTaskType(task.typeOfTask);
  const currentStep = getCurrentStepByTask(task);
  return currentStep >= maxSteps;
};
