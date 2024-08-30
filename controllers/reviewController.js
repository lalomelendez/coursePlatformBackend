// controllers/reviewController.js

import Review from "../models/reviewModel.js";

// Obtener todas las evaluaciones
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user").populate("course");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una evaluación por ID
export const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user")
      .populate("course");
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva evaluación
export const createReview = async (req, res) => {
  const { user, course, rating, comment } = req.body;

  const newReview = new Review({
    user,
    course,
    rating,
    comment,
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar una evaluación por ID
export const updateReview = async (req, res) => {
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una evaluación por ID
export const deleteReview = async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
