import express from "express";
import News from "../models/News.js";

const router = express.Router();

// GET all news articles
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET news article by ID
router.get("/:id", async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new news article
router.post("/", async (req, res) => {
  try {
    const newNews = new News(req.body);
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE news article
router.put("/:id", async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedNews) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE news article
router.delete("/:id", async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ message: "News article not found" });
    }
    res.status(200).json({ message: "News article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET news by category
router.get("/category/:category", async (req, res) => {
  try {
    const news = await News.find({ category: req.params.category }).sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
