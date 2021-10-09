import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax



export default function Map() {


    mapboxgl.accessToken="pk.eyJ1IjoiYW5uYW1hcCIsImEiOiJja3VrMm0xbTEzMzljMnpvMTM4NjEzcG96In0.QQMXVIA49csnWCX3KHHx_Q"
    const mapContainer = useRef(null);
        const map = useRef(null);
        const [lng, setLng] = useState(-79.4207);
        const [lat,setLat] = useState(8.9954);
        const [zoom, setZoom] = useState(4.87)

    useEffect(() => {
        if (map.current) return; //initialize map just once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/annamap/ckst2kwvk3qv518nv44v624fv',
            center:[lng,lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
        });
        });


    return (
        <div>
            <div className="map-sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={ mapContainer } className="map-container" />
        </div>
    );
};
