import { MainPage } from "./app/main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router basename="/todolist">
      <div className="main-container">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
