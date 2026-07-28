import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CareerGuidance from './pages/CareerGuidance';
import CreateAccount from './pages/CreateAccount';
import SignIn from './pages/SignIn';
import MarksAnalysis from './pages/MarksAnalysis';
import Profile from './pages/Profile';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import ProgrammeCareers from "./pages/ProgrammeCareers";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/career-guidance" element={<CareerGuidance />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/marks-analysis" element={<MarksAnalysis />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/programme-careers" element={<ProgrammeCareers />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;