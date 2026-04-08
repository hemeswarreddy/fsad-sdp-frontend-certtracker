import { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import { getAllUsers, getAllCertificates } from '../api/admin';
import './AdminTheme.css';

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
    <div className="admin-page">
      <AdminNavBar />
      <div className="admin-shell">
        <h1 className="admin-title">Admin Dashboard</h1>
        <div className="admin-grid">
          <div className="admin-card">
            <h3 className="admin-metric-title">Total Users</h3>
            <p className="admin-metric-value">
              {loading ? '...' : totalUsers}
            </p>
          </div>
          <div className="admin-card">
            <h3 className="admin-metric-title">Total Certificates</h3>
            <p className="admin-metric-value">
              {loading ? '...' : totalCertificates}
            </p>
          </div>
          <div className="admin-card">
            <h3 className="admin-metric-title">System Status</h3>
            <p className="admin-metric-value admin-metric-ok">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
