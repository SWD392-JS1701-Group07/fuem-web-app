
import { Route, Routes } from "react-router-dom";
import EventList from "./pages/event/EventList";
import HomePages from "./pages";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/event" element={<EventList />} />
      </Routes>
    </>
  );
}

export default App
