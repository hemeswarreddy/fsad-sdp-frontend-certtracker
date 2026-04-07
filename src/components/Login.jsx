import { useState } from 'react';
import axios from 'axios';

const Login = ({ onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2006/auth/login', {
        username,
        password
      });
      
      const responseMessage = response.data;
      
      // Check if response matches selected role
      if (role === 'admin' && responseMessage.includes('User')) {
        setMessage('Invalid Admin Credentials');
      } else if (role === 'user' && responseMessage.includes('Admin')) {
        setMessage('Invalid User Credentials');
      } else {
        setMessage(responseMessage);
      }
    } catch (error) {
      setMessage(error.response?.data || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '40px', background: 'white', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
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
          <button type="button" onClick={onBack} style={{ width: '100%', padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
            Back to Home
          </button>
        </form>
        {message && (
          <div style={{ marginTop: '20px', padding: '12px', background: message.includes('successfully') || message.includes('successfull') ? '#d4edda' : '#f8d7da', color: message.includes('successfully') || message.includes('successfull') ? '#155724' : '#721c24', borderRadius: '5px', textAlign: 'center' }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
