import express from 'express';
import Review from '../models/Review.js';
import Article from '../models/Article.js';
import News from '../models/News.js';

const router = express.Router();

// Helper function to build search query excluding author and date fields
const buildSearchQuery = (searchTerm) => {
  const regex = new RegExp(searchTerm, 'i'); // case-insensitive search
  return {
    $or: [
      { title: regex },
      { category: regex },
      // Fields that may exist in any of the models
      { brand: regex },
      { overview: regex },
      { exterior: regex },
      { interior: regex },
      { performance: regex },
      { safety: regex },
      { price: regex },
      { engine: regex },
      { drivetrain: regex },
      { transmission: regex },
      { fuelEconomy: regex },
      { seatingCapacity: regex },
      { singleprice: regex },
      { subtitle: regex },
      { description: regex },
      { summary: regex },
      // For any nested arrays of text content
      { 'subtitle': { $elemMatch: { $regex: regex } } },
      { 'description': { $elemMatch: { $regex: regex } } }
    ]
  };
};

// Search across all collections
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchQuery = buildSearchQuery(q);
    
    // Search in parallel across all collections
    const [reviews, articles, news] = await Promise.all([
      Review.find(searchQuery),
      Article.find(searchQuery),
      News.find(searchQuery).catch(() => []) // Handle if News model doesn't exist
    ]);

    res.json({
      total: reviews.length + articles.length + (news ? news.length : 0),
      reviews,
      articles,
      news: news || []
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Error performing search', details: error.message });
  }
});

// Search only reviews
router.get('/reviews', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchQuery = buildSearchQuery(q);
    const reviews = await Review.find(searchQuery);
    
    res.json({
      total: reviews.length,
      reviews
    });
  } catch (error) {
    console.error('Review search error:', error);
    res.status(500).json({ error: 'Error searching reviews', details: error.message });
  }
});

// Search only articles
router.get('/articles', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchQuery = buildSearchQuery(q);
    const articles = await Article.find(searchQuery);
    
    res.json({
      total: articles.length,
      articles
    });
  } catch (error) {
    console.error('Article search error:', error);
    res.status(500).json({ error: 'Error searching articles', details: error.message });
  }
});

// Search only news
router.get('/news', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const searchQuery = buildSearchQuery(q);
    const news = await News.find(searchQuery);
    
    res.json({
      total: news.length,
      news
    });
  } catch (error) {
    console.error('News search error:', error);
    res.status(500).json({ error: 'Error searching news', details: error.message });
  }
});

// Advanced search with filters
router.get('/advanced', async (req, res) => {
  try {
    const { q, collection, category, brand } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({ error: 'Search query is required' });
    }

    let searchQuery = buildSearchQuery(q);
    
    // Add additional filters if provided
    if (category) {
      searchQuery.category = new RegExp(category, 'i');
    }
    
    if (brand) {
      searchQuery.brand = new RegExp(brand, 'i');
    }
    
    // Determine which collection(s) to search
    let results = {};
    
    if (!collection || collection === 'all') {
      const [reviews, articles, news] = await Promise.all([
        Review.find(searchQuery),
        Article.find(searchQuery),
        News.find(searchQuery).catch(() => [])
      ]);
      
      results = {
        total: reviews.length + articles.length + (news ? news.length : 0),
        reviews,
        articles,
        news: news || []
      };
    } else if (collection === 'reviews') {
      const reviews = await Review.find(searchQuery);
      results = { total: reviews.length, reviews };
    } else if (collection === 'articles') {
      const articles = await Article.find(searchQuery);
      results = { total: articles.length, articles };
    } else if (collection === 'news') {
      const news = await News.find(searchQuery);
      results = { total: news.length, news };
    }
    
    res.json(results);
  } catch (error) {
    console.error('Advanced search error:', error);
    res.status(500).json({ error: 'Error performing advanced search', details: error.message });
  }
});

export default router;
