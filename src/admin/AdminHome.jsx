import { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import { getAllUsers, getAllCertificates } from '../api/admin';

const AdminHome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const users = await getAllUsers();
      setTotalUsers(users.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    try {
      const certificates = await getAllCertificates();
      setTotalCertificates(certificates.length);
    } catch (error) {
      if (error.response?.status !== 204) {
        console.error('Error fetching certificates:', error);
      }
    }

    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <AdminNavBar />
      <div style={{ padding: '40px 5%' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>Admin Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
          <div style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '10px' }}>Total Users</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
              {loading ? '...' : totalUsers}
            </p>
          </div>
          <div style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '10px' }}>Total Certificates</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
              {loading ? '...' : totalCertificates}
            </p>
          </div>
          <div style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '10px' }}>System Status</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#28a745' }}>Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
