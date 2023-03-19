import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './screens/Home';
import CreateForm from './screens/CreateForm';
import ViewForm from './screens/ViewForm';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/viewForm/:formKey',
      element: <ViewForm />,
    },
  ],
  {
    basename: '/form-generator',
  }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  /*   <React.StrictMode>
   */
  <RouterProvider router={router} />

  /* </React.StrictMode>, */
);
