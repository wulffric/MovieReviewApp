import { useUser } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <main style={styles.main}>
        <h1 style={styles.heroTitle}>🎬 Movie Review App</h1> 
        <p style={styles.heroSubtitle}>
          Honest opinions. Real reviews. Join the community.
        </p>
        <p style={styles.heroSubtitle}>
          This is a test paragraph for the CI/CD deployment demonstration.
        </p>
        <div style={styles.actions}>
          <a href="/reviews" style={styles.primaryButton}>Browse Reviews</a>
          {!user && <a href="/register" style={styles.secondaryButton}>Join Now</a>}
          {user && (
            <button
              style={styles.primaryButton}
              onClick={() => { logout(); navigate("/login"); }}
            >
              Sign Out
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
    margin: 0,
    padding: 0,
    fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
  main: { textAlign: "center", paddingTop: "100px", paddingBottom: "100px" },
  heroTitle: { fontSize: "3rem", fontWeight: "bold", marginBottom: "15px" },
  heroSubtitle: { fontSize: "1.4rem", marginBottom: "40px" },
  actions: { display: "flex", justifyContent: "center", gap: "20px" },
  primaryButton: {
    background: "#fff",
    color: "#333",
    padding: "14px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
  },
  secondaryButton: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    border: "2px solid #fff",
    cursor: "pointer",
  },
};


