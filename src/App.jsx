import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Profile from './components/profile';
import Landing from './components/landing';
import Trailer from './components/trailer';
import MovieByGenres from './components/movie_genre';
import Favorites from './components/favorites';

export default function App(){

  return (
    <>
      <Router>
        <Routes>
          <Route path="/NotNetflix" element={<Login />} />
          <Route path="/NotNetflix/profile" element={<Profile />} />
          <Route path="/NotNetflix/landing" element={<Landing />} />
          <Route path="/NotNetflix/trailer/:id" element={<Trailer />} />
          <Route path="/NotNetflix/movie_genre/:id" element={<MovieByGenres />}/>
          <Route path="/NotNetflix/favorites" element={<Favorites />}/>
        </Routes>
      </Router>
    </>
  )
}