"""FastAPI API Endpoints for Copernicus Marine Service Integration."""

from typing import Any, Dict, Optional
from fastapi import APIRouter, Depends, Body
from backend.services.copernicus_service import CopernicusService, get_copernicus_service

router = APIRouter(prefix="/copernicus", tags=["Copernicus Marine Service"])


@router.get("/status", summary="Get Copernicus Marine SDK login status")
async def get_copernicus_status(
    service: CopernicusService = Depends(get_copernicus_service),
) -> Dict[str, Any]:
    """Returns Copernicus Marine SDK authentication health and region coverage."""
    return service.get_status()


@router.post("/login", summary="Trigger copernicusmarine.login() with credentials")
async def login_copernicus_endpoint(
    payload: Dict[str, Any] = Body(...),
    service: CopernicusService = Depends(get_copernicus_service),
) -> Dict[str, Any]:
    """Triggers copernicusmarine.login() non-interactively."""
    user = payload.get("username")
    pwd = payload.get("password")
    success = service.login(username=user, password=pwd)
    return {
        "status": "success" if success else "credentials_saved_or_pending",
        "is_logged_in": success,
        "message": "copernicusmarine.login() completed successfully" if success else "Copernicus login credentials registered",
    }
