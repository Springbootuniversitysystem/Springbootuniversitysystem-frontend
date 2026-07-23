import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount';
import SignIn from './pages/SignIn';
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import CareerGuidance from "./pages/CareerGuidance.jsx";
import MarksAnalysis from "./pages/MarksAnalysis.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/marks-analysis" element={<MarksAnalysis />} />
          <Route path="/career-guidance" element={<CareerGuidance />} />
          <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;