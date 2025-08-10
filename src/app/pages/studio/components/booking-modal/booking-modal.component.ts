import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {timer} from 'rxjs';

@Component({
  selector: 'app-booking-modal',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.scss'
})
export class BookingModalComponent {
  @Input() studio: any | null = null;
  @Output() close = new EventEmitter<void>();

  bookingDate: string = '';
  bookingTimeSlot: string = '';
  userName: string = '';
  userEmail: string = '';
  errorMessage = '';
  successMessage = '';

  minDate = new Date().toISOString().split('T')[0]; // today's date in YYYY-MM-DD

  get availableTimeSlots(): string[] {
    if (!this.studio) return [];
    const openHour = parseInt(this.studio.Availability.Open.split(':')[0], 10);
    const closeHour = parseInt(this.studio.Availability.Close.split(':')[0], 10);

    // Example: generate 1-hour slots between open and close (like "09:00 - 10:00")
    const slots = [];
    for (let hour = openHour; hour < closeHour; hour++) {
      const start = hour.toString().padStart(2, '0') + ':00';
      const end = (hour + 1).toString().padStart(2, '0') + ':00';
      slots.push(`${start} - ${end}`);
    }
    return slots;
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.bookingDate || !this.bookingTimeSlot || !this.userName || !this.userEmail) {
      this.errorMessage = 'Please fill all fields.';
      return;
    }

    const bookingKey = 'studio_bookings';

    // Load existing bookings from localStorage
    const bookings: any[] = JSON.parse(localStorage.getItem(bookingKey) || '[]');

    // Check if the studio, date, and time slot is already booked
    const isBooked = bookings.some(b =>
      b.studioId === this.studio.Id &&
      b.date === this.bookingDate &&
      b.timeSlot === this.bookingTimeSlot
    );

    if (isBooked) {
      this.errorMessage = 'The selected time slot is not available. Please choose another time.';
      return;
    }

    // Save booking
    bookings.push({
      studioId: this.studio.Id,
      studioName: this.studio.Name,
      studioType: this.studio.Type,       // add this
      studioCity: this.studio.Location.City,  // add this
      studioArea: this.studio.Location.Area,  // add this
      date: this.bookingDate,
      timeSlot: this.bookingTimeSlot,
      userName: this.userName,
      userEmail: this.userEmail,
    });

    localStorage.setItem(bookingKey, JSON.stringify(bookings));

    this.successMessage = `Booking confirmed for ${this.bookingDate} at ${this.bookingTimeSlot}. Thank you, ${this.userName}!`;

    // Optionally reset form or close modal after success
    this.bookingDate = '';
    this.bookingTimeSlot = '';
    this.userName = '';
    this.userEmail = '';
    // Emit close event to parent component
    timer(2000).subscribe(() => {
      this.close.emit();
    })
  }
}
