let isDatabaseResuming = false;
let hasDatabaseRetriesExceeded = false;
let listeners: Array<(value: boolean) => void> = [];

export const setIsDatabaseResuming = (value: boolean) => {
  isDatabaseResuming = value;
  listeners.forEach((listener) => listener(isDatabaseResuming));
};

export const getIsDatabaseResuming = () => isDatabaseResuming;

export const setHasDatabaseRetriesExceeded = (value: boolean) => {
  hasDatabaseRetriesExceeded = value;
};

export const getHasDatabaseRetriesExceeded = () => hasDatabaseRetriesExceeded;

export const subscribeToDatabaseStatus = (
  listener: (value: boolean) => void
) => {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
};
