import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css"; // Import the Leaflet CSS here
import SideBar from "./SideBar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useDetails } from "../contexts/UserContext";

function Map() {
  const { places: cities } = useDetails();
  const [position, setPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { isLoading, position: geoPosition, getPosition } = useGeolocation();
  useEffect(() => {
    if (!lat && !lng) return;
    setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition) {
      setPosition([geoPosition.lat, geoPosition.lng]);
    }
  }, [geoPosition]);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="relative w-full h-full">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cities.map((item) =>
            item.position?.lat && item.position?.lng ? (
              <Marker
                position={[item.position.lat, item.position.lng]}
                key={item._id}
              >
                <Popup>
                  {item.cityName} <br /> {item.country}
                </Popup>
              </Marker>
            ) : null
          )}

          <ChangeCenter pos={position} />
          <DetectClick />
        </MapContainer>

        {/* Button positioned over the map */}
        <UseGeolocationButton
          isLoading={isLoading}
          getPosition={getPosition}
          geoPosition={geoPosition}
        />
      </div>
    </div>
  );
}

// Separate button component for visibility control
function UseGeolocationButton({ getPosition, isLoading, geoPosition }) {
  // Use state to track button visibility
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide the button if geoPosition is available
    if (geoPosition) {
      setVisible(false);
    }
  }, [geoPosition]);

  return (
    <>
      {visible && (
        <button
          onClick={getPosition}
          className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-green-200 px-4 py-2 rounded shadow-lg`}
          style={{ zIndex: 1000 }} // Ensure button is on top
        >
          {isLoading ? "Loading..." : "Use Current Position"}
        </button>
      )}
    </>
  );
}

function ChangeCenter({ pos }) {
  const map = useMap();
  map.setView(pos);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
