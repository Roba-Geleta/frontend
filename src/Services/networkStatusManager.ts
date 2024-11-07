let isBackendReachable = true;
let hasNetworkErrorRetriesExceeded = false;

let backendReachableListeners: Array<(value: boolean) => void> = [];
let networkErrorRetriesExceededListeners: Array<(value: boolean) => void> = [];

// For isBackendReachable
export const setIsBackendReachable = (value: boolean) => {
  isBackendReachable = value;
  backendReachableListeners.forEach((listener) => listener(isBackendReachable));
};

export const getIsBackendReachable = () => isBackendReachable;

export const subscribeToBackendReachable = (
  listener: (value: boolean) => void
) => {
  backendReachableListeners.push(listener);
  return () => {
    backendReachableListeners = backendReachableListeners.filter(
      (l) => l !== listener
    );
  };
};

// For hasNetworkErrorRetriesExceeded
export const setHasNetworkErrorRetriesExceeded = (value: boolean) => {
  hasNetworkErrorRetriesExceeded = value;
  networkErrorRetriesExceededListeners.forEach((listener) =>
    listener(hasNetworkErrorRetriesExceeded)
  );
};

export const getHasNetworkErrorRetriesExceeded = () =>
  hasNetworkErrorRetriesExceeded;

export const subscribeToNetworkErrorRetriesExceeded = (
  listener: (value: boolean) => void
) => {
  networkErrorRetriesExceededListeners.push(listener);
  return () => {
    networkErrorRetriesExceededListeners =
      networkErrorRetriesExceededListeners.filter((l) => l !== listener);
  };
};
