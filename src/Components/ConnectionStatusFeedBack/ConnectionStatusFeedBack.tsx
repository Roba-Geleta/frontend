import { useContext } from "react";
import { NetworkStatusContext } from "../../Context/NetworkStatusContext";
import { DatabaseStatusContext } from "../../Context/DatabaseStatusContext";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ScaleLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";

const ConnectionStatusFeedBack = () => {
  const { isBackendReachable, hasNetworkErrorRetriesExceeded } =
    useContext(NetworkStatusContext);
  const { isDatabaseResuming, hasDatabaseRetriesExceeded } = useContext(
    DatabaseStatusContext
  );
  const { mode } = useContext(ThemeContext);

  return (
    <div className="App">
      {!isBackendReachable && !hasNetworkErrorRetriesExceeded && (
        <div className="flex network-error text-yellow-600 dark:text-yellow-300 items-center justify-center">
          <span>
            Cannot connect to the server.{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              Retrying
              <ScaleLoader
                height={20}
                width={3}
                color={mode === "light" ? "gray" : "gray"}
                className="ml-1"
              />
            </span>
          </span>
        </div>
      )}
      {hasNetworkErrorRetriesExceeded && (
        <div className="network-error text-yellow-700 dark:text-yellow-400 ">
          Cannot connect to the server after multiple attempts.
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.location.reload()}
            startIcon={<RefreshIcon />}
            fullWidth
          >
            Refresh
          </Button>
        </div>
      )}
      {isDatabaseResuming && (
        <div className="flex database-loading text-yellow-600 dark:text-yellow-300 items-center justify-center">
          <span>
            Database is{" "}
            <span className="inline-flex items-center whitespace-nowrap">
              resuming...
              <ScaleLoader
                height={20}
                width={3}
                color={mode === "light" ? "gray" : "gray"}
                className="ml-1"
              />
            </span>
          </span>
        </div>
      )}
      {hasDatabaseRetriesExceeded && (
        <div className="database-error text-yellow-700 dark:text-yellow-400 ">
          The service is currently unavailable after multiple attempts.
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.location.reload()}
            startIcon={<RefreshIcon />}
            fullWidth
          >
            Refresh
          </Button>
        </div>
      )}
      {/* Rest of your app */}
    </div>
  );
};

export default ConnectionStatusFeedBack;
