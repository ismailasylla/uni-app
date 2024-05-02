import { Routes, Route } from 'react-router-dom';
import './App.css';
import ListingPage from './pages/ListingPage';
import DetailsPage from './pages/DetailsPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/details/:itemId" element={<DetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
