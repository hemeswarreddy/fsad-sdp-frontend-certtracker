import { Link } from 'react-router-dom';

const MainNavBar = () => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid #eee', background: 'white' }}>
      <Link to="/" style={{ fontSize: 'clamp(20px, 4vw, 24px)', fontWeight: 'bold', textDecoration: 'none', color: '#667eea' }}>
        🎓 CertTracker
      </Link>
      <div style={{ display: 'flex', gap: '15px' }}>
        <Link to="/login" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', textDecoration: 'none', fontSize: '14px' }}>
          Login
        </Link>
        <Link to="/register" style={{ padding: '10px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', textDecoration: 'none', fontSize: '14px' }}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default MainNavBar;
