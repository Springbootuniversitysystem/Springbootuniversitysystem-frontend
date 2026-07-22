import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateAccount from './pages/CreateAccount';
import SignIn from './pages/SignIn';
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/create-account" />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/sign-in" element={<SignIn />} />

          <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;