import Review from "../models/reviewModel.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  const { content } = req.body;

  if (!req.user) return res.status(401).json({ message: "Not authorized" });

  try {
    const review = await Review.create({ content, user: req.user._id });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to edit" });

    review.content = content || review.content;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;

  try {
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized to delete" });

    await review.remove();
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
