import { MainPage } from "./app/main";
import { Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="main-container">
        <MainPage />
      </div>
    </Router>
  );
}

export default App;
