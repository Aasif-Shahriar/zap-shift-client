// src/pages/CoveragePage.jsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import coverageData from '../../../public/data/warehouses.json';

// Fix Leaflet's missing icon issue
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';

const defaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const CoveragePage = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        We are available in 64 districts
      </h1>

      {/* Search bar placeholder */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
        />
      </div>

      {/* Leaflet Map */}
      <div className="h-[600px] rounded shadow overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]} // Center of Bangladesh
          zoom={7}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {coverageData.map((location, idx) => (
            <Marker
              key={idx}
              position={[location.latitude, location.longitude]}
            >
              <Popup>
                <div className="text-sm">
                  <h3 className="font-bold">{location.district}</h3>
                  <p><strong>Region:</strong> {location.region}</p>
                  <p><strong>City:</strong> {location.city}</p>
                  <p><strong>Covered Areas:</strong></p>
                  <ul className="list-disc list-inside">
                    {location.covered_area.map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                  </ul>
                  <a
                    href={location.flowchart}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-2 inline-block"
                  >
                    View Flowchart
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default CoveragePage;
