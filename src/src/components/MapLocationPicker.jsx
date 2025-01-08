import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // Import necessary Leaflet components
import L from "leaflet"; // To manage the map
import "./MapLocationPicker.css"; // Your CSS for the map (optional)

const fetchLocationDetails = async (latitude, longitude) => {
  const apiKey = "AIzaSyAc82NTynLf5MNQ7QaePjkq1_ipi-YqK_I"; // Replace with your API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === "OK") {
    const addressComponents = data.results[0].address_components;
    let city = "";
    let state = "";

    // Loop through the address components and find the city and state
    addressComponents.forEach((component) => {
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }
    });

    return { city, state };
  } else {
    throw new Error("Unable to fetch location details.");
  }
};

const MapLocationPicker = ({ location, setLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    if (selectedLocation) {
      fetchLocationDetails(selectedLocation.lat, selectedLocation.lng)
        .then((locationDetails) => {
          setCity(locationDetails.city);
          setState(locationDetails.state);
        })
        .catch((error) => {
          console.error("Error fetching location details:", error);
        });
    }
  }, [selectedLocation]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation); // Update parent component's location state
    setSelectedLocation(newLocation);
  };

  return (
    <div className="map-location-picker">
      <div className="map-container">
        <MapContainer
          center={selectedLocation ? [selectedLocation.lat, selectedLocation.lng] : [0, 0]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "300px", width: "100%" }}
          onClick={(e) => handleLocationChange(e.latlng)} // Update location on map click
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
              <Popup>
                <strong>Selected Location</strong>
                <br />
                Latitude: {selectedLocation.lat}
                <br />
                Longitude: {selectedLocation.lng}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="location-details">
        {city && state ? (
          <p>
            <strong>City:</strong> {city}, <strong>State:</strong> {state}
          </p>
        ) : (
          <p>Location details are not available yet.</p>
        )}
      </div>
    </div>
  );
};

export default MapLocationPicker;
