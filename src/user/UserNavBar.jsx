import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserNavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', background: '#667eea', color: 'white', flexWrap: 'wrap', gap: '15px' }}>
      <div style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 'bold' }}>🎓 CertTracker</div>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        <Link to="/user/home" style={{ padding: '10px 20px', color: 'white', textDecoration: 'none', fontSize: '14px' }}>Home</Link>
        <Link to="/user/add-certificate" style={{ padding: '10px 20px', color: 'white', textDecoration: 'none', fontSize: '14px' }}>Add Certificate</Link>
        <Link to="/user/view-certificates" style={{ padding: '10px 20px', color: 'white', textDecoration: 'none', fontSize: '14px' }}>My Certificates</Link>
        <Link to="/user/profile" style={{ padding: '10px 20px', color: 'white', textDecoration: 'none', fontSize: '14px' }}>Profile</Link>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>Logout</button>
      </div>
    </nav>
  );
};

export default UserNavBar;
