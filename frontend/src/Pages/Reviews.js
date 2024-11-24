import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import axios from "axios";
import arrowRight from "../assests/arrow-right.svg";

const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
};

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reviews/get");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const deleteReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/reviews/delete/${reviewId}`
      );

      if (response.status === 200) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== reviewId)
        );
        alert("Review deleted successfully!");
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      console.error(
        "Error deleting review:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error deleting review: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const handleUpdate = (review_id) => {
    navigate(`/editReview/${review_id}`);
  };

  return (
    <div className="relative h-screen w-full bg-baseextra5">
      <Navbar />
      <div className="pt-16 flex flex-col h-full w-full p-4">
        <div className="flex w-full gap-4 mb-4 relative">
          <motion.div
            className="flex-1 flex flex-col items-center p-4 relative"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", stiffness: 120, damping: 10 }}
          >
            <div className="w-full min-h-[600px] rounded-lg shadow-lg bg-baseextra4 flex flex-col items-center justify-start relative overflow-hidden border-2 border-baseprimary">
              <Link
                to="/AddReview"
                className="absolute -left-1 bg-baseprimary text-white font-russoone text-lg py-4 px-16 rounded-br-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center z-10"
              >
                Add A Review
              </Link>
              <h2 className="text-white font-russoone text-3xl font-bold mt-12 mb-2">
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
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {review.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Category: {review.category}
                      </p>
                      <p className="text-gray-700 mb-2">{review.description}</p>
                      <p className="text-gray-600">Author: {review.author}</p>
                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteReview(review._id);
                          }}
                        >
                          Delete
                        </button>
                        <div
                          onClick={()=>handleUpdate(review._id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer z-20"
                        >
                          Edit
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center">
                        <button
                          className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedReview(review);
                          }}
                        >
                          <img
                            src={arrowRight}
                            alt="Arrow Right"
                            className="w-6 h-6 text-white"
                          />
                        </button>
                      </div>
                      <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
                    </motion.div>
                  ))}
                </div>
              )}
              {selectedReview && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                    <h3 className="text-2xl font-bold mb-4">
                      {selectedReview.title}
                    </h3>
                    <p className="text-lg mb-4">
                      Category: {selectedReview.category}
                    </p>
                    <p className="text-lg mb-4">{selectedReview.description}</p>
                    <p className="text-lg mb-4">
                      Author: {selectedReview.author}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedReview.images.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={selectedReview.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                    <button
                      className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-2"
                      onClick={() => setSelectedReview(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
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
  );
};

export default Review;
