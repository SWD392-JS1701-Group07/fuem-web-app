import { lazy } from 'react';

const HomePage = lazy(() => import("@/pages/home/HomePage"));
const EventPage = lazy(() => import("@/pages/event/EventList"));
const DashboardPage = lazy(() => import("@/pages/dashboard/index"));
const EventListPage = lazy(() => import("@/pages/dashboard/event/EventList")); //dashboard
const EventDetailPage = lazy(() => import("@/pages/dashboard/event/EventDetail"));
const EventCreatePage = lazy(() => import("@/pages/dashboard/event/EventCreate"));
const EventEditPage = lazy(() => import("@/pages/dashboard/event/EventUpdate"));

const DashboardRoutes = [
    { path: "/", component: HomePage },
    { path: "event", component: EventPage },
    { path: "1", component: DashboardPage },
    { path: "event", component: EventListPage },
    { path: "event/:id", component: EventDetailPage },
    { path: "event/create", component: EventCreatePage },
    { path: "event/:id/edit", component: EventEditPage },
]
const routes = [...DashboardRoutes];

export default routes;