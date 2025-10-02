import { Task, TypeOfTask } from "@/types";

// Helper functions for period management
export const getMaxPeriodsForTaskType = (taskType: TypeOfTask): number => {
  switch (taskType) {
    case TypeOfTask.REGISTER:
      return 4;
    case TypeOfTask.RENEW:
      return 5;
    default:
      return 0;
  }
};

export const getCurrentPeriod = (task: Task): number => {
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
  const maxPeriods = getMaxPeriodsForTaskType(task.typeOfTask);
  const currentPeriod = getCurrentPeriod(task);
  return currentPeriod >= maxPeriods;
};
