

import { Outlet, Route, Routes } from "react-router-dom";
import EventList from "./pages/event/EventList";
import { DashboardLayout, LandingPageLayout } from "./components/layout";
import HomePage from "@/pages/home/HomePage";

function App() {
  return (
    <>
      {/* <Header></Header>
      <div className="min-h-screen" >
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/event" element={<EventList />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
      <Footer></Footer> */}
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<HomePages />} />
          <Route path="dashboard" element={<DashboardLayout />} >
            <Route path="event" element={<EventList />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App
