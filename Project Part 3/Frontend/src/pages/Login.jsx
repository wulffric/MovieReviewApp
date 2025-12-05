import { useState } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Login() {
  const { login } = useUser();
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // save user in context
      login(data);

      // redirect to home using React Router's navigate function (No full page reload!)
      navigate("/"); // Recommended: redirect to the root path "/" 
                     // (or use navigate("/home") if you prefer that route)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>
        Not registered? 
        {/* Use Link or navigate in the future, but for now, we'll leave the anchor tag */}
        <a href="/register" style={{ color: "#fff" }}>Sign Up</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
  },
  title: { fontSize: "2rem", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "15px", width: "300px" },
  input: { padding: "12px", borderRadius: "8px", border: "none", outline: "none" },
  button: { padding: "12px", borderRadius: "8px", background: "#fff", color: "#333", fontWeight: "bold", cursor: "pointer" },
  error: { color: "red" },
};