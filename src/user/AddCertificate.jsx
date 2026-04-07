import { useState } from 'react';
import UserNavBar from './UserNavBar';
import { addCertificate } from '../api/certificate';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const AddCertificate = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    certName: '',
    orgName: '',
    issueDate: '',
    expiryDate: '',
    certificateUrl: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user ID exists
    if (!user?.id) {
      toast.error('User ID not found. Please logout and login again.');
      return;
    }
    
    try {
      const certificateData = {
        certName: formData.certName,
        orgName: formData.orgName,
        issueDate: formData.issueDate,
        expiryDate: formData.expiryDate,
        certificateUrl: formData.certificateUrl,
        user: { id: user.id }
      };
      console.log('Sending certificate data:', certificateData);
      const response = await addCertificate(certificateData);
      toast.success(response);
      setFormData({ certName: '', orgName: '', issueDate: '', expiryDate: '', certificateUrl: '' });
    } catch (error) {
      console.error('Add certificate error:', error);
      toast.error(error.response?.data || 'Failed to add certificate');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <UserNavBar />
      <div style={{ padding: '40px 5%', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>Add Certificate</h1>
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
            <button type="submit" style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              Add Certificate
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
