import { Route, Routes } from 'react-router-dom'
import EventList from './pages/event/EventList'
import { DashboardLayout, LandingPageLayout } from './components/layout/layout'
import HomePage from './pages/home/HomePage'
// import routes from "./routes";
// import { Suspense } from "react";
import EventDetail from './pages/event/EventDetail'
import EventDashboardDetail from './pages/dashboard/event/EventDashboardDetail'
import DashBoard from './pages/dashboard'
import DashboardEventList from './pages/dashboard/event/EventList'
import CreateEvent from './pages/dashboard/event/EventCreate'
import LoginPage from './pages/home/LoginPage'
import SignupPage from './pages/home/SignupPage'
import SponsorList from './pages/dashboard/sponsor/SponsorList'
import ContactPage from './pages/home/ContactPage'
import AboutPage from './pages/home/AboutPage'
import PrivateRoute from './components/common/PrivateRoute'
import AuthRoute from './components/common/AuthRoute'
import OperatorAccCreate from './pages/dashboard/OperatorAcc/OperatorAccCreate'
import StaffCreate from './pages/dashboard/StaffAcc/StaffCreate'
import ProfilePage from './pages/home/ProfilePage'
import CollaboratorList from './pages/dashboard/collaborator/CollaboratorList'
import RegistedEventList from './pages/collaborator/RegistedEventList'
import Cart from './pages/cart/Cart'
import CartCallback from './pages/cart/CartCallback'
import OperatorList from './pages/dashboard/operator/OperatorList'
import VisitorList from './pages/dashboard/Visitor/VisitorList'
import StaffList from './pages/dashboard/Staff/StaffList'
import OperatorDashboardDetail from './pages/dashboard/operator/Component/OperatorDashboardDetail'
import StaffDashboardDetail from './pages/dashboard/Staff/Component/StaffDashboardDetail'
import VisitorDashboardDetail from './pages/dashboard/Visitor/Component/VisitorDashboardDetail'

function App() {
  //const { component: Component, path } = routes[3];
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="collaborator" element={<RegistedEventList />} />
          <Route
            path="login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          <Route
            path="signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route path="event" element={<EventList />} />
          <Route path="event/:id" element={<EventDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="callback" element={<CartCallback />} />
          <Route
            path="dashboard"
            element={
              <>
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              </>
            }
          >
            <Route index element={<DashBoard />} />
            <Route path="event" element={<DashboardEventList />} />
            <Route path="event/:id" element={<EventDashboardDetail />} />
            <Route path="event/create" element={<CreateEvent />} />
            <Route path="sponsor" element={<SponsorList />} />
            <Route path="operator" element={<OperatorList />} />
            <Route path="operator/:id" element={<OperatorDashboardDetail />} />
            <Route path="visitor" element={<VisitorList />} />
            <Route path="visitor/:id" element={<VisitorDashboardDetail />} />
            <Route path="staff" element={<StaffList />} />
            <Route path="staff/:id" element={<StaffDashboardDetail />} />
            <Route path="operator/create" element={<OperatorAccCreate />} />
            <Route path="staff/create" element={<StaffCreate />} />
            <Route path="collaborator" element={<CollaboratorList />} />
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
