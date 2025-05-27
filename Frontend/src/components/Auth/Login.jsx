import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Wrong credentials entered. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFB6C8] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#441752]">
          Admin Login
        </h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#8174A0] placeholder-[#A888B5] text-[#441752] focus:outline-none focus:ring-2 focus:ring-[#441752] focus:border-[#441752] sm:text-sm"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-[#8174A0] placeholder-[#A888B5] text-[#441752] focus:outline-none focus:ring-2 focus:ring-[#441752] focus:border-[#441752] sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#441752] hover:bg-[#8174A0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#441752]"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#441752]">
          Not registered?{' '}
          <Link to="/signup" className="font-medium text-[#A888B5] hover:text-[#8174A0]">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;