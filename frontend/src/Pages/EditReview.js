import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";
import Select from "react-select";
import Navbar from "../Components/Navbar";

// Animation Variants
const slideVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

// Font Options for react-select
const fontOptions = [
  { value: "poppins", label: "Poppins" },
  { value: "russoone", label: "Russo One" },
  { value: "kdamThmorPro", label: "Kdam Thmor Pro" },
  { value: "lorniasolid", label: "Londrina Solid" },
  { value: "bebasneue", label: "Bebas Neue" },
  { value: "bricolagegrotesque", label: "Bricolage Grotesque" },
  { value: "kanit", label: "Kanit" },
];

// EditReview Component
const EditReview = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the review ID from the route parameters
  const [review, setReview] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
  const [fontSize, setFontSize] = useState(16);

  const [engine, setEngine] = useState("");
  const [drivetrain, setDrivetrain] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelEconomy, setFueleconomy] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [singleprice, setSingleprice] = useState("");

  // Fetch review data by ID
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/get/${id}`);
        const data = response.data;

        setReview(data);
        setImageUrls(data.images || []);
        setSelectedFont(fontOptions.find((font) => font.value === data.font) || fontOptions[0]);
        setFontSize(data.fontSize || 16);

        setEngine(data.engine || "");
        setDrivetrain(data.drivetrain || "");
        setTransmission(data.transmission || "");
        setFueleconomy(data.fuelEconomy || "");
        setSeatingCapacity(data.seatingCapacity || "");
        setSingleprice(data.singleprice || "");
      } catch (err) {
        console.error(err);
        alert("Error fetching review data");
      }
    };

    fetchReview();
  }, [id]);

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedReview = {
        ...review,
        images: imageUrls,
        font: selectedFont.value,
        fontSize,
        engine,
        drivetrain,
        transmission,
        fuelEconomy,
        seatingCapacity,
        singleprice,
      };

      const response = await axios.put(
        `http://localhost:5000/api/reviews/update/${id}`,
        updatedReview
      );
      console.log(response.data);
      alert("Review updated successfully!");
      navigate("/Reviews");
    } catch (err) {
      console.error(err);
      alert("Error updating review");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  return (
    <div className="relative min-h-screen w-full bg-baseextra5 flex flex-col items-center">
      <Navbar />
      <div className="pt-16 flex flex-col items-center w-full p-4">
        <motion.div
          className="bg-baseextra4 shadow-lg rounded-lg p-8 w-full max-w-2xl relative border-2 border-baseprimary"
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          transition={{ type: "spring", stiffness: 120, damping: 10 }}
        >
          <h2 className="text-white font-russoone text-3xl font-bold text-center mb-6">
            Edit Review
          </h2>
          <div className="w-1/2 h-1 bg-baseprimary animate-pulse mx-auto mb-6"></div>
          <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={review.title || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={review.category || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={review.brand || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Image URLs
              </label>
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Enter image URL"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeImageUrlField(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImageUrlField}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Image URL
              </button>
            </div>
            <div className="grid grid-cols-2 h-auto w-auto gap-3 items-center">
              <label className="block text-white font-semibold mb-2">
                Engine
              </label>
              <input
                type="text"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />

              <label className="block text-white font-semibold mb-2">
                Drivetrain
              </label>
              <input
                type="text"
                value={drivetrain}
                onChange={(e) => setDrivetrain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />

              <label className="block text-white font-semibold mb-2">
                Transmission
              </label>
              <input
                type="text"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />

              <label className="block text-white font-semibold mb-2">
                Fuel Economy
              </label>
              <input
                type="text"
                value={fuelEconomy}
                onChange={(e) => setFueleconomy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />

              <label className="block text-white font-semibold mb-2">
                Seating Capacity
              </label>
              <input
                type="text"
                value={seatingCapacity}
                onChange={(e) => setSeatingCapacity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />

              <label className="block text-white font-semibold mb-2">
                Single Price
              </label>
              <input
                type="text"
                value={singleprice}
                onChange={(e) => setSingleprice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Overview:
              </label>
              <textarea
                name="overview"
                value={review.overview || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                rows="5"
                style={{
                  fontFamily: selectedFont.value,
                  fontSize: `${fontSize}px`,
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Exterior:
              </label>
              <textarea
                name="exterior"
                value={review.exterior || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                rows="5"
                style={{
                  fontFamily: selectedFont.value,
                  fontSize: `${fontSize}px`,
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Interior:
              </label>
              <textarea
                name="interior"
                value={review.interior || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                rows="5"
                style={{
                  fontFamily: selectedFont.value,
                  fontSize: `${fontSize}px`,
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Performance:
              </label>
              <textarea
                name="performance"
                value={review.performance || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                rows="5"
                style={{
                  fontFamily: selectedFont.value,
                  fontSize: `${fontSize}px`,
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Price:
              </label>
              <textarea
                name="price"
                value={review.price || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                rows="5"
                style={{
                  fontFamily: selectedFont.value,
                  fontSize: `${fontSize}px`,
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Safety:
              </label>
              <textarea
                name="safety"
                value={review.safety || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                rows="5"
                style={{
                  fontFamily: selectedFont.value,
                  fontSize: `${fontSize}px`,
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Font:
              </label>
              <Select
                value={selectedFont}
                onChange={setSelectedFont}
                options={fontOptions}
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Font Size:
              </label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-baseprimary text-white rounded-lg hover:bg-baseextra5 transition duration-300"
            >
              Update Review
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditReview;
