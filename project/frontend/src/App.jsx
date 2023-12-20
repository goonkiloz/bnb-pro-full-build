import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage';
import SpotDetailPage from './components/SpotDetailPage';
import CreateSpotPage from './components/CreateSpotPage';
import ManageSpotsPage from './components/ManageSpotsPage';
import UpdateSpotPage from './components/UpdateSpotPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);



  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <div className='root'>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </div>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path:'/spots/:spotId',
        element: <SpotDetailPage />
      },
      {
        path: '/spots/new',
        element: <CreateSpotPage />
      },
      {
        path: '/spots/manage',
        element: <ManageSpotsPage />
      },
      {
        path: '/spots/:spotId/update',
        element: <UpdateSpotPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
