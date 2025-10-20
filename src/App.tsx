import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
const Studios = React.lazy(() => import('./pages/divisions/Studios'));
const Media = React.lazy(() => import('./pages/divisions/Media'));
const Events = React.lazy(() => import('./pages/divisions/Events'));
const Web = React.lazy(() => import('./pages/divisions/Web'));
const ProductServices = React.lazy(() => import('./pages/divisions/ProductServices'));
const Skill = React.lazy(() => import('./pages/divisions/Skill'));
import Journey from './pages/journey'
import Gallery from './pages/Gallery'
import Login from './pages/Login'
import Account from './pages/Account'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/studios" element={<Studios />} />
            <Route path="/media" element={<Media />} />
            <Route path="/events" element={<Events />} />
            <Route path="/web" element={<Web />} />
            <Route path="/product-services" element={<ProductServices />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/gallery/:eventSlug" element={<Gallery />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
