import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import Login from './components/Auth/Login';
import Dashboard from './pages/Dashboard';
import Signup from './components/Auth/Signup';
// import Agents from './pages/Agents';
// import Lists from './pages/Lists';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
         {/* <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />
          <Route path="/lists" element={<ProtectedRoute><Lists /></ProtectedRoute>} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;