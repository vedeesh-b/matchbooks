import Homepage from "./pages/Homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopPaths from "./pages/TopPaths";
import PathGenerator from "./pages/PathGenerator";
import DefaultLayout from "./components/features/DefaultLayout";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/top-paths" element={<TopPaths />} />
          <Route path="/path-generator" element={<PathGenerator />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
