import { useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/Public"; // Icon for location
import { getIPInfo } from "../../api";
import { LocationGet } from "../../Models/Location";
import Flag from "react-world-flags"; // Flag component

function LocationDisplay() {
  const [location, setLocation] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.ipify.org/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userIp = data.ip;
        getIPInfo(userIp)
          .then((locationData: LocationGet) => {
            setLocation(
              `${locationData.city} • ${locationData.region} • ${locationData.country}`
            );
            setCountryCode(locationData.country); // Set country code for flag
            setLoading(false);
          })
          .catch(() => {
            setLocation(null);
            setLoading(false);
          });
      })
      .catch(() => {
        setLocation(null);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex w-fit text-xs items-center space-x-2 p-2 text-gray-700 dark:text-gray-300">
      {loading || !location ? (
        <PublicIcon
          fontSize="inherit"
          className="text-blue-500 dark:text-blue-400"
        />
      ) : (
        <div className="flex items-center space-x-2">
          {countryCode && (
            <Flag
              code={countryCode.toLowerCase()}
              style={{ width: "24px", height: "18px" }}
              className="rounded-sm border"
              fallback={<span>🏳️</span>}
            />
          )}
          <span className="text-xs">
            <span className="text-gray-900 dark:text-gray-100">
              Your location: {location}
            </span>
          </span>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {!loading && !location && <p>Your location could not be determined.</p>}
    </div>
  );
}

export default LocationDisplay;
