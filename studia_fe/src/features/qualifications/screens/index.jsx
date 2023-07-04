import { Route, Routes } from 'react-router-dom';
import Qualifications from './Qualifications';

export const QualificationsRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Qualifications />} />
        </Routes>
    )
}
