# LockdIn - Academic Excellence Platform

A modern, responsive, standalone 1-on-1 tutoring web application built with semantic HTML5, modern CSS, and vanilla JavaScript with browser `localStorage` persistence.

---

## 🌟 Key Features

1. **Hero Section & Value Proposition**
   - Live session preview card with progress tracking visualization.
   - Trust metrics: 15,000+ hours taught, 98% grade improvement, 4.9/5 star average rating.
   - 100% Tutor Fit Guarantee notice.

2. **Interactive Subject Catalog & Category Filtering**
   - Dynamic subject directory covering Mathematics (AP Calculus, Algebra), Sciences (AP Chem, Physics), Coding & Tech (Python, Java), Humanities, and Test Prep (SAT/ACT).
   - Instant filter pills (Math, Science, Coding, English, Test Prep).

3. **Vetted Mentor & Tutor Directory**
   - Profiles with credentials (MIT, Stanford, Caltech, Harvard), hourly rates, ratings, and experience.
   - One-click "Match with Tutor" that auto-selects the mentor in the booking modal.

4. **Dynamic Tuition & Savings Calculator**
   - Real-time rate calculation based on student level (Elementary, High School, AP, SAT/College).
   - Weekly hours range slider (1 to 8 hours/wk).
   - Semester package toggle applying a 15% discount with live breakdown.

5. **Integrated Booking Engine (`localStorage`)**
   - Free 30-minute trial session reservation modal.
   - Data persists locally in the browser — no database or external backend server needed.
   - Built-in "My Bookings" drawer to view, manage, and cancel scheduled sessions.

6. **Tutor Application Form**
   - Dedicated modal for potential educators and top students to apply.

---

## 🚀 How to Run the Website

### Option 1: Double-Click (Direct in Browser)
Double-click `index.html` or open it with your favorite browser (Safari, Chrome, Firefox, Edge).

### Option 2: Local Python Server (Recommended for development)
From your terminal in this directory:
```bash
python3 -m http.server 3000
```
Then visit:
```
http://localhost:3000
```

---

## 📁 File Structure

- `index.html` - Semantic markup, accessible forms, modals, and drawers.
- `styles.css` - Custom CSS design system, typography, interactive slider styles, responsive media queries.
- `script.js` - Data stores, filtering logic, interactive calculator, and LocalStorage booking engine.
