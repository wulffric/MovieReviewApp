import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext.jsx";
import { addReview } from "../api.js"; // CORRECT: Use named import for the function

// NOTE: I am removing the unnecessary import for "../css/Reviews.css" as it wasn't provided

export default function AddReview() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return setError("Please fill all fields");

    try {
      // Use the named function directly with its required arguments: {data}, token
      await addReview(
        { title, content }, 
        user.token
      );
      
      navigate("/reviews"); // redirect back to reviews list
    } catch (err) {
      console.error(err);
      // The error message from your api.js handler will be in err.message
      setError(err.message || "Failed to add review");
    }
  };

  if (!user) return <p>You must be logged in to add a review.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add a Review</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", fontSize: "1rem" }}
          required
        />
        <textarea
          placeholder="Your Review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          style={{ padding: "10px", fontSize: "1rem" }}
          required
        />
        <button type="submit" style={{ padding: "10px", fontSize: "1rem", backgroundColor: "#667eea", color: "#fff", border: "none", borderRadius: "5px" }}>
          Submit Review
        </button>
      </form>
    </div>
  );
}