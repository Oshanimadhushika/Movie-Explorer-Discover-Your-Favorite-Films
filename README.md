# Movie Explorer App

A beautiful, responsive web application for discovering your favorite movies, powered by the TMDb API.

## 🚀 Features

- **Trending & Search:** View a daily feed of trending movies or search for any film.
- **Detailed Information:** Access extensive details for every movie, including cast members, overviews, ratings, and YouTube trailers.
- **Advanced Filtering:** Filter discoverable movies by Genre, Release Year, and minimum Rating.
- **Favorites & Authentication:** Mock login system allowing users to build a personal "Favorites" list stored in `localStorage`.
- **Theme Support:** Fully fledged Dark and Light modes using Material UI.
- **Responsive Design:** Mobile-first design principles ensure the application looks stunning on any device.

## 🛠️ Technology Stack

- **React.js** (Create React App scaffold)
- **Material-UI (MUI)** for UI Components and Theming
- **React Router** for navigation
- **Context API** for State Management (Theme, User, Favorites)
- **Axios** for querying the API
- **The Movie Database (TMDb) API**

## 🔐 Login Credentials

This application uses a **mock authentication system** — no real backend is required. You can log in with **any non-empty username and password**.

| Field    | Value (example) |
| -------- | --------------- |
| Username | `admin`         |
| Password | `admin123`      |

> **Note:** The password is not validated — any combination works as long as both fields are filled.

## 💻 Setup Instructions

1. Clone or download this repository.
2. Navigate to the project root:
   ```bash
   cd movie-explorer
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Configure your Environment Variables:
   - Create a `.env` file in the root of `movie-explorer`.
   - Add your TMDb API Key like so:
     ```env
     REACT_APP_TMDB_API_KEY=your_api_key_here
     ```
5. Start the development server:
   ```bash
   npm start
   ```

## 🌐 API Usage (TMDb)

This application uses [TMDb (The Movie Database)](https://developers.themoviedb.org/3) endpoints to fetch real-time data:

- `/trending/movie/day`: For the default home page feed.
- `/search/movie`: For the search bar queries.
- `/discover/movie`: Used when applying filters (genre, year, rating).
- `/movie/{movie_id}?append_to_response=videos,credits`: Used to load detailed information, cast, and embedded YouTube trailers.

## 🚢 Deployment

vercel link:
https://movie-explorer-omega-virid.vercel.app/
