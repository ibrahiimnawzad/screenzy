const API_KEY = '39e2c3353d094d82006cbe4135fd86de';
const BASE_URL = 'https://api.themoviedb.org/3';

// Get popular movies for a specific page
export const getPopularMovies = async (page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return {
            movies: data.results,
            totalPages: data.total_pages
        };
    } catch (error) {
        console.error("Failed to fetch popular movies:", error);
        return { movies: [], totalPages: 0 };
    }
    
};

// Search movies by query
export const searchMovies = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        // Sort ascending by popularity (least popular first)
        const sortedResults = data.results.sort((a, b) => b.popularity - a.popularity);
        console.log(data)

        return sortedResults;
    } catch (error) {
        console.error("Failed to search movies:", error);
        return [];
    }
};

// Get popular TV shows for a specific page
export const getPopularShows = async (page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        
        return {
            shows: data.results,
            totalPages: data.total_pages
        };
    } catch (error) {
        console.error("Failed to fetch popular TV shows:", error);
        return { shows: [], totalPages: 0 };
    }
};

// Search TV shows by query
export const searchShows = async (query) => {
    try {
        const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();
        // Sort ascending by popularity (same logic as movies)
        const sortedResults = data.results.sort((a, b) => b.popularity - a.popularity);

        console.log(data)

        return sortedResults;
    } catch (error) {
        console.error("Failed to search TV shows:", error);
        return [];
    }
};

