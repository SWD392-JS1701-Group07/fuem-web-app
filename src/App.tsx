
import { Route, Routes } from "react-router-dom";
import EventList from "@/pages/event/EventList";
import HomePage from "@/pages/home/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventList />} />
      </Routes>
    </>
  );
}

export default App
