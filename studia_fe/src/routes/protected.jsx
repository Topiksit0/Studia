import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Spinner } from '../shared/elements/Spinner';
import { CoursesRoutes } from '../features/courses/screens'; 
import { EventsRoutes } from '../features/events/screens';
import { QualificationsRoutes } from '../features/qualifications/screens';
import { UserProfileRoutes } from '../features/userProfile/screens';

const App = () => {
    return (
        <Suspense
          fallback={
            <div className="h-screen w-screen flex items-center justify-center">
              <Spinner size="xl" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
    );
  };


  export const protectedRoutes = [
    {
      path: '/app',
      element: <App />,
      children: [
        { path: 'courses/*', element: <CoursesRoutes /> },
        { path: 'events/*', element: <EventsRoutes /> },
        { path: 'qualifications/*', element: <QualificationsRoutes /> },
        { path: 'profile/*', element: <UserProfileRoutes /> },
      ],
    },
  ];