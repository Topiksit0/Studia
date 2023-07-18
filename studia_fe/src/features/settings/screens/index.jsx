import { Route, Routes } from 'react-router-dom';
import  Settings   from './Settings';

export const SettingsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Settings />} />
        </Routes>
    )
}
