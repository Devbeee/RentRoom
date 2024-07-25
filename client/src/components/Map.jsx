import React, { memo, useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import icons from "../utils/icons";
const Position = ({ icon }) => (
  <div className="flex items-center gap-1 flex-col">
    <span>{icon}</span>
  </div>
);
const { HiLocationMarker } = icons;
const Map = ({ address }) => {
  const [coords, setCoords] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { longitude, latitude } }) => {
        setCoords({
          lat: latitude,
          lng: longitude,
        });
      }
    );
    // const getCoords = async () => {
    //   const results = await geocodeByAddress(posts[0]?.address);
    //   const latLng = await getLatLng(results[0]);
    //   setCoords(latLng);
    // };
  }, [address]);
  return (
    <div className="h-[300px] w-full relative">
      {address && (
        <div className="absolute top-[8px] left-[8px] z-10 max-w-[200px] bg-white shadow-md p-4 text-xs rounded-md">
          {address}
        </div>
      )}

      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={coords}
        defaultZoom={11}
        center={coords}
      >
        <Position
          lat={coords?.lat}
          lng={coords?.lng}
          icon={<HiLocationMarker color="red" size={24} />}
        />
      </GoogleMapReact>
    </div>
  );
};

export default memo(Map);
