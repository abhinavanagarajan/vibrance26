import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Experience from './components/Experience';
import Home from './sections/Home';
import Merch from './sections/Merch';
import ProShows from './sections/ProShows';
import Events from './sections/Events';
import Sponsors from './sections/Sponsors';
import Team from './sections/Team';
import ComingSoon from './components/ComingSoon';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Experience />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/merch" element={<ComingSoon />} />
            <Route path="/proshows" element={<ComingSoon />} />
            <Route path="/events" element={<Events />} />
            <Route path="/sponsors" element={<ComingSoon />} />
            {/* <Route path="/team" element={<Team />} /> */}
          </Routes>
        </main>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
