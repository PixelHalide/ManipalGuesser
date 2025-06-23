import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import finalMarker from './assets/FinalMarker.png';

interface MapSizeProp {
    clickedLocation: [number, number],
    actualLocation: [number, number]
}

const ResultMap = ({clickedLocation, actualLocation}: MapSizeProp) => {

  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

    const actualIcon = L.icon({
        iconUrl: finalMarker,

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
    // clicked marker
    if (clickedLocation && clickedLocation[0] != null) {
      L.marker(clickedLocation).addTo(mapInstance.current);
    }
    // actual location marker
    if (actualLocation && actualLocation[0] != null) {
      L.marker(actualLocation, { icon: actualIcon }).addTo(mapInstance.current);
    }
  }, [clickedLocation, actualLocation]);


  return <div ref={mapContainer} style={{ width: 1000, height: 500 }} className='transiton-all rounded-md'></div>

};

export default ResultMap;
