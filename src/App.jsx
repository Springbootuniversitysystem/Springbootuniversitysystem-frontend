import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CareerGuidance from './pages/CareerGuidance';
import CreateAccount from './pages/CreateAccount';
import SignIn from './pages/SignIn';
import MarksAnalysis from './pages/MarksAnalysis';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career-guidance" element={<CareerGuidance />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/marks-analysis" element={<MarksAnalysis />} />
        <Route path="/dashboard" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;