import { useNavigate } from 'react-router-dom';
import MainNavBar from '../components/MainNavBar';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, width: '100%', overflowX: 'hidden' }}>
      <MainNavBar />

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '60px 5%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <div style={{ fontSize: 'clamp(12px, 2vw, 14px)', marginBottom: '10px' }}>✨Trusted by 10,000+ Professionals</div>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', margin: '20px 0', lineHeight: '1.2' }}>Track and Manage Your Professional Certifications</h1>
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', marginBottom: '30px', maxWidth: '800px', margin: '0 auto 30px' }}>Stay organized and never miss a certification renewal. Keep your career credentials up-to-date with our intelligent tracking platform.</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} style={{ padding: '15px 30px', fontSize: 'clamp(14px, 2vw, 16px)', cursor: 'pointer', background: 'white', color: '#667eea', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}>Get Started Free</button>
        </div>
        <div style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>
          <div>✅ No credit card required</div>
          <div>✅ Free forever plan</div>
          <div>✅ Cancel anytime</div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '30px', padding: '50px 5%', background: '#f8f9fa' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 'bold', color: '#667eea' }}>10K+</div>
          <div style={{ fontSize: 'clamp(12px, 2vw, 16px)' }}>Active Users</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 'bold', color: '#667eea' }}>50K+</div>
          <div style={{ fontSize: 'clamp(12px, 2vw, 16px)' }}>Certifications Tracked</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 'bold', color: '#667eea' }}>99.9%</div>
          <div style={{ fontSize: 'clamp(12px, 2vw, 16px)' }}>Uptime</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 'bold', color: '#667eea' }}>24/7</div>
          <div style={{ fontSize: 'clamp(12px, 2vw, 16px)' }}>Support</div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 36px)', marginBottom: '10px' }}>Why Choose Our Platform?</h2>
        <p style={{ color: '#666', marginBottom: '50px', fontSize: 'clamp(14px, 2vw, 16px)' }}>Everything you need to manage your professional certifications</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
          <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
            <h3 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', marginBottom: '10px' }}>Track Certification Details</h3>
            <p style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 15px)' }}>Keep all your professional certifications organized in one secure place with detailed information.</p>
          </div>
          <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>⏰</div>
            <h3 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', marginBottom: '10px' }}>Monitor Expiry Dates</h3>
            <p style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 15px)' }}>Never miss a renewal deadline with our intelligent expiry date tracking system.</p>
          </div>
          <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔔</div>
            <h3 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', marginBottom: '10px' }}>Get Renewal Reminders</h3>
            <p style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 15px)' }}>Receive timely notifications before your certifications expire to stay ahead.</p>
          </div>
          <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🔒</div>
            <h3 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', marginBottom: '10px' }}>Store Certificates Securely</h3>
            <p style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 15px)' }}>Upload and store your certificate documents safely with encrypted cloud storage.</p>
          </div>
          <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📊</div>
            <h3 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', marginBottom: '10px' }}>Analytics & Reports</h3>
            <p style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 15px)' }}>Get detailed insights and reports on your certification portfolio and renewal trends.</p>
          </div>
          <div style={{ padding: '30px', border: '1px solid #eee', borderRadius: '10px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🌐</div>
            <h3 style={{ fontSize: 'clamp(16px, 2.5vw, 20px)', marginBottom: '10px' }}>Multi-Platform Access</h3>
            <p style={{ color: '#666', fontSize: 'clamp(13px, 2vw, 15px)' }}>Access your certifications anytime, anywhere from any device with cloud synchronization.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
