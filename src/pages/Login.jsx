import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginAPI } from '../api/auth';
import { getUserByUsername } from '../api/user';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAPI(username, password);
      const responseMessage = response;

      if (role === 'admin' && responseMessage.includes('User')) {
        toast.error('Invalid Admin Credentials');
      } else if (role === 'user' && responseMessage.includes('Admin')) {
        toast.error('Invalid User Credentials');
      } else {
        // Fetch user details to get the ID
        if (role === 'user') {
          try {
            const userDetails = await getUserByUsername(username);
            login(userDetails, role);
          } catch (error) {
            login({ username }, role);
          }
        } else {
          login({ username }, role);
        }
        toast.success(responseMessage);
        setTimeout(() => {
          navigate(role === 'admin' ? '/admin/home' : '/user/home');
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '40px', background: 'white', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', margin: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', color: '#667eea', marginBottom: '10px' }}>🎓 CertTracker</h2>
          <p style={{ color: '#666' }}>Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Login As</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
            Login
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ width: '100%', padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
