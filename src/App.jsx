import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login';
import Profile from './components/profile';
import Landing from './components/landing';
import Trailer from './components/trailer';
import MovieByGenres from './components/movie_genre';

export default function App(){

  return (
    <>
      <Router>
        <Routes>
          <Route path="/notnetflix" element={<Login />} />
          <Route path="/notnetflix/profile" element={<Profile />} />
          <Route path="/notnetflix/landing" element={<Landing />} />
          <Route path="/notnetflix/trailer/:id" element={<Trailer />} />
          <Route path="/notnetflix/movie_genre/:id" element={<MovieByGenres />}/>
        </Routes>
      </Router>
    </>
  )
}