
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './sections/Home';

function App() {
  return (
    <BrowserRouter>
      <main className="main-content">
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
