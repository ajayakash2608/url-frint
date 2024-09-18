
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/signup';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import URLShortener from './components/URLShortener';
import Dashboard from './components/Dashboard';
import ViewUrls from './components/ViewUrls';
import Redirect from './components/Redirect';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/urlshortener" element={<URLShortener />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/view-all" element={<ViewUrls />} />
        <Route path="/redirect/:shortUrl" element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
