import { Task } from "@/types";

// Helper functions for period management
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

export const getCurrentStep = (task: Task): number => {
  const { periodUpdates } = task;
  let currentPeriod = 0;

  for (let i: number = 0; i < periodUpdates.length; i++) {
    if (periodUpdates[i] === null) {
      currentPeriod = i;
      break;
    }
  }

  return currentPeriod;
};

export const isTaskCompleted = (task: Task): boolean => {
  const maxPeriods = getMaxStepsForTaskType(task.typeOfTask);
  const currentPeriod = getCurrentStep(task);
  return currentPeriod >= maxPeriods;
};
