import Helper from "./helper";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Helper} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
