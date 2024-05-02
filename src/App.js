import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const ListingPage = lazy(() => import('./pages/ListingPage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage'));

const ErrorFallback = () => {
  return <div>Error! Something went wrong.</div>;
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
