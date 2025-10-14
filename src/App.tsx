import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
import Studios from './pages/divisions/Studios';
import Media from './pages/divisions/Media';
import Events from './pages/divisions/Events';
import Web from './pages/divisions/Web';
import ProductServices from './pages/divisions/ProductServices';
import Skill from './pages/divisions/Skill';
import Journey from './pages/journey'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
