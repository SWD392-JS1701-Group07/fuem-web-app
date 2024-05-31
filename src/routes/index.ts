import { lazy } from 'react';

const HomePage = lazy(() => import("@/pages/home/HomePage"));

const EventPage = lazy(() => import("@/pages/event/EventList"));

const coreRoutes = [
    { path: "/", component: HomePage },
    { path: "/event", component: EventPage },
]
const routes = [...coreRoutes];

export default routes;