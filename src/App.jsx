import './css/App.css'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';

import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'

import {MovieProvider} from './contexts/MovieContext'
import Shows from './pages/Shows'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <MovieProvider>
      <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
      <main className={`main-content ${darkMode ? 'dark' : ''}`}> 
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/favorites' element={<Favorites />}/> 
        </Routes>
      </main>
    </MovieProvider>
  )
}


export default App
