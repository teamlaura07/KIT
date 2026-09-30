/**
 * API Client for SIH26057 Sonar Detection Pipeline.
 */

const RAW_API_BASE = import.meta.env.VITE_API_URL || '';
const API_BASE = RAW_API_BASE ? `${RAW_API_BASE.replace(/\/+$/, '')}/api` : '/api';

export async function getHealth() {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error(`Health check failed: ${res.statusText}`);
  return res.json();
}

export async function getConfig() {
  const res = await fetch(`${API_BASE}/config`);
  if (!res.ok) throw new Error(`Config fetch failed: ${res.statusText}`);
  return res.json();
}

export async function detectSonarImage(
  file,
  {
    confidenceThreshold = 0.20,
    iouThreshold = 0.45,
    enablePreprocessing = true,
    navFile = null,
    swathRangeM = 50.0,
    slantCorrected = true,
    startLat = null,
    startLon = null,
    endLat = null,
    endLon = null,
    altitude = 0.0,
  } = {}
) {
  const formData = new FormData();
  formData.append('file', file);
  if (navFile) {
    formData.append('nav_file', navFile);
  }

  const params = new URLSearchParams({
    confidence_threshold: confidenceThreshold,
    iou_threshold: iouThreshold,
    enable_preprocessing: enablePreprocessing,
    swath_range_m: swathRangeM,
    slant_corrected: slantCorrected,
  });

  if (startLat !== null && startLat !== undefined && startLat !== '') params.append('start_lat', startLat);
  if (startLon !== null && startLon !== undefined && startLon !== '') params.append('start_lon', startLon);
  if (endLat !== null && endLat !== undefined && endLat !== '') params.append('end_lat', endLat);
  if (endLon !== null && endLon !== undefined && endLon !== '') params.append('end_lon', endLon);
  if (altitude !== null && altitude !== undefined && altitude !== '') params.append('altitude', altitude);

  const url = `${API_BASE}/detect?${params.toString()}`;
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Detection failed with HTTP ${res.status}`);
  }

  return res.json();
}

export async function downloadReport(scanId, format = 'json') {
  const url = `${API_BASE}/scans/${scanId}/report?format=${format}`;
  const res = await fetch(url);
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Report download failed: HTTP ${res.status}`);
  }

  // Parse filename from Content-Disposition header if available
  let filename = `report_${scanId}.${format}`;
  const disposition = res.headers.get('content-disposition');
  if (disposition) {
    const filenameMatch = disposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
    if (filenameMatch && filenameMatch[1]) {
      filename = filenameMatch[1].replace(/['"]/g, '').trim();
    }
  }

  const blob = await res.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(downloadUrl);
}

export const downloadScanReport = downloadReport;

export async function getDetections(imageId) {
  const res = await fetch(`${API_BASE}/detections/${imageId}`);
  if (!res.ok) throw new Error(`Failed to load detections for ${imageId}`);
  return res.json();
}

export async function getImageDetails(imageId) {
  const res = await fetch(`${API_BASE}/images/${imageId}`);
  if (!res.ok) throw new Error(`Failed to load image details for ${imageId}`);
  return res.json();
}

export async function getSamplesList() {
  const res = await fetch(`${API_BASE}/samples`);
  if (!res.ok) return [];
  return res.json();
}

export async function fetchSampleAsFile(filename) {
  const res = await fetch(`${API_BASE}/samples/${filename}`);
  if (!res.ok) throw new Error(`Failed to download sample file: ${filename}`);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || 'image/jpeg' });
}

export async function enrichGeospatial(detectionResult, { latitude = 9.3142, longitude = 79.1821, depth = 28.0 } = {}) {
  const url = `${API_BASE}/geospatial/enrich?latitude=${latitude}&longitude=${longitude}&depth=${depth}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(detectionResult),
  });
  if (!res.ok) throw new Error(`Geospatial enrichment failed: ${res.statusText}`);
  return res.json();
}

export async function getGeospatialForImage(imageId, { latitude = 9.3142, longitude = 79.1821, depth = 28.0 } = {}) {
  const url = `${API_BASE}/geospatial/${imageId}?latitude=${latitude}&longitude=${longitude}&depth=${depth}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch geospatial data for ${imageId}`);
  return res.json();
}

export async function getFleetGeospatial() {
  const res = await fetch(`${API_BASE}/geospatial/all/fleet`);
  if (!res.ok) throw new Error('Failed to fetch fleet geospatial data');
  return res.json();
}

export async function getGeospatialConfig() {
  const res = await fetch(`${API_BASE}/geospatial/config/parameters`);
  if (!res.ok) throw new Error('Failed to fetch geospatial configuration');
  return res.json();
}

