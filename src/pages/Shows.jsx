import MovieCard from '../components/MovieCard';
import { searchShows, getPopularShows } from '../services/api';
import { useState, useEffect } from 'react';

import '../css/Home.css';

function Shows() {
    const [searchQuery, setSearchQuery] = useState('');
    const [shows, setShows] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        loadShows(currentPage);
    }, []);

    const loadShows = async (page) => {
        setLoading(true);
        try {
            const { shows: newShows, totalPages } = await getPopularShows(page);
            const mappedShows = newShows.map(show => ({
                ...show,
                title: show.name, // Map 'name' to 'title'
                release_date: show.first_air_date // Map 'first_air_date' to 'release_date'
            }));
            if (page === 1) {
                setShows(mappedShows);
            } else {
                setShows((prev) => [...prev, ...mappedShows]);
            }
            setTotalPages(totalPages);
            setError(null);
        } catch (err) {
            console.log(err);
            setError('Failed To Load TV Shows');
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
            const searchResults = await searchShows(searchQuery);
            const mappedResults = searchResults.map(show => ({
                ...show,
                title: show.name,
                release_date: show.first_air_date
            }));
            setError(null);
            setShows(mappedResults);
            setCurrentPage(1);
            setTotalPages(1);
        } catch (err) {
            console.log(err);
            setError('Failed To Load TV Shows');
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPages) {
            setCurrentPage(nextPage);
            loadShows(nextPage);
        }
    };

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className='home'>
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder='Search TV Shows'
                    className='search-input'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='search-button' type='submit'>Search</button>
            </form>

            {error && <div className='error-message'>{error}</div>}

            <div className="movies-grid">
                {shows.map((show, index) => (
                    <MovieCard key={`${show.id}-${currentPage}-${index}`} movie={show} />
                ))}
            </div>

            {loading && <div className='loading'>Loading...</div>}

            {currentPage < totalPages && !loading && !searchQuery.trim() && (
                <button className='load-more-button' onClick={handleLoadMore}>
                    Load More
                </button>
            )}

            <button onClick={handleScrollTop}>
                ↑
            </button>
        </div>
    );
}

export default Shows;
