# Studio Booking Application Documentation

## Overview

The **Studio Booking Application** is a modern, responsive Angular web app designed to help users search, browse, and book studios conveniently. It integrates a mock API with localStorage-based booking persistence, a smooth UI built with Tailwind CSS, and several user-friendly features including search by location and radius, booking management, and availability checking.

---

## Features

### 1. Studio List Page

- Displays a comprehensive list of studios available for booking.
- Each studio card shows key details:
  - Studio Name
  - Type (e.g., Recording Studio, Music Studio)
  - Location details (City, Area, Address)
  - Amenities list
  - Price per hour with currency
  - Rating (1-5 stars)
- Includes a “Book Now” button on each studio card to initiate the booking process.

### 2. Search Functionality

- **Search by Place (Area/City):**
  - A search bar with autocomplete functionality that dynamically filters studios as the user types.
  - Suggests location references to help quick selection.
- **Search by Radius:**
  - Users can search for studios within a selectable radius (5km, 10km, 20km, 50km) based on their current geolocation.
  - Handles permission denial and error states gracefully.
  - Displays informative messages when no studios are found within the radius.

### 3. Booking Modal and Availability

- Clicking “Book Now” opens a modal popup form collecting:
  - Date selection (Date picker)
  - Time slot selection (dynamically generated from studio’s open/close hours)
  - User information (Name and Email)
- Checks existing bookings in localStorage to prevent double bookings on the same time slot.
- Displays error messages for unavailable time slots.
- On successful booking:
  - Confirms booking details via success message.
  - Saves booking information (studio details, user info, date, time) in browser localStorage.

### 4. Booking List Page

- Displays all current bookings stored in localStorage.
- Shows:
  - User name and email
  - Studio type
  - Studio location (City, Area)
  - Date and time slot of booking
- Provides a clear, responsive list layout for easy review.

### 5. Responsive Navigation Bar

- Tailwind CSS styled navigation bar with links to Studio List and Booking List pages.
- Highlights active routes.
- Responsive and visually appealing.

---

## Technologies Used

- **Angular** with Standalone Components for modular, efficient architecture.
- **Tailwind CSS** for utility-first responsive styling.
- **Angular In-Memory Web API** to mock backend API with JSON data.
- **LocalStorage** to persist booking data on the client side.
- **Geolocation API** for radius-based searches using user’s current location.

---


## Description

- **src/app/pages/booking-list/**  
  Contains the booking list page related components and modules.

- **src/app/studio/components/**  
  Contains reusable components related to the studio feature, such as:
  - Amenities List
  - Booking Modal
  - Rating Stars
  - Search Bar
  - Studio Card
  - Studio List

- **src/app/studio/**  
  Contains the main studio feature files: the HTML template, styles, and TypeScript logic.

- **src/app/services/**  
  Contains service files, for example, a mock data service for simulating backend data.

- **assets/**  
  Contains static assets like images, fonts, icons, etc.

- **db.json**  
  A local JSON database file used for mock data or local development.

---

This structure helps keep the code modular, organized, and easy to navigate.




---

## How It Works — High Level

1. **Mock API** serves studios data from a local JSON file via Angular In-Memory Web API.
2. **Studio List Page** fetches and displays studios, allows searching by place or radius.
3. **Booking modal** collects user booking info and validates availability.
4. **Bookings stored in localStorage** for persistence.
5. **Booking List Page** reads bookings from localStorage and displays them.
6. Responsive navigation allows smooth navigation between pages.

---

## Next Steps / Possible Enhancements

- Add backend API integration for real data persistence.
- Implement user authentication for personalized bookings.
- Add booking cancellation and modification features.
- Improve time slot granularity (e.g., 30 minutes intervals).
- Add email notifications or confirmations.
- Mobile-friendly hamburger menu and UI optimizations.

---

## Live Demo

You can try the live version here:  
[Studio Booking App](https://studio-boooking-bpjktfqxi-rahat-kabirs-projects.vercel.app/studios)

---

## Contact

For any questions or contributions, feel free to reach out to Rahat Kabir.

