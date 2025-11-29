import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../api.js";

export default function Profile() {
  const { user, login, logout } = useUser();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const updateData = { name, email };
    if (password) {
      updateData.password = password;
    }

    try {
      const updatedUser = await updateUser(user._id, updateData, user.token);
      
      login(updatedUser); 
      setMessage("Profile updated successfully!");
      setPassword("");
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to permanently delete your account? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteUser(user._id, user.token);
      logout();
      navigate("/register");
    } catch (err) {
      setError(err.message || "Failed to delete account.");
    }
  };

  if (!user) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Profile</h2>
      
      {message && <p style={styles.success}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleUpdate} style={styles.form}>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={styles.input} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />

        <label>New Password (optional)</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current password" style={styles.input} />

        <button type="submit" style={styles.updateButton}>Update Profile</button>
      </form>

      <button onClick={handleDelete} style={styles.deleteButton}>Delete Account</button>
    </div>
  );
}

const styles = {
  container: { maxWidth: '500px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
  title: { textAlign: 'center', color: '#667eea', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  updateButton: { padding: '10px', background: '#667eea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' },
  deleteButton: { padding: '10px', background: '#ff5555', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' },
  error: { color: 'red', textAlign: 'center' },
  success: { color: 'green', textAlign: 'center' },
};