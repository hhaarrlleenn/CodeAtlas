import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Diagram from "./pages/Diagram";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/about" element={<About />} />
        <Route path="/diagram" element={<Diagram />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;