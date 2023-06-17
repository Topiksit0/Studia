import { Route, Routes } from 'react-router-dom';

import CalendarEvents from './Calendar';
import NewsEvents from './News';
import TimelineEvents from './Timeline';
import Page404Screen from '../../../features/404/screens/Page404Screen';

export const EventsRoutes = () => {
    return (
        <Routes>
            <Route path="/timeline" element={<TimelineEvents />} />
            <Route path="/calendar" element={<CalendarEvents />} />
            <Route path="/news" element={<NewsEvents />} />
            <Route path="*" element={<Page404Screen />} />
        </Routes>
    )
}
