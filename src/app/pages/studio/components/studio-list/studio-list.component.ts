import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {StudioCardComponent} from '../studio-card/studio-card.component';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {getDistanceFromLatLonInKm} from '../../../../../utils/utilities';
import {FormsModule} from '@angular/forms';
import {BookingModalComponent} from '../booking-modal/booking-modal.component';

@Component({
  selector: 'app-studio-list',
  imports: [CommonModule, StudioCardComponent, SearchBarComponent, FormsModule, BookingModalComponent],
  templateUrl: './studio-list.component.html',
  styleUrl: './studio-list.component.scss'
})
export class StudioListComponent {
  studios: any[] = [];
  filteredStudios: any[] = [];
  areaSuggestions: string[] = [];
  searchText = '';
  searching = false;
  errorMessage = '';
  radiusSearchActive = false;
  userLocation: { lat: number; lon: number } | null = null;
  selectedStudio: any = null;
  radiusOptions = [5, 10, 20, 50];
  selectedRadius = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('/api/Studios').subscribe(data => {
      this.studios = data;
      this.filteredStudios = data;
      this.areaSuggestions = this.getUniqueAreas(data);
    });
  }

  getUniqueAreas(data: any[]): string[] {
    const areas = data.map(s => s.Location.Area);
    return Array.from(new Set(areas)).sort();
  }

  onAreaSearchChange(text: string) {
    this.searchText = text.trim().toLowerCase();
    this.radiusSearchActive = false; // reset radius search when user types area
    this.errorMessage = '';
    this.applyFilters();
  }

  searchNearby() {
    this.errorMessage = '';
    this.searching = true;
    this.radiusSearchActive = true;

    if (!navigator.geolocation) {
      this.errorMessage = 'Geolocation is not supported by your browser.';
      this.searching = false;
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        this.userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        this.applyFilters();
        this.searching = false;
      },
      error => {
        this.errorMessage = this.getGeolocationErrorMessage(error);
        this.searching = false;
        this.radiusSearchActive = false;
      }
    );
  }

  resetFilters() {
    this.searchText = '';
    this.radiusSearchActive = false;
    this.userLocation = null;
    this.errorMessage = '';
    this.filteredStudios = [...this.studios];
  }

  applyFilters() {
    let filtered = [...this.studios];

    // Filter by area/city search text
    if (this.searchText) {
      filtered = filtered.filter(studio =>
        studio.Location.Area.toLowerCase().includes(this.searchText) ||
        studio.Location.City.toLowerCase().includes(this.searchText)
      );
    }

    // Filter by radius if active
    if (this.radiusSearchActive && this.userLocation !== null) {
      filtered = filtered.filter(studio => {
        const lat = studio.Location.Coordinates.Latitude;
        const lon = studio.Location.Coordinates.Longitude;
        const dist = getDistanceFromLatLonInKm(this.userLocation.lat, this.userLocation.lon, lat, lon);
        return dist <= this.selectedRadius;
      });
    }

    if (filtered.length === 0) {
      this.errorMessage = 'No studios found matching your criteria.';
    } else {
      this.errorMessage = '';
    }

    this.filteredStudios = filtered;
  }

  onBook(studio: any) {
    this.selectedStudio = studio;
  }

  getGeolocationErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Permission denied. Please allow location access.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'Location request timed out.';
      default:
        return 'An unknown error occurred while retrieving your location.';
    }
  }
}
