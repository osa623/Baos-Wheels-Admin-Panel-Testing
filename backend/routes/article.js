import express from "express";
import Article from "../models/Article.js";

const router = express.Router();


router.post("/add", async (req, res) => {
  const {title, category, subtitle, description,summary, author, images} = req.body;

  if (!images || images.length === 0) {
    return res.status(400).json({ error: "No image URLs provided" });
  }

  try {
    const newArticle = new Article({
      title,
      category,
      images,
      subtitle,
      description,
      summary,
      author,
    });

    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (err) {
    console.error("Error creating article:", err.message);
    res.status(500).send("Server error");
  }
});


router.get("/get", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error("Error fetching articles:", err.message);
    res.status(500).send("Server error");
  }
});


router.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (err) {
    console.error("Error fetching article:", err.message);
    res.status(500).send("Server error");
  }
});

{/* fetch related articles */}
router.get("/category/:category", async (req,res) =>{

    try {
      
      const {category} = req.params;
      const articles   = await Article.find();

      if(articles.length == 0 ){
        return res.status(404).json({error: "No Articles found for your requested category"});
      }
      res.json(articles);

    } catch (error) {
      
        console.error("Error Fetching Articles by your requested category", error.message);
        res.status(505).json({message: "Server error while fetching reviews"})
    }

});


router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, description, author, images } = req.body;

  if (!images || images.length === 0) {
    return res.status(400).json({ error: "No image URLs provided" });
  }

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, category, images, description, author },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (err) {
    console.error("Error updating article:", err.message);
    res.status(500).send("Server error");
  }
});


router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error("Error deleting article:", err.message);

    res.status(500).send("Server error");
  }
});

export default router;
