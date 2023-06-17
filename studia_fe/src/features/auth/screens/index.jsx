import { Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Page404Screen from '../../../features/404/screens/Page404Screen';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Page404Screen />} />
    </Routes>
  );
};