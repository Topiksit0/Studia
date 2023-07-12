import { Route, Routes } from 'react-router-dom';
import  UserProfile  from './UserProfile';

export const UserProfileRoutes = () => {
    return (
        <Routes>
            <Route path=":uid" element={<UserProfile />} />
        </Routes>
    )
}
