import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import ArtActivity from "./components/activities/ArtActivity";
import StudyActivity from "./components/activities/StudyActivity";
import WorkoutActivity from "./components/activities/WorkoutActivity";
import ChillActivity from "./components/activities/ChillActivity";
import Home from "./components/Home";
import ActivityWrapper from "./components/ActivityWrapper";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/art"
          element={<ActivityWrapper catText="Show me your whole artwork!" />}
        >
          <Route index element={<ArtActivity />} />
        </Route>
        <Route
          path="/study"
          element={
            <ActivityWrapper catText="Don't worry for me, I'll wait for you!" />
          }
        >
          <Route index element={<StudyActivity />} />
        </Route>
        <Route
          path="/workout"
          element={
            <ActivityWrapper catText="Nothing like a little workout! You got this girl!" />
          }
        >
          <Route index element={<WorkoutActivity />} />
        </Route>
        <Route
          path="/chill"
          element={<ActivityWrapper catText="We both deserve a break!" />}
        >
          <Route index element={<ChillActivity />} />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
