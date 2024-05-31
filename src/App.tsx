import { Route, Routes } from "react-router-dom";
import EventList from "./pages/event/EventList";
import { DashboardLayout, LandingPageLayout } from "./components/layout/layout";
import HomePage from "./pages/home/HomePage";
import DashBoard from "./pages/dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="dashboard" element={<DashboardLayout />} >
            <Route path="" element={<DashBoard />} />
            <Route path="event" element={<EventList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App
