# Movie List Application
A simple and intuitive movie list application that allows users to search for movies, view details, and manage their favorite movie lists. The app leverages the OMDb API to fetch movie data and utilizes React Context for state management and caching to enhance the user experience.

## Features
Search for Movies: Users can search for movies by title, with the ability to paginate through results.
Movie Details: View detailed information about each movie, including the title, year, poster, and type. \
Caching: Efficient caching mechanism to store movie search results and avoid unnecessary API calls when navigating through pages. \
Persistent Data: Recent searches and favorite movies are stored in local storage for a seamless user experience, even after page refreshes. \
Responsive Design: The application is designed to be responsive and accessible across devices.
#### Technologies Used
React: JavaScript library for building user interfaces. \
Axios: Promise-based HTTP client for making API requests. \
React Router: Declarative routing for React applications. \
TypeScript: For better code quality and maintainability. 

## Getting Started
To run the movie list application locally, follow these steps:

## Prerequisites
Node.js (v14 or later)
npm (v5.6.0 or later)
Installation
Clone the repository: \
RUN ``` npm install``` \
RUN ``` npm run dev```



## Usage
Enter a movie title in the search bar to find movies.
Navigate through pages of results using the pagination controls.
Click on a movie to view detailed information.
Recent searches and favorite movies will be saved and persist across refreshes.
## API Reference
The application uses the OMDb API for movie data. Make sure to replace the apikey in the code with your own API key if necessary.
