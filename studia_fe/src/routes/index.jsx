import { useRoutes } from 'react-router-dom'
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { checkAuthenticated } from '../helpers';  
import Home from '../shared/home';
import Page404Screen from '../features/404/screens/Page404Screen';

export const AppRoutes = () => {

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
    const routes = checkAuthenticated() ? protectedRoutes : publicRoutes;
    const element = useRoutes([...routes, ...commonRoutes]);

    return <>{element}</>;

}