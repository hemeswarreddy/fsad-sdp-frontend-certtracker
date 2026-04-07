const Footer = () => {
  return (
    <footer style={{ padding: '50px 5%', background: '#2c3e50', color: 'white', marginTop: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '30px' }}>
        <div>
          <h3 style={{ marginBottom: '15px', fontSize: 'clamp(16px, 2.5vw, 20px)' }}>🎓 Certification Tracker</h3>
          <p style={{ fontSize: 'clamp(12px, 2vw, 14px)', color: '#bbb', lineHeight: '1.6' }}>
            Your trusted platform for managing professional certifications.
          </p>
        </div>
        <div>
          <h4 style={{ marginBottom: '15px', fontSize: 'clamp(14px, 2.5vw, 18px)' }}>Quick Links</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: 'clamp(12px, 2vw, 14px)' }}>
            <a href="#" style={{ color: '#bbb', textDecoration: 'none' }}>Features</a>
            <a href="#" style={{ color: '#bbb', textDecoration: 'none' }}>About Us</a>
            <a href="#" style={{ color: '#bbb', textDecoration: 'none' }}>Contact</a>
          </div>
        </div>
        <div>
          <div style={{ marginBottom: '10px', fontSize: 'clamp(12px, 2vw, 14px)' }}>📧 certtracker@gmail.com</div>
          <div style={{ marginBottom: '10px', fontSize: 'clamp(12px, 2vw, 14px)' }}>📞 +91 98765 43210</div>
          <div style={{ fontSize: 'clamp(12px, 2vw, 14px)' }}>📍 Hyderabad, India</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #444', fontSize: 'clamp(11px, 2vw, 14px)', color: '#bbb' }}>
        © 2026 Certification Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
