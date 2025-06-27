'use client'

import { useEffect, useRef } from 'react';

interface MapSizeProp {
    clickedLocation: [number, number],
    actualLocation: [number, number]
}

const ResultMap = ({clickedLocation, actualLocation}: MapSizeProp) => {

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const actualIcon = useRef<any>(null);

  // initialize map on mount
  useEffect(() => {
    // Only initialize Leaflet on client side
    if (typeof window === 'undefined') return;

    const initializeMap = async () => {
      // Dynamic import of Leaflet to prevent SSR issues
      const L = await import('leaflet');

      // Import CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Import final marker
      const finalMarker = (await import('../../public/FinalMarker.png')).default;

      actualIcon.current = L.icon({
        iconUrl: finalMarker.src,
        iconSize: [32, 44.9],
        iconAnchor: [16, 44.9],
        popupAnchor: [-3, -76]
      });

      if (mapContainer.current && !mapInstance.current) {
        mapInstance.current = L.map(mapContainer.current, {
          center: [13.3525, 74.7928] as [number, number],
          zoom: 15,
          zoomControl: false
        });
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);
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

  // add markers when coordinates become available
  useEffect(() => {
    if (!mapInstance.current) return;

    const addMarkers = async () => {
      const L = await import('leaflet');

      // clear existing markers
      mapInstance.current.eachLayer((layer: any) => {
        if (layer.getLatLng) {
          mapInstance.current!.removeLayer(layer);
        }
      });

      const Line = [actualLocation, clickedLocation];

      // clicked marker
      if (clickedLocation && clickedLocation[0] != null) {
        L.marker(clickedLocation).addTo(mapInstance.current);
      }

      // actual location marker
      if (actualLocation && actualLocation[0] != null && actualIcon.current) {
        L.marker(actualLocation, { icon: actualIcon.current }).addTo(mapInstance.current);
        L.polyline(Line, {color: 'red'}).addTo(mapInstance.current);
      }
    };

    addMarkers();
  }, [clickedLocation, actualLocation]);

  return <div ref={mapContainer} style={{ width: 1000, height: 500 }} className='transiton-all rounded-md'></div>

};

export default ResultMap;
