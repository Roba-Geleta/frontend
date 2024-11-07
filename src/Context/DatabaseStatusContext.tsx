import { createContext, useState, ReactNode, useEffect } from "react";

import {
  getIsDatabaseResuming,
  subscribeToDatabaseStatus,
  getHasDatabaseRetriesExceeded,
} from "../Services/databaseStatusManager";

interface DatabaseStatusContextProps {
  isDatabaseResuming: boolean;
  hasDatabaseRetriesExceeded: boolean;
}

export const DatabaseStatusContext = createContext<DatabaseStatusContextProps>({
  isDatabaseResuming: false,
  hasDatabaseRetriesExceeded: false,
});

export const DatabaseStatusProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isDatabaseResuming, setIsDatabaseResuming] = useState<boolean>(
    getIsDatabaseResuming()
  );
  const [hasRetriesExceeded, setHasRetriesExceeded] = useState<boolean>(
    getHasDatabaseRetriesExceeded()
  );

  useEffect(() => {
    const unsubscribe = subscribeToDatabaseStatus(setIsDatabaseResuming);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Update the state when retries are exceeded
    setHasRetriesExceeded(getHasDatabaseRetriesExceeded());
  }, [getHasDatabaseRetriesExceeded()]);

  return (
    <DatabaseStatusContext.Provider
      value={{
        isDatabaseResuming,
        hasDatabaseRetriesExceeded: hasRetriesExceeded,
      }}
    >
      {children}
    </DatabaseStatusContext.Provider>
  );
};
