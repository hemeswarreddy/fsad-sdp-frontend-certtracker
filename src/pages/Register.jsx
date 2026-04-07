import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    Contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      toast.success(response);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(error.response?.data || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '40px', background: 'white', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontSize: '32px', color: '#667eea', marginBottom: '10px' }}>🎓 CertTracker</h2>
          <p style={{ color: '#666' }}>Create your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter username" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '500' }}>Contact Number</label>
            <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} placeholder="Enter contact number" required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }} />
          </div>
          <button type="submit" style={{ width: '100%', padding: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>
            Register
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ width: '100%', padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
