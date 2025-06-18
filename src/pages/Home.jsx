import '../css/Home.css'
import MovieCard from '../components/MovieCard'
import { useState, useEffect } from 'react'
import { searchMovies, getPopularMovies } from '../services/api'

function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        // Load popular movies on first render
        loadMovies(1);
    }, []);

    // Reset back to popular movies when searchQuery is cleared
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setCurrentPage(1);
            loadMovies(1);
        }
    }, [searchQuery]);

    const loadMovies = async (page) => {
        setLoading(true);
        try {
            const { movies: newMovies, totalPages } = await getPopularMovies(page);

            if (page === 1) {
                // Replace movies if it's the first page
                setMovies(newMovies);
            } else {
                // Append movies if loading more
                setMovies(prev => [...prev, ...newMovies]);
            }

            setTotalPages(totalPages);
            setError(null); // Clear previous error

        } catch (err) {
            console.log(err);
            setError('Failed To Load Movies...');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setError(null);
            setMovies(searchResults);
            setCurrentPage(1); // Reset page
            setTotalPages(1); // Disable load more in search
        } catch (err) {
            console.log(err);
            setError("Failed to search...");
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage);
            loadMovies(nextPage);
        }
    };

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="home">
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder='Search Movies'
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='search-button' type='submit'>Search</button>
            </form>

            {error && <div className='error-message'>{error}</div>}

            <div className="movies-grid">
                {movies.map((movie, index) => (
                    <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                ))}
            </div>

            {loading && <div className='loading'>Loading...</div>}

            {currentPage < totalPages && !loading && searchQuery.trim() === '' && (
                <button className='load-more-button' onClick={handleLoadMore}>
                    Load More
                </button>
            )}

            <button onClick={handleScrollTop}>↑</button>
        </div>
    )
}

export default Home;
