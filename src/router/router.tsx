import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Todo from '../pages/Todo';
import Error from '../pages/Error';

export const routers = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <Error />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/signin',
      element: <Signin />,
    },
    {
      path: '/todo',
      element: <Todo />,
    },
  ],
  { basename: `${process.env.PUBLIC_URL}` }
);
