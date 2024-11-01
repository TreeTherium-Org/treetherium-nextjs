import { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const LocationPicker = ({ onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [locationSet, setLocationSet] = useState(false); // Track if location is set

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const currentPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setMarkerPosition(currentPosition);
            onLocationChange(`${currentPosition.lat}, ${currentPosition.lng}`);
            setLocationSet(true); // Mark location as set
          },
          (error) => {
            console.error("Error getting location:", error);
            const defaultPosition = { lat: -3.745, lng: -38.523 };
            setMarkerPosition(defaultPosition);
            onLocationChange(`${defaultPosition.lat}, ${defaultPosition.lng}`);
            setLocationSet(true); // Mark location as set
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        const defaultPosition = { lat: -3.745, lng: -38.523 };
        setMarkerPosition(defaultPosition);
        onLocationChange(`${defaultPosition.lat}, ${defaultPosition.lng}`);
        setLocationSet(true); // Mark location as set
      }
    };

    if (!locationSet) { // Only get location if it hasn't been set
      getCurrentLocation();
    }
  }, [onLocationChange, locationSet]);

  const handleMapClick = useCallback((event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarkerPosition(newPosition);
    onLocationChange(`${newPosition.lat}, ${newPosition.lng}`);
  }, [onLocationChange]);

  const handlePlaceSelect = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const newPosition = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        console.log("Selected Place:", place);
        console.log("New Position:", newPosition);
        setMarkerPosition(newPosition);
        onLocationChange(`${newPosition.lat}, ${newPosition.lng}`);
        setSearchValue(place.formatted_address);
      } else {
        console.error("No geometry found for the selected place");
      }
    }
  }, [autocomplete, onLocationChange]);

  if (!markerPosition) {
    return <div>Loading...</div>;
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyCIV9YVytAARkQZ1mLhzaauyJZqRC3anhc" libraries={['places']}>
      <Autocomplete
        onLoad={(autocomplete) => setAutocomplete(autocomplete)}
        onPlaceChanged={handlePlaceSelect}
      >
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for a location"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </Autocomplete>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={markerPosition}
        zoom={10}
        onClick={handleMapClick}
      >
        <Marker position={markerPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LocationPicker;
