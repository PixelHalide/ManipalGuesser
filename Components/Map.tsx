'use client'

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// ← override the default icon URLs
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl
});

interface MapSizeProp {
    height : number,
    width : number
    setCords: (coords: [number, number]) => void
}

const Map = ({height, width, setCords} : MapSizeProp) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const currentMarker = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      const mapOptions = {
        center: [13.3525, 74.7928] as [number, number],
        zoom: 15,
        zoomControl: false
      };

      mapInstance.current = L.map(mapContainer.current, mapOptions);

      const layer = new L.TileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      );
      mapInstance.current.addLayer(layer);

      mapInstance.current.on('click', (e) => {
        // Remove existing marker if it exists
        if (currentMarker.current) {
          currentMarker.current.removeFrom(mapInstance.current!);
        }

        const marker = L.marker([e.latlng.lat, e.latlng.lng]);
        marker.addTo(mapInstance.current!);

        currentMarker.current = marker;
        setCords([e.latlng.lat, e.latlng.lng]);
      });
  }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.invalidateSize();
    }
  }, [height, width]);

  return <div ref={mapContainer} style={{height, width}} className='transiton-all rounded-md'></div>

};

export default Map;
