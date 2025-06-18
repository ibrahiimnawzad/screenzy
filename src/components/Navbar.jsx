import { Link } from 'react-router-dom'
import { useState } from 'react';
import '../css/navbar.css';

function Navbar({ toggleTheme, darkMode }) {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <nav className="navbar">
            <div className='navbar-brand'>
                <Link to='/'>Screenzy</Link>
            </div>
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`navbar-links ${menuActive ? 'active' : ''}`}>
                <Link className='nav-link' to='/'>Movies</Link>
                <Link className='nav-link' to='/shows'>TV Shows</Link>
                <Link className='nav-link' to='/favorites'>Favorites</Link>
                <button className="theme-toggle" onClick={toggleTheme}>
                    {darkMode ? '🌞' : '🌙'}
                </button>
            </div>
        </nav>
    );
}


export default Navbar;
