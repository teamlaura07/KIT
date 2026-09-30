"""FastAPI router for Live NOAA MDMAP Marine Debris Feed (SIH 26057)."""

import os
import time
import logging
from typing import Any, Dict, List, Optional
import httpx
from fastapi import APIRouter, Query

logger = logging.getLogger("DebrisRoutes")

router = APIRouter(prefix="/debris", tags=["Live Marine Debris Feed"])

# In-memory cache store (6 hours TTL)
CACHE_TTL_SECONDS = 6 * 3600
_debris_cache: Optional[Dict[str, Any]] = None
_cache_timestamp: float = 0.0

# Static fallback debris dataset
STATIC_DEBRIS_FALLBACK = [
    {
        "id": "MDMAP-STAT-001",
        "type": "Plastic / Microplastics",
        "lat": 9.3182,
        "lon": 79.1951,
        "date": "2026-09-28",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-002",
        "type": "Submerged Derelict Fishing Net",
        "lat": 9.3245,
        "lon": 79.2085,
        "date": "2026-09-28",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-003",
        "type": "Submerged Metal Drum",
        "lat": 9.3105,
        "lon": 79.1762,
        "date": "2026-09-27",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-004",
        "type": "Polypropylene Rope Fragment",
        "lat": 9.2954,
        "lon": 79.1840,
        "date": "2026-09-27",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-005",
        "type": "Sunken Vessel Debris",
        "lat": 9.3310,
        "lon": 79.2150,
        "date": "2026-09-26",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-006",
        "type": "Styrofoam Container Debris",
        "lat": 9.2840,
        "lon": 79.1902,
        "date": "2026-09-25",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-007",
        "type": "Submerged Tire Cluster",
        "lat": 9.3420,
        "lon": 79.1620,
        "date": "2026-09-25",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-008",
        "type": "Ghost Fishing Trap",
        "lat": 9.3010,
        "lon": 79.2210,
        "date": "2026-09-24",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-009",
        "type": "Industrial Plastic Drum",
        "lat": 9.3290,
        "lon": 79.1810,
        "date": "2026-09-24",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-010",
        "type": "Submerged Cable Section",
        "lat": 9.3150,
        "lon": 79.2300,
        "date": "2026-09-23",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-011",
        "type": "Corroded Metal Piping",
        "lat": 13.0827,
        "lon": 80.2707,
        "date": "2026-09-22",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-012",
        "type": "Floating Polyethylene Film",
        "lat": 17.6868,
        "lon": 83.2185,
        "date": "2026-09-21",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-013",
        "type": "Microplastic Accumulation Zone",
        "lat": 18.9220,
        "lon": 72.8347,
        "date": "2026-09-20",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-014",
        "type": "Derelict Trawl Net",
        "lat": 6.9271,
        "lon": 79.8612,
        "date": "2026-09-19",
        "source": "NOAA MDMAP Survey"
    },
    {
        "id": "MDMAP-STAT-015",
        "type": "Discarded Synthetic Line",
        "lat": 1.3521,
        "lon": 103.8198,
        "date": "2026-09-18",
        "source": "NOAA MDMAP Survey"
    }
]


def _normalize_record(raw: Dict[str, Any], idx: int) -> Optional[Dict[str, Any]]:
    """Normalizes raw NOAA MDMAP record to: id, type, lat, lon, date, source."""
    try:
        # Extract lat/lon safely
        lat = raw.get("lat") or raw.get("latitude") or raw.get("lat_decimal")
        lon = raw.get("lon") or raw.get("longitude") or raw.get("lon_decimal") or raw.get("lng")
        
        if lat is None or lon is None:
            # Check GeoJSON geometry if present
            geom = raw.get("geometry")
            if isinstance(geom, dict) and geom.get("type") == "Point":
                coords = geom.get("coordinates")
                if isinstance(coords, (list, tuple)) and len(coords) >= 2:
                    lon, lat = coords[0], coords[1]
        
        if lat is None or lon is None:
            return None

        lat_val = float(lat)
        lon_val = float(lon)

        if not (-90.0 <= lat_val <= 90.0 and -180.0 <= lon_val <= 180.0):
            return None

        rec_id = str(raw.get("id") or raw.get("survey_id") or raw.get("objectid") or f"NOAA-MDMAP-{idx+1}")
        rec_type = str(raw.get("type") or raw.get("debris_type") or raw.get("material") or "Marine Debris")
        rec_date = str(raw.get("date") or raw.get("survey_date") or raw.get("created_at") or "2026-09-28")
        rec_source = str(raw.get("source") or "NOAA MDMAP API")

        return {
            "id": rec_id,
            "type": rec_type,
            "lat": lat_val,
            "lon": lon_val,
            "date": rec_date,
            "source": rec_source,
        }
    except Exception:
        return None


@router.get("/live", summary="Fetch live marine debris records from NOAA MDMAP API")
async def get_live_debris(
    force_fallback: bool = Query(False, description="Simulate API failure to return static fallback data"),
) -> Dict[str, Any]:
    """Fetches live marine debris survey records from NOAA MDMAP API with 6-hour caching, 500 points limit, and fallback."""
    global _debris_cache, _cache_timestamp

    now = time.time()

    # Handle force_fallback simulation flag for testing
    if force_fallback:
        logger.info("Force fallback requested — returning staticDebris fallback data.")
        return {
            "fallback": True,
            "count": len(STATIC_DEBRIS_FALLBACK),
            "data": STATIC_DEBRIS_FALLBACK,
        }

    # Return cached data if fresh (within 6 hours)
    if _debris_cache is not None and (now - _cache_timestamp) < CACHE_TTL_SECONDS:
        return _debris_cache

    mdmap_url = (os.getenv("MDMAP_API_URL") or "").strip()

    if not mdmap_url:
        logger.info("MDMAP_API_URL not configured — returning staticDebris fallback data.")
        fallback_res = {
            "fallback": True,
            "count": len(STATIC_DEBRIS_FALLBACK),
            "data": STATIC_DEBRIS_FALLBACK,
        }
        _debris_cache = fallback_res
        _cache_timestamp = now
        return fallback_res

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            resp = await client.get(mdmap_url)
            resp.raise_for_status()
            raw_data = resp.json()

        records_raw = []
        if isinstance(raw_data, list):
            records_raw = raw_data
        elif isinstance(raw_data, dict):
            records_raw = raw_data.get("features") or raw_data.get("surveys") or raw_data.get("data") or [raw_data]

        normalized_list = []
        for idx, item in enumerate(records_raw):
            if isinstance(item, dict):
                norm = _normalize_record(item, idx)
                if norm:
                    normalized_list.append(norm)

        # Limit to 500 points
        normalized_list = normalized_list[:500]

        if not normalized_list:
            logger.warning("NOAA MDMAP API returned 0 valid coordinate records — using staticDebris fallback.")
            res = {
                "fallback": True,
                "count": len(STATIC_DEBRIS_FALLBACK),
                "data": STATIC_DEBRIS_FALLBACK,
            }
        else:
            res = {
                "fallback": False,
                "count": len(normalized_list),
                "data": normalized_list,
            }

        _debris_cache = res
        _cache_timestamp = now
        return res

    except Exception as err:
        logger.warning(f"NOAA MDMAP API request failed or timed out: {err}. Using staticDebris fallback.")
        fallback_res = {
            "fallback": True,
            "count": len(STATIC_DEBRIS_FALLBACK),
            "data": STATIC_DEBRIS_FALLBACK,
        }
        return fallback_res
