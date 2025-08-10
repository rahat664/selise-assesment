import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-booking-list',
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})
export class BookingListComponent {
  bookings: any[] = [];

  ngOnInit() {
    const bookingKey = 'studio_bookings';
    const storedBookings = JSON.parse(localStorage.getItem(bookingKey) || '[]');

    this.bookings = storedBookings.map(b => ({
      ...b,
      studioType: b.studioType || 'N/A',
      studioCity: b.studioCity || 'N/A',
      studioArea: b.studioArea || 'N/A'
    }));
  }
}
