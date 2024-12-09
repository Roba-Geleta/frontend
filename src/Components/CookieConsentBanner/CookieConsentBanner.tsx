import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";

interface CookieConsentBannerProps {
  storageKey?: string;
  onAccept?: () => void;
}

const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  storageKey = "cookie_consent_accepted",
  onAccept,
}) => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem(storageKey);
    if (!consentGiven) {
      setShowBanner(true);
    }
  }, [storageKey]);

  const acceptCookies = () => {
    localStorage.setItem(storageKey, "true");
    setShowBanner(false);
    if (onAccept) onAccept();
  };

  if (!showBanner) return null;

  return (
    <div className="absolute pointer-events-auto bottom-0 w-full bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 p-4 flex flex-col sm:flex-row items-center justify-between z-50">
      <div className="text-sm text-gray-900 dark:text-gray-100 mb-2 sm:mb-0">
        This website relies on essential cookies for authentication and
        performance. By using this site, you consent to their use.
      </div>
      <div className="flex space-x-2">
        <Button
          variant="contained"
          color="primary"
          onClick={acceptCookies}
          size="small"
          className="!bg-blue-600 hover:!bg-blue-700 normal-case"
        >
          Acknowledge
        </Button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
