import { Route, Routes } from 'react-router-dom'
import EventList from './pages/event/EventList'
import { DashboardLayout, LandingPageLayout } from './components/layout/layout'
import HomePage from './pages/home/HomePage'
// import routes from "./routes";
// import { Suspense } from "react";
import EventDetail from './pages/event/EventDetail'
import DashBoard from './pages/dashboard'
import DashboardEventList from './pages/dashboard/event/EventList'
import CreateEvent from './pages/dashboard/event/EventCreate'
import LoginPage from './pages/home/LoginPage'
import SignupPage from './pages/home/SignupPage'
import SponsorList from './pages/dashboard/sponsor/SponsorList'
import ContactPage from './pages/home/ContactPage'
import AboutPage from './pages/home/AboutPage'

function App() {
  //const { component: Component, path } = routes[3];
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="event" element={<EventList />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="dashboard" element={<DashboardLayout />}>
            {/* <Route path={path} element={
              <Suspense fallback={<div>Loading...</div>}>
                <Component />
              </Suspense>
            } /> //test */}
            <Route index element={<DashBoard />} />
            <Route path="event" element={<DashboardEventList />} />
            <Route path="event/:id" element={<EventDetail />} />
            <Route path="event/create" element={<CreateEvent />} />
            <Route path="sponsor" element={<SponsorList />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
