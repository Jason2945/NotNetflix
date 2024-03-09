import { Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';
import Landing from './components/landing';
import Trailer from './components/trailer';
import Navbar from './components/navbar';

export default function App(){

  const location = useLocation();
  const haveNavBar = location.pathname === '/landing' || location.pathname.startsWith('/trailer');

  return (
    <>
      {haveNavBar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/trailer/:id" element={<Trailer />} />
      </Routes>
    </>
  )
}