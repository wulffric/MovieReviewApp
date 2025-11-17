import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId }).populate("user");
    res.json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};
