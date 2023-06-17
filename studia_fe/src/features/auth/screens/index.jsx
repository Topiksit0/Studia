import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Verify from './Verify';
import Page404Screen from '../../../features/404/screens/Page404Screen';


export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Page404Screen />} />
      <Route path="activate/:uid/:token" element={<Verify />} />
    </Routes>
  );
};