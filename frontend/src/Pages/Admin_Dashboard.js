import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link} from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import arrowRight from "../assests/arrow-right.svg";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const AdminDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);




  useEffect(() => {



    const fetchData = async () => {
      try {
        const [articlesResponse, reviewsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/articles/get"),
          axios.get("http://localhost:5000/api/reviews/get"),
        ]);

        setArticles(articlesResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },);

  const deleteArticle = async (articleId) => {
    try {
      await axios.delete(`/api/articles/${articleId}`);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );
      alert("Article deleted successfully!");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article");
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review");
    }
  };

  return (
    <div className="relative h-screen w-full bg-baseextra5">
      <Navbar />
      <div className="pt-16 flex flex-col h-full w-full p-4">
        <div className="flex w-full gap-4 mb-4 relative">
          <div className="flex-1 flex flex-col items-center p-4 relative">
            <div className="w-full min-h-[400px] rounded-lg shadow-lg bg-baseextra4 flex flex-col items-center justify-start relative overflow-hidden border-2 border-baseprimary">
              <h2 className="text-white font-russoone text-3xl font-bold mt-4 mb-2">
                Articles
              </h2>
              <div className="w-1/2 h-1 bg-baseprimary animate-pulse"></div>
              <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-baseprimary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto h-full w-full">
                  {articles.map((article) => (
                    <motion.div
                      key={article._id}
                      className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden border border-baseprimary transition-transform duration-300 transform hover:scale-105"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Category: {article.category}
                      </p>
                      <p className="text-gray-600">Author: {article.author}</p>
                      <button
                        className="mt-2 text-sm text-red-500 hover:underline"
                        onClick={() => deleteArticle(article._id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit-article/${article._id}`}
                        className="ml-4 text-sm text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
                    </motion.div>
                  ))}
                </div>
              )}
              <Link to="/articles" className="absolute bottom-4 right-4">
                <img
                  src={arrowRight}
                  alt="Arrow Right"
                  className="w-12 h-12 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:glow-effect"
                  style={{
                    filter: "invert(1) sepia(1) saturate(5) hue-rotate(150deg)",
                  }}
                />
              </Link>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center p-4 relative">
            <div className="w-full min-h-[400px] rounded-lg shadow-lg bg-baseextra4 flex flex-col items-center justify-start relative overflow-hidden border-2 border-baseprimary">
              <h2 className="text-white font-russoone text-3xl font-bold mt-4 mb-2">
                Reviews
              </h2>
              <div className="w-1/2 h-1 bg-baseprimary animate-pulse"></div>
              <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-baseprimary"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-y-auto h-full w-full">
                  {reviews.map((review) => (
                    <motion.div
                      key={review._id}
                      className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden border border-baseprimary transition-transform duration-300 transform hover:scale-105"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {review.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Category: {review.category}
                      </p>
                      <p className="text-gray-700 mb-2">{review.description}</p>
                      <p className="text-gray-600">Author: {review.author}</p>
                      <button
                        className="mt-2 text-sm text-red-500 hover:underline"
                        onClick={() => deleteReview(review._id)}
                      >
                        Delete
                      </button>
                      <Link
                        to={`/edit-review/${review._id}`}
                        className="ml-4 text-sm text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
                    </motion.div>
                  ))}
                </div>
              )}
              <Link to="/review" className="absolute bottom-4 right-4">
                <img
                  src={arrowRight}
                  alt="Arrow Right"
                  className="w-12 h-12 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:glow-effect"
                  style={{
                    filter: "invert(1) sepia(1) saturate(5) hue-rotate(150deg)",
                  }}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Logins Container */}
        <div className="w-full flex justify-center relative">
          <div className="w-full h-[200px] rounded-lg shadow-lg bg-baseextra4 flex flex-col items-center justify-start relative overflow-hidden border-2 border-baseprimary">
            <h2 className="text-white font-russoone text-3xl font-bold mt-4 mb-2">
              Logins
            </h2>
            <div className="w-1/2 h-1 bg-baseprimary animate-pulse"></div>
            <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
            {/* Arrow Icon with Link */}
            <Link to="/users" className="absolute bottom-4 right-4">
              <img
                src={arrowRight}
                alt="Arrow Right"
                className="w-12 h-12 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:glow-effect"
                style={{
                  filter: "invert(1) sepia(1) saturate(5) hue-rotate(150deg)",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
