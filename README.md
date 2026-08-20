# StayFinder 🏡

StayFinder is a full-stack Airbnb-style property listing and booking platform built with Node.js, Express, MongoDB, and EJS. Users can browse, search, and filter property listings, view them on an interactive map, leave reviews, and manage their own listings with full authentication and authorization.

**Live Demo:** [https://stayfinder-r19e.onrender.com](https://stayfinder-r19e.onrender.com)

---

## Features

- **User Authentication & Authorization**
  - Signup, login, logout with Passport.js (Local Strategy)
  - Secure password hashing via `passport-local-mongoose`
  - Session persistence using MongoDB session store
  - Owner-only access to edit/delete listings
  - Author-only access to delete reviews

- **Listings (CRUD)**
  - Create, view, update, and delete property listings
  - Image upload to Cloudinary
  - Category-based listings (Trending, Rooms, Mountains, Castles, etc.)

- **Reviews**
  - Add and delete reviews with star ratings
  - Reviews linked to authenticated users

- **Search & Filters**
  - Search listings by title, location, or country
  - Filter listings by category with a dedicated filter bar

- **Maps & Geocoding**
  - Interactive maps powered by Mapbox
  - Automatic geocoding of listing locations into coordinates

- **Other**
  - Flash messages for user feedback
  - Responsive UI with Bootstrap 5
  - Custom error handling middleware

---

## Tech Stack

**Backend:** Node.js, Express.js
**Database:** MongoDB (MongoDB Atlas), Mongoose
**Templating:** EJS, EJS-Mate
**Authentication:** Passport.js, passport-local-mongoose
**File Storage:** Cloudinary, Multer
**Maps:** Mapbox
**Session Store:** connect-mongo
**Deployment:** Render

---

## Project Structure

```
STAYFINDER/
├── controllers/       # Route handler logic (MVC controllers)
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── models/             # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── routes/             # Express route definitions
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── public/              # Static assets (CSS, JS)
├── init/                # Database seeding scripts
├── utils/               # Helper utilities (error handling, async wrapper)
├── middleware.js         # Auth & validation middleware
├── schema.js              # Joi validation schemas
├── cloudConfig.js          # Cloudinary configuration
├── app.js                   # Application entry point
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account
- Mapbox account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/jpdubeycode/stayfinder.git
   cd stayfinder
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   MAP_TOKEN=your_mapbox_access_token
   ATLASDB_URL=your_mongodb_atlas_connection_string
   SECRET=your_session_secret
   ```

4. Seed the database (optional)
   ```bash
   node init/index.js
   ```

5. Start the development server
   ```bash
   npm start
   ```

6. Visit `http://localhost:8080` in your browser

---

## Environment Variables

| Variable | Description |
|---|---|
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox access token |
| `ATLASDB_URL` | MongoDB Atlas connection string |
| `SECRET` | Secret key for session/cookie signing |

---



## Future Improvements

- Booking/reservation system
- Payment gateway integration
- Wishlist/favorites feature
- Advanced filtering (price range, amenities)
- User profile pages

---

## Author

**Jai Prakash Dubey**
GitHub: [@jpdubeycode](https://github.com/jpdubeycode)

---

## License

This project is licensed under the ISC License.
