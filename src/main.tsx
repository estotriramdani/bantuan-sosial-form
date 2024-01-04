import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootPage from '@/pages/root';
import AddFormPage from '@/pages/AddForm';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: (
      <div className="flex items-center justify-center h-screen">
        <p className="font-mono text-5xl font-bold">404</p>
        <p className="font-mono text-5xl font-bold">Not found</p>
      </div>
    ),
    children: [
      {
        path: '/',
        element: <AddFormPage />,
      },
      {
        path: '/submissions',
        element: <div>sumsb</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
