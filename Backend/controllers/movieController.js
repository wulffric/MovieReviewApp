import Movie from "../models/Movie.js";

export const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json(error);
  }
};
