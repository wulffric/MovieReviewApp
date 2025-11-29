import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";

export default function Navbar() {
  const { user, logout } = useUser();

  return (
    <div style={styles.navBar}>
      <div style={styles.top}>
        <h1 style={styles.title}>🎬 Movie Review</h1>
      </div>

      <div style={styles.linksContainer}>
        <Link to="/home" style={styles.link}>Home</Link>
        <Link to="/reviews" style={styles.link}>Reviews</Link>

        {!user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Sign Up</Link>
          </>
        )}

        {user && (
          <>
            <Link to="/addreview" style={styles.link}>Add Review</Link>
            <Link to="/profile" style={styles.link}>My Profile</Link>
            <button onClick={logout} style={styles.logoutButton}>Sign Out</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    borderBottom: "2px solid #667eea",
    backgroundColor: "#fff",
  },
  top: { display: "flex", alignItems: "center" },
  title: { fontSize: "1.8rem", fontWeight: "bold", color: "#333" },
  linksContainer: { display: "flex", gap: "20px", alignItems: "center" },
  link: { textDecoration: "none", color: "#667eea", fontWeight: "600" },
  logoutButton: { background: "transparent", border: "none", color: "#667eea", cursor: "pointer", fontWeight: "600" },
};
