import { Quiz } from "./Componets/Quiz";
import "bootstrap/dist/css/bootstrap.min.css";
import { QuizArea } from "./Pages/LogIn";
import { Landing } from "./Pages/Landing";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/quiz" element={<QuizArea />} />
    </Routes>
  );
}

export default App;
