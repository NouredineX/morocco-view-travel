'use client';

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapCities, calculateDistance, estimateDays, estimatePrice } from '@/data/mapCities';
import type { MapCity } from '@/types';
import { Locale, getTranslations } from '@/utils/i18n';
import { getTranslated } from '@/utils/translate';

interface InteractiveMapClientProps {
  locale: Locale;
}

export default function InteractiveMapClient({ locale }: InteractiveMapClientProps) {
  const t = getTranslations(locale);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  const [selectedCities, setSelectedCities] = useState<MapCity[]>([]);

  // Toggle city in selected list
  const toggleCity = (cityId: string) => {
    const city = mapCities.find(c => c.id === cityId);
    if (!city) return;

    setSelectedCities(prev => {
      const exists = prev.some(c => c.id === cityId);
      if (exists) {
        return prev.filter(c => c.id !== cityId);
      } else {
        return [...prev, city];
      }
    });
  };

  const clearAll = () => {
    setSelectedCities([]);
  };

  // Re-draw path and markers when selectedCities state updates
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    // 1. Remove existing polyline if any
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    // 2. Draw polyline between selected cities in order
    if (selectedCities.length > 1) {
      const latlngs = selectedCities.map(c => [c.coords.lat, c.coords.lng] as [number, number]);
      polylineRef.current = L.polyline(latlngs, {
        color: 'var(--color-accent, #e8734a)',
        weight: 4,
        opacity: 0.8,
        dashArray: '8, 8',
        lineCap: 'round'
      }).addTo(map);

      // Fit map bounds to show the whole path
      map.fitBounds(polylineRef.current.getBounds(), { padding: [50, 50] });
    }

    // 3. Update marker styles (selected vs unselected)
    mapCities.forEach(city => {
      const marker = markersRef.current[city.id];
      if (marker) {
        const isSelected = selectedCities.some(c => c.id === city.id);
        
        // Re-create div icon with correct class name
        const markerHtmlClass = `custom-marker ${isSelected ? 'selected' : ''}`;
        const markerIcon = L.divIcon({
          className: markerHtmlClass,
          html: '',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });
        marker.setIcon(markerIcon);

        // Update popup HTML content to reflect correct button label
        const cityDesc = getTranslated(city, 'description', locale);
        const addLabel = t('map.addItinerary', 'Add to Itinerary');
        const removeLabel = t('map.removeItinerary', 'Remove City');
        const buttonLabel = isSelected ? removeLabel : addLabel;

        const popupContent = `
          <div style="font-family: inherit; font-size: 13px; min-width: 160px; padding: 4px;">
            <h4 style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: var(--color-primary);">${city.name}</h4>
            <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px; line-height: 1.4;">${cityDesc}</p>
            <button id="add-city-btn-${city.id}" class="btn btn-primary btn-sm" style="width: 100%; display: block; text-align: center; cursor: pointer; padding: 4px 8px; font-size: 11px; border-radius: 4px; border: none; font-weight: bold; background: var(--color-primary); color: var(--bg-dark);">
              ${buttonLabel}
            </button>
          </div>
        `;
        marker.setPopupContent(popupContent);
      }
    });

  }, [selectedCities, locale]);

  // Map Initialization
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Morocco central coordinates
    const moroccoCenter: [number, number] = [31.7917, -7.0926];
    const initialZoom = 6;

    const map = L.map(mapContainerRef.current, {
      center: moroccoCenter,
      zoom: initialZoom,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapRef.current = map;

    // OpenStreetMap dark / warm theme tiles
    const tileLayerUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

    L.tileLayer(tileLayerUrl, { attribution }).addTo(map);

    // Create markers for each city
    mapCities.forEach(city => {
      const markerHtmlClass = 'custom-marker';
      const markerIcon = L.divIcon({
        className: markerHtmlClass,
        html: '',
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const cityDesc = getTranslated(city, 'description', locale);
      const addLabel = t('map.addItinerary', 'Add to Itinerary');

      const popupContent = `
        <div style="font-family: inherit; font-size: 13px; min-width: 160px; padding: 4px;">
          <h4 style="font-weight: bold; font-size: 14px; margin-bottom: 4px; color: var(--color-primary);">${city.name}</h4>
          <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px; line-height: 1.4;">${cityDesc}</p>
          <button id="add-city-btn-${city.id}" class="btn btn-primary btn-sm" style="width: 100%; display: block; text-align: center; cursor: pointer; padding: 4px 8px; font-size: 11px; border-radius: 4px; border: none; font-weight: bold; background: var(--color-primary); color: var(--bg-dark);">
            ${addLabel}
          </button>
        </div>
      `;

      const marker = L.marker([city.coords.lat, city.coords.lng], { icon: markerIcon })
        .bindPopup(popupContent)
        .addTo(map);

      markersRef.current[city.id] = marker;
    });

    // Handle popup open listener to attach button click callback
    map.on('popupopen', (e) => {
      const container = e.popup.getElement();
      if (container) {
        const btn = container.querySelector('[id^="add-city-btn-"]') as HTMLButtonElement | null;
        if (btn) {
          btn.addEventListener('click', () => {
            const cityId = btn.id.replace('add-city-btn-', '');
            toggleCity(cityId);
            map.closePopup();
          });
        }
      }
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Summary Metrics calculations
  const totalDistance = calculateDistance(selectedCities.map(c => c.name));
  const totalDays = estimateDays(selectedCities.map(c => c.name));
  const estimatedCost = estimatePrice(selectedCities);

  const selectedCitiesNames = selectedCities.map(c => c.name).join(' -> ');
  const requestUrl = `/${locale}/contact?route=${encodeURIComponent(selectedCitiesNames)}`;

  return (
    <div className="map-container" id="custom-itinerary-map-container">
      {/* Map Element */}
      <div 
        ref={mapContainerRef} 
        style={{ height: '500px', width: '100%', zIndex: 1 }} 
        id="itinerary-map-canvas"
      />

      {/* Itinerary Summary Sidebar */}
      <div className="map-sidebar" id="itinerary-sidebar">
        <h3>{t('map.selectedCities', 'Selected Cities')}</h3>
        
        <div className="itinerary-list" id="itinerary-cities-list">
          {selectedCities.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6', paddingTop: '1rem' }}>
              {t('map.noCities', 'Click on a city marker to start building your itinerary')}
            </div>
          ) : (
            selectedCities.map((city, index) => (
              <div key={city.id} className="itinerary-item" id={`itinerary-item-${city.id}`}>
                <span className="city-number">{index + 1}</span>
                <span className="city-name">{city.name}</span>
                <button 
                  className="remove-btn" 
                  onClick={() => toggleCity(city.id)}
                  title={t('map.remove', 'Remove')}
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>

        {/* Calculations display */}
        {selectedCities.length > 0 && (
          <>
            <div className="itinerary-summary" id="itinerary-calculations-summary">
              <div className="summary-item">
                <span className="label">{t('map.distance', 'Distance')}</span>
                <span className="value">{totalDistance} km</span>
              </div>
              <div className="summary-item">
                <span className="label">{t('map.estimatedDays', 'Est. Days')}</span>
                <span className="value">{totalDays}</span>
              </div>
              <div className="summary-item">
                <span className="label">{t('map.estimatedPrice', 'Est. Price')}</span>
                <span className="value">{estimatedCost > 0 ? `€${estimatedCost}` : '—'}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }} id="map-action-buttons">
              <a 
                href={requestUrl}
                className="btn btn-primary"
                id="request-quote-btn"
                style={{ textDecoration: 'none', textAlign: 'center', width: '100%' }}
              >
                🗺️ {t('map.requestTour', 'Request This Custom Tour')}
              </a>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={clearAll}
                id="clear-itinerary-btn"
                style={{ width: '100%' }}
              >
                {t('map.clearAll', 'Clear All')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
