import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from 'layouts/RootLayout';
import { withSuspense } from 'layouts/SuspenseLoader';

const TodoPage = lazy(() => import('./pages/Todo'));
const SettingsPage = lazy(() => import('./pages/Settings'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'todo',
        element: withSuspense(TodoPage),
      },
      {
        path: 'settings',
        element: withSuspense(SettingsPage),
      },
    ],
  },
]);

const Routes = () => <RouterProvider router={router} />;

export default Routes;
