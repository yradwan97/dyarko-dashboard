import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { t } from "i18next";

const Map = ({
  latitude,
  longitude,
  onSelect,
  isDraggable = false,
  widthClassname
}: {
  latitude: any;
  longitude: any;
  onSelect?: ({ lat, lng }: { lat: any; lng: any }) => void;
  isDraggable: boolean
  widthClassname?: string
}) => {
  const [selectedPosition, setSelectedPosition] = useState({
    lat: latitude,
    lng: longitude,
  });
  const mapStyles = {
    height: "300px",
    width: "100%",
  };

  const defaultCenter = {
    lat: latitude,
    lng: longitude,
  };

  const handleMarkerDragEnd = (event: any) => {
    const { latLng } = event;
    const lat = latLng.lat().toFixed(5);
    const lng = latLng.lng().toFixed(5);
    setSelectedPosition({ lat, lng });
    onSelect && onSelect({ lat, lng });
  };

  useEffect(() => {
    setSelectedPosition({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  return (
    <div className={`${widthClassname || "w-full"}`}>
      {isDraggable && <p className="mb-2">{t("map.select-location")}</p>}
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}
        >
          <Marker
            position={selectedPosition}
            draggable={isDraggable}
            onDragEnd={handleMarkerDragEnd}
          />
        </GoogleMap>
    </div>
  );
};

export default Map;
