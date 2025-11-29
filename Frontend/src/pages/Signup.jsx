import { useState } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

export default function Signup() {
  const { login } = useUser();
  const navigate = useNavigate(); // 2. Initialize useNavigate
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      // save user in context
      login(data);

      // 3. Redirect to home using React Router's navigate function
      navigate("/"); // Redirect to the canonical home path (or use navigate("/home"))
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
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
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p>
        Already have an account? 
        <a href="/login" style={{ color: "#fff" }}>Login</a>
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