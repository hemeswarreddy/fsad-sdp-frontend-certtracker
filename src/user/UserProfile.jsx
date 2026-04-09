import { useEffect, useState } from 'react';
import UserNavBar from './UserNavBar';
import { getUserByUsername, updateUserProfile } from '../api/user';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './UserTheme.css';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    id: user?.id || '',
    name: user?.name || '',
    gender: user?.gender || '',
    email: user?.email || '',
    username: user?.username || '',
    Contact: user?.Contact || user?.contact || ''
  });
  const [formData, setFormData] = useState({
    id: user?.id || '',
    name: user?.name || '',
    Contact: user?.Contact || user?.contact || ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.username) return;
      try {
        const data = await getUserByUsername(user.username);
        setProfileData({
          id: data?.id || user?.id || '',
          name: data?.name || '',
          gender: data?.gender || '',
          email: data?.email || '',
          username: data?.username || user?.username || '',
          Contact: data?.Contact || data?.contact || ''
        });
        setFormData({
          id: data?.id || user?.id || '',
          name: data?.name || '',
          Contact: data?.Contact || data?.contact || ''
        });
      } catch (error) {
        setProfileData({
          id: user?.id || '',
          name: user?.name || '',
          gender: user?.gender || '',
          email: user?.email || '',
          username: user?.username || '',
          Contact: user?.Contact || user?.contact || ''
        });
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: formData.id,
        name: formData.name,
        Contact: formData.Contact
      };
      const response = await updateUserProfile(payload);
      setProfileData((prev) => ({ ...prev, ...payload }));
      setIsEditing(false);
      toast.success(response);
    } catch (error) {
      toast.error(error.response?.data || 'Update failed');
    }
  };

  return (
    <div className="user-page user-page-profile">
      <UserNavBar />
      <div className="user-shell user-form-wrap">
        <h1 className="user-title">My Profile</h1>
        <p className="user-subtitle">View your details first, then update only the allowed fields when needed.</p>
        <div className="user-card user-form-card user-form-card-profile">
          {!isEditing ? (
            <div>
              <div className="user-form-section-title">Profile Details</div>
              <div className="user-field">
                <label>Full Name</label>
                <p>{profileData.name || '-'}</p>
              </div>
              <div className="user-field">
                <label>Gender</label>
                <p>{profileData.gender || '-'}</p>
              </div>
              <div className="user-field">
                <label>Email</label>
                <p>{profileData.email || '-'}</p>
              </div>
              <div className="user-field">
                <label>Username</label>
                <p>{profileData.username || '-'}</p>
              </div>
              <div className="user-field">
                <label>Contact Number</label>
                <p>{profileData.Contact || '-'}</p>
              </div>
              <button type="button" onClick={() => setIsEditing(true)} className="user-btn user-btn-primary user-btn-block">
                Update Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="user-form-section-title">Editable Details</div>
              <div className="user-field">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="user-input" />
              </div>
              <div className="user-field">
                <label>Contact Number</label>
                <input type="text" name="Contact" value={formData.Contact} onChange={handleChange} required className="user-input" />
              </div>
              <div className="user-btn-row">
                <button type="submit" className="user-btn user-btn-primary user-cert-action-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      id: profileData.id,
                      name: profileData.name,
                      Contact: profileData.Contact
                    });
                    setIsEditing(false);
                  }}
                  className="user-btn user-btn-secondary user-cert-action-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
