import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import { updateCertificate, getCertificatesByUser } from '../api/certificate';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const UpdateCertificate = () => {
  const { certName } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    certName: '',
    orgName: '',
    issueDate: '',
    expiryDate: '',
    certificateUrl: ''
  });

  useEffect(() => {
    if (user?.id && certName) {
      fetchCertificate();
    }
  }, [user, certName]);

  const fetchCertificate = async () => {
    try {
      const data = await getCertificatesByUser(user.id);
      const cert = data.find(c => c.certName === decodeURIComponent(certName));
      if (cert) {
        setFormData({
          certName: cert.certName,
          orgName: cert.orgName,
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate,
          certificateUrl: cert.certificateUrl || ''
        });
      }
    } catch (error) {
      toast.error('Error loading certificate');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const certificateData = {
        ...formData,
        user: { id: user.id }
      };
      const response = await updateCertificate(certificateData);
      toast.success(response);
      setTimeout(() => navigate('/user/view-certificates'), 1500);
    } catch (error) {
      toast.error(error.response?.data || 'Failed to update certificate');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <UserNavBar />
      <div style={{ padding: '40px 5%', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>Update Certificate</h1>
        <div style={{ background: 'white', borderRadius: '10px', padding: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Certificate Name</label>
              <input type="text" name="certName" value={formData.certName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Organization Name</label>
              <input type="text" name="orgName" value={formData.orgName} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Issue Date</label>
              <input type="date" name="issueDate" value={formData.issueDate} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Expiry Date</label>
              <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Certificate URL (Optional)</label>
              <input type="url" name="certificateUrl" value={formData.certificateUrl} onChange={handleChange} placeholder="https://example.com/certificate.pdf" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ flex: 1, padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
                Update Certificate
              </button>
              <button type="button" onClick={() => navigate('/user/view-certificates')} style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCertificate;
