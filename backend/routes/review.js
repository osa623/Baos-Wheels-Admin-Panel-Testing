import express from "express";
import mongoose from "mongoose";
import Review from "../models/Review.js";

const router = express.Router();

// Create a new review
router.post("/add", async (req, res) => {
  const { title, category, brand, images, overview, exterior, interior, performance, safety, price, engine, drivetrain, transmission, fuelEconomy, seatingCapacity, singleprice, author } = req.body;

  if (!images || images.length === 0) {
    return res.status(400).json({ error: "No image URLs provided" });
  }

  try {
    const newReview = new Review({
      title,
      category,
      brand,
      images,
      overview,
      exterior,
      interior,
      performance,
      safety,
      price,
      engine,
      drivetrain,
      transmission,
      fuelEconomy,
      seatingCapacity,
      singleprice,
      author,
    });

    const review = await newReview.save();
    res.status(201).json(review);
  } catch (err) {
    console.error("Error creating review:", err.message);
    res.status(500).json({ message: "Server error while creating review" });
  }
});

// Fetch reviews by brand
router.get("/brand/:brand", async (req, res) => {
  try {
    const { brand } = req.params;
    console.log("Fetching reviews for brand:", brand);
    const reviews = await Review.find({ brand: { $regex: new RegExp(`^${brand}$`, 'i') } });

    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this brand" });
    }

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews by brand:", err.message);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
});

// Fetch reviews by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const reviews = await Review.find({ category });

    if (reviews.length === 0) {
      return res.status(404).json({ error: "No reviews found for this category" });
    }

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews by category:", err.message);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
});

// Fetch all reviews
router.get("/get", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
});

// Fetch review by ID
router.get("/get/:id", async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    res.json(review);
  } catch (err) {
    console.error("Error fetching review by ID:", err.message);
    res.status(500).json({ message: "Server error while fetching review" });
  }
});

// Update review by ID
router.put("/update/:id", async (req, res) => {
  const { title, category, brand, images, overview, exterior, interior, performance, safety, price, engine, drivetrain, transmission, fuelEconomy, seatingCapacity, singleprice, author } = req.body;

  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ msg: "Review not found" });
    }

    review.title = title || review.title;
    review.category = category || review.category;
    review.brand = brand || review.brand;
    review.images = images || review.images;
    review.overview = overview || review.overview;
    review.exterior = exterior || review.exterior;
    review.interior = interior || review.interior;
    review.performance = performance || review.performance;
    review.safety = safety || review.safety;
    review.price = price || review.price;
    review.engine = engine || review.engine;
    review.drivetrain = drivetrain || review.drivetrain;
    review.transmission = transmission || review.transmission;
    review.fuelEconomy = fuelEconomy || review.fuelEconomy;
    review.seatingCapacity = seatingCapacity || review.seatingCapacity;
    review.singleprice = singleprice || review.singleprice;
    review.author = author || review.author;

    await review.save();
    res.json(review);
  } catch (err) {
    console.error("Error updating review:", err.message);
    res.status(500).json({ message: "Server error while updating review" });
  }
});

// Delete review by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log(`Delete request received for ID: ${req.params.id}`);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: "Invalid review ID" });
    }

    const result = await Review.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ msg: "Review not found" });
    }

    console.log(`Review with ID ${req.params.id} removed successfully.`);
    res.json({ msg: "Review removed" });
  } catch (err) {
    console.error("Error deleting review:", err.message);
    res.status(500).json({
      message: "Server error while deleting review",
      error: err.message,
    });
  }
});

export default router;
