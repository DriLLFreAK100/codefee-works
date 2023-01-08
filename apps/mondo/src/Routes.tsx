import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MenuLayout from 'layouts/MenuLayout';
import { withSuspense } from 'layouts/SuspenseLoader';

const TodoPage = lazy(() => import('./pages/Todo'));
const CreateTodoPage = lazy(() => import('./pages/Todo/CreateTodo'));
const SettingsPage = lazy(() => import('./pages/Settings'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MenuLayout />,
    children: [
      {
        path: 'todo',
        element: withSuspense(TodoPage),
      },
      {
        path: 'todo/create',
        element: withSuspense(CreateTodoPage),
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
