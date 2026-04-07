import { useState } from 'react';
import UserNavBar from './UserNavBar';
import { updateUserProfile } from '../api/user';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    id: user?.id || '',
    name: '',
    gender: '',
    email: '',
    username: user?.username || '',
    password: '',
    Contact: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile(formData);
      toast.success(response);
    } catch (error) {
      toast.error(error.response?.data || 'Update failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <UserNavBar />
      <div style={{ padding: '40px 5%', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>Update Profile</h1>
        <div style={{ background: 'white', borderRadius: '10px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Username</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current password" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Contact Number</label>
              <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
