import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import { getCertificatesByUser, deleteCertificate } from '../api/certificate';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ViewCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchCertificates();
    }
  }, [user]);

  const fetchCertificates = async () => {
    try {
      const data = await getCertificatesByUser(user.id);
      setCertificates(data);
    } catch (error) {
      if (error.response?.status === 204) {
        setCertificates([]);
      } else {
        toast.error('Error fetching certificates');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (certName) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        const response = await deleteCertificate(certName, user.id);
        toast.success(response);
        fetchCertificates();
      } catch (error) {
        toast.error(error.response?.data || 'Error deleting certificate');
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <UserNavBar />
      <div style={{ padding: '40px 5%' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>My Certificates</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {certificates.length === 0 ? (
              <p style={{ color: '#666' }}>No certificates found. Add your first certificate!</p>
            ) : (
              certificates.map((cert) => (
                <div key={cert.id} style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ color: '#667eea', marginBottom: '10px' }}>{cert.certName}</h3>
                  <p style={{ color: '#666', marginBottom: '5px' }}><strong>Organization:</strong> {cert.orgName}</p>
                  <p style={{ color: '#666', marginBottom: '5px' }}><strong>Issue Date:</strong> {cert.issueDate}</p>
                  <p style={{ color: '#666', marginBottom: '5px' }}><strong>Expiry Date:</strong> {cert.expiryDate}</p>
                  {cert.certificateUrl && (
                    <p style={{ color: '#666', marginBottom: '15px' }}>
                      <strong>URL:</strong> <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#667eea' }}>View Certificate</a>
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button onClick={() => navigate(`/user/update-certificate/${cert.certName}`)} style={{ flex: 1, padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(cert.certName)} style={{ flex: 1, padding: '10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCertificates;
