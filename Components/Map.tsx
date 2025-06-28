'use client'

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
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
  const mapInstance = useRef<any>(null);
  const currentMarker = useRef<any>(null);

  useEffect(() => {
    // Only initialize Leaflet on client side
    if (typeof window === 'undefined') return;

    const initializeMap = async () => {

      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const iconRetinaUrl = (await import('leaflet/dist/images/marker-icon-2x.png')).default;
      const iconUrl = (await import('leaflet/dist/images/marker-icon.png')).default;
      const shadowUrl = (await import('leaflet/dist/images/marker-shadow.png')).default;

      // Override the default icon URLs
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl,
        iconUrl,
        shadowUrl
      });

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

        mapInstance.current.on('click', (e: any) => {
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
    };

    initializeMap();

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
