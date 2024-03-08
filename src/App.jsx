import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Profile from './components/profile';
import Landing from './components/landing';
import Trailer from './components/trailer';

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/trailer" element={<Trailer />} />
      </Routes>
    </Router>
  )
}