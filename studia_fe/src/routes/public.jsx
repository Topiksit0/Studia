import { AuthRoutes } from '../features/auth/screens';


export const publicRoutes = [
    {
      path: '/auth/*',
      element: <AuthRoutes />,
    },
];
