import { useRoutes } from 'react-router-dom'
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { useSelector } from 'react-redux';

import Home from '../shared/home';
import Page404Screen from '../features/404/screens/Page404Screen';

export const AppRoutes = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const commonRoutes = [
        {
            path: '/',
            element: <Home />,
        },
        {
            path: '*',
            element: <Page404Screen />,
        }
    ];
    console.log(isAuthenticated)
    const routes = isAuthenticated ? protectedRoutes : publicRoutes;

    console.log(routes);
    
    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;

}