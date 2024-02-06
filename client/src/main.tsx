import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App.tsx';
import './index.css';
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import PlanPage from './pages/PlanPage.tsx';
import BrowsePage from './pages/BrowsePage.tsx';
import WatchPage from './pages/WatchPage.tsx';
import { store } from './app/store.ts';
import PrivateRoute from './components/PrivateRoute.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/plans' element={<PlanPage />} />
      <Route path='/browse' element={<PrivateRoute />}>
        <Route path='/browse' element={<BrowsePage />} />
        <Route path='/browse/watch/:id' element={<WatchPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
