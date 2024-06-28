import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

const containerStyle = {
  width: "90vw",
  height: "90dvh",
};

const center = {
  lat: 35.681236,
  lng: 139.767125,
};

function RouteMap({ start, waypoints, end }) {
  const [response, setResponse] = useState(null);

  const directionsCallback = (res) => {
    if (res !== null) {
      if (res.status === "OK") {
        console.log("Directions response:", res);
        setResponse(res);
      } else {
        console.log("Directions response error:", res);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCqqAzIviWTneECxKmdfFv1BGF-O5Uosgs">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={start || center}
        zoom={14}
      >
        {start && end && (
          <DirectionsService
            options={{
              origin: start,
              destination: end,
              travelMode: "WALKING",
              waypoints: waypoints,
              optimizeWaypoints: true,
            }}
            callback={directionsCallback}
          />
        )}
        {response && (
          <DirectionsRenderer
            options={{
              directions: response,
              polylineOptions: {
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 6,
              },
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default RouteMap;
