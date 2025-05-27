import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import Login from './components/Auth/Login';
import Dashboard from './pages/Dashboard';
import Signup from './components/Auth/Signup';
// src/index.js or App.js
import './index.css';
// import Agents from './pages/Agents';
// import Lists from './pages/Lists';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
    {/* <Route path="/agents" element={<Agents />} /> */}
    {/* <Route path="/lists" element={<Lists />} /> */}
  </Route>
</Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;