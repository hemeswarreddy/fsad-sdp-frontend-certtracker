import { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import { getAllUsers, deleteUser } from '../api/admin';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchName.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(searchName.toLowerCase()) ||
        user.id.toString().includes(searchName)
      );
      setFilteredUsers(filtered);
    }
  }, [searchName, users]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      toast.error('Error fetching users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? Note: Users with certificates cannot be deleted.')) {
      try {
        const response = await deleteUser(id);
        toast.success(response);
        fetchUsers();
      } catch (error) {
        if (error.response?.status === 500) {
          toast.error('Cannot delete user: This user has certificates. Please delete all certificates first.');
        } else {
          toast.error(error.response?.data || error.message || 'Error deleting user');
        }
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <AdminNavBar />
      <div style={{ padding: '40px 5%' }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', color: '#667eea', marginBottom: '20px' }}>All Users</h1>
        
        {/* Search Box */}
        <div style={{ marginBottom: '20px' }}>
          <input 
            type="text" 
            placeholder="Search by name or ID..." 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ width: '100%', maxWidth: '400px', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', fontSize: '14px' }}
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
                  <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Gender</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Username</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Contact</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Registered At</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                      {searchName ? 'No users found matching your search' : 'No users found'}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '15px' }}>{user.id}</td>
                      <td style={{ padding: '15px' }}>{user.name}</td>
                      <td style={{ padding: '15px' }}>{user.gender}</td>
                      <td style={{ padding: '15px' }}>{user.email}</td>
                      <td style={{ padding: '15px' }}>{user.username}</td>
                      <td style={{ padding: '15px' }}>{user.Contact}</td>
                      <td style={{ padding: '15px' }}>{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'N/A'}</td>
                      <td style={{ padding: '15px' }}>
                        <button onClick={() => handleDelete(user.id)} style={{ padding: '8px 16px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                          Delete
                        </button>
                      </td>
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

export default ViewAllUsers;
