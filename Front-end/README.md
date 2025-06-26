
# Movie-Explorer
Discover Your Favorite Films
=======

### Overview

Movie Explorer is a React-based web application that allows users to browse trending movies, search for movies, view detailed movie information with trailers and manage a list of favorite movies. The application leverages the The Movie Database (TMDb) API to fetch movie data and provides a responsive, user-friendly interface with light/dark mode support. It uses Material-UI for styling and React Router for navigation.

### Features

1) Browse Trending Movies: View a list of trending movies on the home page.
2) Search Movies: Search for movies by keyword with real-time results.
3) Movie Details: Access detailed information about a movie, including its poster, overview, genres, cast, ratings, and an embedded YouTube trailer (if available).
4) Favorites Management: Add or remove movies from a favorites list, persisted in the browser's local storage.
5) Responsive Design: Optimized for both mobile and desktop devices using Material-UI and CSS media queries.
6) Navigation: Seamless navigation using React Router with routes for home, movie details, search results, favorites, login and registration.

### Technologies Used

React- JavaScript library for building the user interface.

React Router- For client-side routing and navigation.

Material-UI- For responsive UI components and theming.

TMDb API- To fetch movie data (trending movies, search results, and movie details).

Axios- For making HTTP requests to the TMDb API.

Local Storage- To persist the user's favorite movies.

CSS- For custom styling and responsive layouts.

### Setup Instructions
1) Clone the Repository
2) Install the required npm packages: npm install
3) Start the development server: npm start


### Key Components and Pages

App.js: The main entry point that sets up routing using react-router-dom. It includes routes for the home page, movie details, search results, favorites, login, and registration.

Navbar.js: A responsive navigation bar with links to Home, Favorites, and Login, a search bar, and a theme toggle button.

Moviecard.js: Displays individual movie cards with a poster, title, release year, rating, genres, and a favorite toggle button.

Movielist.js: Renders a responsive grid of MovieCard components.



Searchbar.js: A form for searching movies, redirecting to the search results page with the query.



Searchresult.js: Displays search results for a given query, fetched from the TMDb API.



Home.js: The landing page that shows trending movies using MovieList.



Moviedetails.js: Displays detailed movie information, including a poster, overview, genres, cast, rating, and an optional YouTube trailer.



Favorites.js: Shows the user's favorite movies, with options to remove them from the list.



Movieservice.js: Contains functions to fetch trending movies, search movies, and get movie details from the TMDb API.



tmdb.js: Configures an Axios instance with the TMDb API base URL and API key.


### Future Improvements





1) Implement authentication for the Login and Register pages.



2) Add pagination for search results and trending movies.



3) Enhance the favorites feature with backend storage for user-specific data.













