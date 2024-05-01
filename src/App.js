import { Routes, Route } from 'react-router-dom';
import './App.css';
import Listing from './pages/ListingPage';
import Details from './pages/DetailsPage';
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Listing />} />
      </Routes>
      <Routes>
        <Route path="/details" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
