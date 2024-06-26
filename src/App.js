import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ErrorBanner } from './components';

const ListingPage = lazy(() => import('./pages/Listing/ListingPage'));
const DetailsPage = lazy(() => import('./pages/details/DetailsPage'));

const ErrorFallback = () => {
  return <ErrorBanner message="OOPS! Something went wrong." />;
};
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={ErrorFallback}>
              <ListingPage />
            </Suspense>
          }
        />
        <Route
          path="/details/:itemId"
          element={
            <Suspense fallback={ErrorFallback}>
              <DetailsPage />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
