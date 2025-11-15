'use client'

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import finalMarker from '../../public/FinalMarker.png';

// Public asset URLs for Leaflet default marker icons
const ICON_RETINA_URL = '/marker-icon-2x.png';
const ICON_URL = '/marker-icon.png';
const SHADOW_URL = '/marker-shadow.png';

// Override the default icon URLs using public assets
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: ICON_RETINA_URL,
  iconUrl: ICON_URL,
  shadowUrl: SHADOW_URL
});


interface MapSizeProp {
    clickedLocation: [number, number],
    actualLocation: [number, number]
}

const ResultMap = ({clickedLocation, actualLocation}: MapSizeProp) => {

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  const actualIcon = L.icon({
        iconUrl: finalMarker.src,

        iconSize:     [32, 44.9], // size of the icon
        iconAnchor:   [16, 44.9], // centered bottom of the icon
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

  // initialize map on mount
  useEffect(() => {
    if (mapContainer.current && !mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current, {
        center: [13.3525, 74.7928] as [number, number],
        zoom: 15,
        zoomControl: false
      });
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);
    }
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
    // clear existing markers
    mapInstance.current.eachLayer(layer => {
      if ((layer as any).getLatLng) {
        mapInstance.current!.removeLayer(layer as any);
      }
    });
    const Line = [actualLocation, clickedLocation]
    // clicked marker
    if (clickedLocation && clickedLocation[0] != null) {
      L.marker(clickedLocation).addTo(mapInstance.current);
    }
    // actual location marker
    if (actualLocation && actualLocation[0] != null) {
      L.marker(actualLocation, { icon: actualIcon }).addTo(mapInstance.current);
      L.polyline(Line, {color: 'red'}).addTo(mapInstance.current);;
    }
  }, [clickedLocation, actualLocation]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: 'var(--map-width)',
        height: 'var(--map-height)'
      }}
      className='transition-all rounded-md [--map-width:300px] [--map-height:300px] sm:[--map-width:400px] sm:[--map-height:400px] md:[--map-width:1000px] md:[--map-height:500px]'
    ></div>
  );
};

export default ResultMap;