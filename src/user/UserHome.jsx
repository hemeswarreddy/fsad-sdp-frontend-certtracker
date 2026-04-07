import { useState, useEffect } from 'react';
import UserNavBar from './UserNavBar';
import { getCertificatesByUser } from '../api/certificate';
import { useAuth } from '../context/AuthContext';

const UserHome = () => {
  const { user } = useAuth();
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [expiringSoon, setExpiringSoon] = useState(0);
  const [activeCertificates, setActiveCertificates] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchCertificates();
    }
  }, [user]);

  const fetchCertificates = async () => {
    try {
      const data = await getCertificatesByUser(user.id);
      setTotalCertificates(data.length);

      // Calculate expiring soon (within 30 days)
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      const expiring = data.filter(cert => {
        const expiryDate = new Date(cert.expiryDate);
        return expiryDate >= today && expiryDate <= thirtyDaysFromNow;
      });
      setExpiringSoon(expiring.length);

      // Calculate active certificates (not expired)
      const active = data.filter(cert => {
        const expiryDate = new Date(cert.expiryDate);
        return expiryDate >= today;
      });
      setActiveCertificates(active.length);

    } catch (error) {
      if (error.response?.status !== 204) {
        console.error('Error fetching certificates:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <UserNavBar />
      <div style={{ padding: '40px 5%' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>My Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
          <div style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '24px', color: '#667eea', marginBottom: '10px' }}>Total Certificates</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
              {loading ? '...' : totalCertificates}
            </p>
          </div>
          <div style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '24px', color: '#ff9800', marginBottom: '10px' }}>Expiring Soon</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
              {loading ? '...' : expiringSoon}
            </p>
            <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>Within 30 days</p>
          </div>
          <div style={{ padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '24px', color: '#28a745', marginBottom: '10px' }}>Active</h3>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
              {loading ? '...' : activeCertificates}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
