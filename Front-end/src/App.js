import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import MovieDetails from './Pages/Moviedetails';
import Favorites from './Pages/Favorites';
import NavBar  from './Components/Navbar';  
import Login from './Pages/Login';
import Register from './Pages/Register';
import Searchbar from './Components/Searchbar';
import SearchResults from './Components/Searchresult';

function App() {
  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search/:query" element={<SearchResults/>} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </Router>
  );
}

export default App;
