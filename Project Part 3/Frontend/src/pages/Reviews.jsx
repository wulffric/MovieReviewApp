import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { getReviews, addReview, updateReview, deleteReview } from "../api.js";

export default function Reviews() {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const [fetchError, setFetchError] = useState(null); // Added fetch error state
  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState(null); // Added form error state

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setFetchError("Could not load reviews. Please check your server connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    if (!user) {
      alert("Please log in to add/edit a review.");
      return;
    }

    try {
      if (editId) {
        await updateReview(editId, { title: formTitle, content: formContent }, user.token);
        setEditId(null);
      } else {
        await addReview({ title: formTitle, content: formContent }, user.token);
      }

      // Clear state and fetch reviews on success
      setFormTitle("");
      setFormContent("");
      setShowForm(false);
      fetchReviews();

    } catch (error) {
      setFormError(error.message || "An unexpected error occurred during submission.");
    }
  };

  const handleEdit = (review) => {
    setEditId(review._id);
    setFormTitle(review.title);
    setFormContent(review.content);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!user) return;
    if (window.confirm("Delete this review?")) {
      try {
        await deleteReview(id, user.token);
        fetchReviews();
      } catch (error) {
        alert(`Delete failed: ${error.message}`);
      }
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Movie Reviews</h2>

      {user && !showForm && (
        <button style={styles.addBtn} onClick={() => {setShowForm(true); setFormError(null);}}>
          Add Review
        </button>
      )}

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmit}>
          {formError && <p style={{ color: 'red', textAlign: 'center' }}>{formError}</p>}
          <input
            style={styles.input}
            type="text"
            placeholder="Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
          />
          <textarea
            style={styles.textarea}
            placeholder="Content"
            value={formContent}
            onChange={(e) => setFormContent(e.target.value)}
            required
          />
          <div>
            <button type="submit" style={styles.submitBtn}>{editId ? "Update" : "Add"} Review</button>
            <button 
              type="button" 
              style={styles.cancelBtn} 
              onClick={() => { setShowForm(false); setEditId(null); setFormTitle(""); setFormContent(""); setFormError(null); }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      
      {loading && <p>Loading reviews...</p>}
      {fetchError && <p style={{ color: 'red', textAlign: 'center' }}>{fetchError}</p>}
      
      <div style={styles.reviewList}>
        {!loading && !fetchError && reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((r) => (
          <div key={r._id} style={styles.reviewCard}>
            <h3>{r.title}</h3>
            <p>{r.content}</p>
            <p style={styles.author}>By: {r.authorName}</p>
            {user && r.authorId === user._id && (
              <div style={styles.actions}>
                <button onClick={() => handleEdit(r)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(r._id)} style={styles.deleteBtn}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "20px", maxWidth: "800px", margin: "0 auto" },
  title: { textAlign: "center", marginBottom: "20px" },
  addBtn: { background: "#667eea", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "1rem" },
  textarea: { padding: "10px", fontSize: "1rem", height: "100px" },
  submitBtn: { background: "#667eea", color: "#fff", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer", marginRight: "10px" },
  cancelBtn: { background: "#ccc", color: "#333", padding: "10px 20px", border: "none", borderRadius: "6px", cursor: "pointer" },
  reviewList: { display: "flex", flexDirection: "column", gap: "15px" },
  reviewCard: { padding: "15px", border: "1px solid #ccc", borderRadius: "8px" },
  author: { fontSize: "0.8rem", color: "#555" },
  actions: { marginTop: "10px", display: "flex", gap: "10px" },
  editBtn: { background: "#ffa500", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" },
  deleteBtn: { background: "#ff5555", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer" },
};