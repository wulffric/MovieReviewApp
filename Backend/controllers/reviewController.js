import Review from "../models/Review.js";

const createReview = async (req, res) => {
  try {
    const { movie, rating, comment } = req.body;

    if (!movie || !rating) {
      return res.status(400).json({ message: "Movie and rating are required" });
    }

    const review = new Review({
      user: req.user._id,
      movie,
      rating,
      comment,
    });

    const createdReview = await review.save();
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewsByMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate("user", "name email");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized" });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString()) return res.status(403).json({ message: "Not authorized" });

    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createReview, getReviewsByMovie, updateReview, deleteReview };
