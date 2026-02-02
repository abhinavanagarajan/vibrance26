
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './sections/Home';
import Merch from './sections/Merch';
import ProShows from './sections/ProShows';
import Events from './sections/Events';
import EventDetails from './components/events/EventDetails';
import Sponsors from './sections/Sponsors';
import Team from './sections/Team';
import Login from './sections/Login';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merch" element={<Merch />} />
            <Route path="/proshows" element={<ProShows />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/team" element={<Team />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
