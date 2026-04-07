import { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import { getAllCertificates } from '../api/admin';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const ViewAllCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCerts, setFilteredCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCertificates();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCerts(certificates);
    } else {
      const filtered = certificates.filter(cert => 
        cert.certName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.orgName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCerts(filtered);
    }
  }, [searchTerm, certificates]);

  const fetchCertificates = async () => {
    try {
      const data = await getAllCertificates();
      setCertificates(data);
      setFilteredCerts(data);
    } catch (error) {
      console.error('Fetch error:', error);
      if (error.response?.status === 204) {
        setCertificates([]);
        setFilteredCerts([]);
      } else {
        toast.error(error.response?.data || 'Error fetching certificates');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <AdminNavBar />
      <div style={{ padding: '40px 5%' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>All Certificates</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search by certificate name, organization, or user..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', maxWidth: '500px', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }}
          />
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div style={{ background: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #667eea' }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Certificate Name</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Organization</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>User</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Issue Date</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Expiry Date</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Added At</th>
                </tr>
              </thead>
              <tbody>
                {filteredCerts.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                      {searchTerm ? 'No certificates found matching your search' : 'No certificates found'}
                    </td>
                  </tr>
                ) : (
                  filteredCerts.map((cert) => (
                    <tr key={cert.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px' }}>{cert.id}</td>
                      <td style={{ padding: '15px' }}>{cert.certName}</td>
                      <td style={{ padding: '15px' }}>{cert.orgName}</td>
                      <td style={{ padding: '15px' }}>{cert.user?.name || 'N/A'}</td>
                      <td style={{ padding: '15px' }}>{cert.issueDate}</td>
                      <td style={{ padding: '15px' }}>{cert.expiryDate}</td>
                      <td style={{ padding: '15px' }}>{cert.addedAt ? new Date(cert.addedAt).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllCertificates;
