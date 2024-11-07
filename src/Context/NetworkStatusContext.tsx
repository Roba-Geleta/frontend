import { createContext, useState, useEffect, ReactNode } from "react";
import {
  getIsBackendReachable,
  subscribeToBackendReachable,
  getHasNetworkErrorRetriesExceeded,
  subscribeToNetworkErrorRetriesExceeded,
} from "../Services/networkStatusManager";

interface NetworkStatusContextProps {
  isBackendReachable: boolean;
  hasNetworkErrorRetriesExceeded: boolean;
}

export const NetworkStatusContext = createContext<NetworkStatusContextProps>({
  isBackendReachable: false,
  hasNetworkErrorRetriesExceeded: false,
});

export const NetworkStatusProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isBackendReachable, setIsBackendReachableState] = useState<boolean>(
    getIsBackendReachable()
  );
  const [
    hasNetworkErrorRetriesExceeded,
    setHasNetworkErrorRetriesExceededState,
  ] = useState<boolean>(getHasNetworkErrorRetriesExceeded());

  useEffect(() => {
    const unsubscribeBackendReachable = subscribeToBackendReachable(
      setIsBackendReachableState
    );
    const unsubscribeNetworkErrorRetriesExceeded =
      subscribeToNetworkErrorRetriesExceeded(
        setHasNetworkErrorRetriesExceededState
      );
    return () => {
      unsubscribeBackendReachable();
      unsubscribeNetworkErrorRetriesExceeded();
    };
  }, []);

  return (
    <NetworkStatusContext.Provider
      value={{
        isBackendReachable,
        hasNetworkErrorRetriesExceeded,
      }}
    >
      {children}
    </NetworkStatusContext.Provider>
  );
};
