import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {timer} from 'rxjs';

@Component({
  selector: 'app-booking-modal',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './booking-modal.component.html',
  styleUrl: './booking-modal.component.scss'
})
export class BookingModalComponent {
  @Input() studio: any | null = null;
  @Output() close = new EventEmitter<void>();

  bookingForm!: FormGroup;
  errorMessage = '';
  successMessage = '';
  minDate = new Date().toISOString().split('T')[0]; // today's date

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.bookingForm = this.fb.group({
      bookingDate: ['', Validators.required],
      bookingTimeSlot: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
    });
  }

  get availableTimeSlots(): string[] {
    if (!this.studio) return [];
    const openHour = parseInt(this.studio.Availability.Open.split(':')[0], 10);
    const closeHour = parseInt(this.studio.Availability.Close.split(':')[0], 10);
    const slots: string[] = [];
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

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched()
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const bookingData = this.bookingForm.value;
    const bookingKey = 'studio_bookings';
    const bookings: any[] = JSON.parse(localStorage.getItem(bookingKey) || '[]');

    const isBooked = bookings.some(
      b =>
        b.studioId === this.studio.Id &&
        b.date === bookingData.bookingDate &&
        b.timeSlot === bookingData.bookingTimeSlot
    );

    if (isBooked) {
      this.errorMessage = 'The selected time slot is not available. Please choose another time.';
      return;
    }

    bookings.push({
      studioId: this.studio.Id,
      studioName: this.studio.Name,
      studioType: this.studio.Type,
      studioCity: this.studio.Location.City,
      studioArea: this.studio.Location.Area,
      date: bookingData.bookingDate,
      timeSlot: bookingData.bookingTimeSlot,
      userName: bookingData.userName,
      userEmail: bookingData.userEmail,
    });

    localStorage.setItem(bookingKey, JSON.stringify(bookings));
    this.successMessage = `Booking confirmed for ${bookingData.bookingDate} at ${bookingData.bookingTimeSlot}. Thank you, ${bookingData.userName}!`;

    this.bookingForm.reset();
    timer(2000).subscribe(() => this.close.emit());
  }
}
