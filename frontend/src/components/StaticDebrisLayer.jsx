/**
 * StaticDebrisLayer.jsx — Live NOAA MDMAP Marine Debris Overlay & Badge Component (SIH 26057).
 * 
 * Fetches live debris records from /api/debris/live on mount.
 * Renders circle markers on the Leaflet map instance and displays a small badge:
 * - "Live: NOAA MDMAP" when live data loads successfully.
 * - "Sample data" when the static fallback dataset is used.
 */

import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import staticDebris from '../data/staticDebris';

export function StaticDebrisLayer({ map, visible = true, forceFallback = false }) {
  const [debrisData, setDebrisData] = useState([]);
  const [isFallback, setIsFallback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const layerGroupRef = useRef(null);

  // 1. Fetch /api/debris/live on component load
  useEffect(() => {
    let isMounted = true;

    const fetchDebris = async () => {
      setLoading(true);
      try {
        const url = forceFallback ? '/api/debris/live?force_fallback=true' : '/api/debris/live';
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json = await res.json();
        
        if (!isMounted) return;

        if (json && Array.isArray(json.data) && json.data.length > 0) {
          setDebrisData(json.data);
          setIsFallback(Boolean(json.fallback));
        } else {
          // Empty or invalid -> use local staticDebris
          setDebrisData(staticDebris);
          setIsFallback(true);
        }
        setError(null);
      } catch (err) {
        console.warn('Failed to fetch /api/debris/live, using staticDebris fallback:', err);
        if (!isMounted) return;
        setDebrisData(staticDebris);
        setIsFallback(true);
        setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDebris();

    return () => {
      isMounted = false;
    };
  }, [forceFallback]);

  // 2. Render Circle Markers on Leaflet Map instance
  useEffect(() => {
    if (!map) return;

    if (!layerGroupRef.current) {
      layerGroupRef.current = L.featureGroup().addTo(map);
    }

    const group = layerGroupRef.current;
    group.clearLayers();

    if (!visible || debrisData.length === 0) return;

    debrisData.forEach((d) => {
      if (typeof d.lat !== 'number' || typeof d.lon !== 'number') return;

      const isLive = !isFallback;
      const strokeColor = isLive ? '#38bdf8' : '#fb923c';
      const fillColor = isLive ? '#0284c7' : '#ea580c';

      const circle = L.circleMarker([d.lat, d.lon], {
        radius: 6,
        color: strokeColor,
        weight: 1.5,
        fillColor: fillColor,
        fillOpacity: 0.8,
      });

      const popupHtml = `
        <div class="p-2 font-mono text-xs text-slate-200 min-w-[200px] space-y-1">
          <div class="flex items-center justify-between border-b border-ocean-800 pb-1">
            <strong class="text-cyan-300 font-bold">${d.type || 'Marine Debris'}</strong>
            <span class="text-[9px] px-1.5 py-0.5 rounded font-bold ${isLive ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}">
              ${isLive ? 'NOAA MDMAP' : 'STATIC FALLBACK'}
            </span>
          </div>
          <div class="text-[10px] text-slate-300 space-y-0.5">
            <div><span class="text-slate-400">ID:</span> ${d.id}</div>
            <div><span class="text-slate-400">Coordinates:</span> ${d.lat.toFixed(4)}°N, ${d.lon.toFixed(4)}°E</div>
            <div><span class="text-slate-400">Recorded Date:</span> ${d.date || 'N/A'}</div>
            <div><span class="text-slate-400">Data Source:</span> ${d.source || 'NOAA MDMAP'}</div>
          </div>
        </div>
      `;

      circle.bindPopup(popupHtml);
      circle.addTo(group);
    });

  }, [map, visible, debrisData, isFallback]);

  // Clean up layer group on unmount
  useEffect(() => {
    return () => {
      if (layerGroupRef.current && map) {
        map.removeLayer(layerGroupRef.current);
        layerGroupRef.current = null;
      }
    };
  }, [map]);

  // 3. Render Badge UI
  if (!visible) return null;

  return (
    <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold shadow-md transition-all select-none border">
      {isFallback ? (
        <span className="flex items-center space-x-1.5 bg-amber-950/80 text-amber-300 border border-amber-600/60 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Sample data</span>
        </span>
      ) : (
        <span className="flex items-center space-x-1.5 bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 px-2 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Live: NOAA MDMAP</span>
        </span>
      )}
    </div>
  );
}

export default StaticDebrisLayer;
