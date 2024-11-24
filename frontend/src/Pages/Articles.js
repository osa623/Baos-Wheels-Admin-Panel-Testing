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

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(''); 
  const navigate = useNavigate();


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/articles/get");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchArticles();
  }, []);

  const handleClickArticle = (article_id) => {
      navigate(`/editArticle/${article_id}`)
  }


  const deleteArticle = async (articleId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/articles/delete/${articleId}`
      );

      if (response.status === 200) {
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article._id !== articleId)
        );
        alert("Article deleted successfully!");
      } else {
        throw new Error("Failed to delete article");
      }
    } catch (error) {
      console.error(
        "Error deleting article:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error deleting article: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
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
                to="/AddArticle"
                className="absolute -left-1 bg-baseprimary text-white font-russoone text-lg py-4 px-16 rounded-br-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center z-10"
              >
                Add An Article
              </Link>

              <h2 className="text-white font-russoone text-3xl font-bold mt-12 mb-2">
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

                      onClick={()=>{handleClickArticle(article._id)}}
                      key={article._id} 
                      className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden border border-baseprimary transition-transform duration-300 transform hover:scale-105"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }} >

                      <img src= {article.images[0]} alt={article.title} className="scale-90"/>

                      <h3 className="text-xl font-bold mb-2 text-gray-800">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        Category: {article.category}
                      </p>
                      <p className="text-gray-600">Author: {article.author}</p>
                      <div className="absolute bottom-4 left-4 flex space-x-2">
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300 cursor-pointer z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteArticle(article._id)
                          }}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/edit/${article._id}`} // Ensures correct passing of _id
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 cursor-pointer z-20"
                        >
                          Edit
                        </Link>
                      </div>
                      <div className="absolute bottom-4 right-4 flex items-center">
                        <button
                          className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer z-20"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedArticle(article);
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

              {selectedArticle && (
                <div className="fixed inset-0 w-full bg-black bg-opacity-75  items-center justify-center z-50 p-20">
                  <div className="flex  flex-col bg-white p-8 rounded-lg shadow-lg h-auto max-w-full w-full">
                    <h3 className="text-2xl font-bold mb-4">
                      {selectedArticle.title}
                    </h3>
                    <p className="text-lg mb-4">
                      Category: {selectedArticle.category}
                    </p>
                    <p className="text-lg mb-4">
                      {selectedArticle.description}
                    </p>
                    <p className="text-lg mb-4">
                      Author: {selectedArticle.author}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedArticle.images.map((img, index) => (
                        <img key={index}
                          src={img}
                          alt={selectedArticle.title}
                          className="w-full h-32 object-cover rounded-lg"/>
                      ))}
                    </div>
                    <button
                      className="absolute top-4 right-4 bg-gray-700 text-white rounded-full p-2"
                      onClick={() => setSelectedArticle(null)}
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

export default Articles;
