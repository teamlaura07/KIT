/**
 * AisContext.jsx - Global persistent AIS vessel state.
 *
 * Keeps the WebSocket connection and vessel data alive at the App root level
 * so navigating away from the map does NOT reset vessel data.
 */
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import {
  getAisStatus,
  getAisVessels,
  getAisTracks,
  getAisAlerts,
  connectAisWebSocket,
} from "../services/aisApi";

const AisContext = createContext(null);

export function AisProvider({ children }) {
  const [vesselsMap, setVesselsMap] = useState({});
  const [tracksMap, setTracksMap] = useState({});
  const [aisStatus, setAisStatus] = useState("CONNECTING");
  const [aisLastUpdate, setAisLastUpdate] = useState(null);
  const [activeAlerts, setActiveAlerts] = useState([]);

  const wsClientRef = useRef(null);
  const isMountedRef = useRef(true);

  const fetchInitialData = useCallback(async () => {
    try {
      const [statusData, vesselsData, tracksData, alertsData] = await Promise.all([
        getAisStatus().catch(() => null),
        getAisVessels().catch(() => []),
        getAisTracks().catch(() => ({})),
        getAisAlerts().catch(() => []),
      ]);
      if (!isMountedRef.current) return;
      if (statusData) {
        setAisStatus(statusData.status || "OFFLINE");
        setAisLastUpdate(statusData.last_update || new Date().toISOString());
      }
      if (Array.isArray(vesselsData) && vesselsData.length > 0) {
        setVesselsMap((prev) => {
          const next = { ...prev };
          vesselsData.forEach((v) => { if (v && v.mmsi) next[v.mmsi] = v; });
          const keys = Object.keys(next);
          if (keys.length > 500) {
            const trimmed = {};
            keys.slice(0, 500).forEach((k) => { trimmed[k] = next[k]; });
            return trimmed;
          }
          return next;
        });
      }
      if (tracksData && typeof tracksData === "object") {
        setTracksMap((prev) => ({ ...prev, ...tracksData }));
      }
      if (Array.isArray(alertsData)) {
        setActiveAlerts(alertsData);
      }
    } catch (err) {
      console.debug("[AisContext] Initial fetch error:", err);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    fetchInitialData();

    wsClientRef.current = connectAisWebSocket({
      onConnected: () => {
        if (!isMountedRef.current) return;
        setAisStatus("LIVE");
      },
      onInitialState: (payload) => {
        if (!isMountedRef.current) return;
        setAisStatus("LIVE");
        if (Array.isArray(payload && payload.vessels)) {
          const next = {};
          payload.vessels.forEach((v) => { if (v && v.mmsi) next[v.mmsi] = v; });
          setVesselsMap(next);
        }
        if (payload && payload.tracks) setTracksMap(payload.tracks);
        if (Array.isArray(payload && payload.alerts)) setActiveAlerts(payload.alerts);
      },
      onVesselUpdate: (vessel) => {
        if (!isMountedRef.current || !vessel || !vessel.mmsi) return;
        setVesselsMap((prev) => ({ ...prev, [vessel.mmsi]: vessel }));
        setAisLastUpdate(vessel.timestamp || new Date().toISOString());
        setTracksMap((prev) => {
          const existing = prev[vessel.mmsi] || [];
          const newPt = {
            latitude: vessel.latitude,
            longitude: vessel.longitude,
            timestamp: vessel.timestamp,
            speed_knots: vessel.speed_knots,
            course_deg: vessel.course_deg,
          };
          return { ...prev, [vessel.mmsi]: [...existing, newPt].slice(-120) };
        });
      },
      onStatusChange: (status) => {
        if (!isMountedRef.current) return;
        setAisStatus(status || "OFFLINE");
      },
      onProximityAlert: (alert) => {
        if (!isMountedRef.current || !alert) return;
        setActiveAlerts((prev) => {
          const filtered = prev.filter(
            (a) => !(a.vessel_mmsi === alert.vessel_mmsi && a.detection_id === alert.detection_id)
          );
          return [...filtered, alert];
        });
      },
      onProximityClear: (alertId) => {
        if (!isMountedRef.current || !alertId) return;
        setActiveAlerts((prev) =>
          prev.filter((a) => (a.vessel_mmsi + "_" + a.detection_id) !== alertId)
        );
      },
      onDisconnected: () => {
        if (!isMountedRef.current) return;
        setAisStatus("CONNECTING");
      },
    });

    const refreshInterval = setInterval(() => {
      if (isMountedRef.current) fetchInitialData();
    }, 30000);

    return () => {
      isMountedRef.current = false;
      clearInterval(refreshInterval);
      if (wsClientRef.current) {
        wsClientRef.current.disconnect();
        wsClientRef.current = null;
      }
    };
  }, [fetchInitialData]);

  const value = {
    vesselsMap,
    tracksMap,
    aisStatus,
    aisLastUpdate,
    activeAlerts,
    setActiveAlerts,
    vesselCount: Object.keys(vesselsMap).length,
  };

  return React.createElement(AisContext.Provider, { value }, children);
}

export function useAis() {
  const ctx = useContext(AisContext);
  if (!ctx) throw new Error("useAis must be used inside AisProvider");
  return ctx;
}
