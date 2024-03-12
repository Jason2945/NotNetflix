import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';
import Landing from './components/landing';
import Trailer from './components/trailer';
import Navbar from './components/navbar';
import Movies from './components/movies';

export default function App(){

  const location = useLocation();
  const haveNavBar = location.pathname === '/notnetflix/landing' || location.pathname.startsWith('/notnetflix/trailer') || location.pathname.startsWith('/notnetflix/movies');

  return (
    <>
      {/* Make sure only the landing page and the trailer page */}
      {haveNavBar && <Navbar />}
      <Routes>
        <Route path="/notnetflix" element={<Login />} />
        <Route path="/notnetflix/profile" element={<Profile />} />
        <Route path="/notnetflix/landing" element={<Landing />} />
        <Route path="/notnetflix/trailer/:id" element={<Trailer />} />
        <Route path="/notnetflix/movies/:id" element={<Movies />}/>
      </Routes>
    </>
  )
}