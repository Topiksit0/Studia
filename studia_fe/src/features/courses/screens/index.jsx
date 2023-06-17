import { Route, Routes } from 'react-router-dom';

import CoursesHome from './CoursesHome';
import CoursesInside from './CoursesInside';
import Page404Screen from '../../../features/404/screens/Page404Screen';

export const CoursesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<CoursesHome />} />
            <Route path=":courseId" element={<CoursesInside />} />
            <Route path="*" element={<Page404Screen />} />
        </Routes>
    )
}
