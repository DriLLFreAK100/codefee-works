import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MenuLayout from 'layouts/MenuLayout';
import { withSuspense } from 'layouts/SuspenseLoader';

const TodoPage = lazy(() => import('./pages/Todo'));
const EditTodoPage = lazy(() => import('./pages/Todo/EditTodo'));
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
        element: withSuspense(EditTodoPage),
      },
      {
        path: 'todo/edit/:id',
        element: withSuspense(EditTodoPage),
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
