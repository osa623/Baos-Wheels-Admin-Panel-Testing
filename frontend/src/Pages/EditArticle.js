import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; 
import Select from "react-select";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";

const slideVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
};

const fontOptions = [
  { value: "poppins", label: "Poppins" },
  { value: "russoone", label: "Russo One" },
  { value: "kdamThmorPro", label: "Kdam Thmor Pro" },
  { value: "londrinasolid", label: "Londrina Solid" },
  { value: "bebasneue", label: "Bebas Neue" },
  { value: "bricolagegrotesque", label: "Bricolage Grotesque" },
  { value: "kanit", label: "Kanit" },
];

const transitionOptions = [
  { value: "fade", label: "Fade" },
  { value: "slide", label: "Slide" },
  { value: "zoom", label: "Zoom" },
];

const EditArticle = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [subTitleUrls, setSubTitleUrls] = useState([""]);
  const [descriptionUrls, setDescriptionUrls] = useState([""]);
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedFont, setSelectedFont] = useState(fontOptions[0]);
  const [fontSize, setFontSize] = useState(16);
  const [transitionType, setTransitionType] = useState(transitionOptions[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/article/get/${id}`
        );
        const articleData = response.data;
        setTitle(articleData.title);
        setCategory(articleData.category);
        setImageUrls(articleData.images || [""]);
        setSubTitleUrls(articleData.subtitle || [""]);
        setDescriptionUrls(articleData.description || [""]);
        setSummary(articleData.summary);
        setAuthor(articleData.author);
        setSelectedFont({ value: articleData.font, label: articleData.font });
        setFontSize(articleData.fontSize);
        setTransitionType({
          value: articleData.transitionType,
          label: articleData.transitionType,
        });
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...imageUrls];
    newImageUrls[index] = value;
    setImageUrls(newImageUrls);
  };

  const handleSubtitleChange = (index, value) => {
    const newSubTitleUrls = [...subTitleUrls];
    newSubTitleUrls[index] = value;
    setSubTitleUrls(newSubTitleUrls);
  };

  const handleDescriptionChange = (index, value) => {
    const newDescriptionUrls = [...descriptionUrls];
    newDescriptionUrls[index] = value;
    setDescriptionUrls(newDescriptionUrls);
  };

  const addImageUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const addSubtitleField = () => {
    setSubTitleUrls([...subTitleUrls, ""]);
  };

  const addDescriptionField = () => {
    setDescriptionUrls([...descriptionUrls, ""]);
  };

  const removeImageUrlField = (index) => {
    const newImageUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImageUrls);
  };

  const removeSubtitleField = (index) => {
    const newSubTitleUrls = subTitleUrls.filter((_, i) => i !== index);
    setSubTitleUrls(newSubTitleUrls);
  };

  const removeDescriptionField = (index) => {
    const newDescriptionUrls = descriptionUrls.filter((_, i) => i !== index);
    setDescriptionUrls(newDescriptionUrls);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const articleData = {
      title,
      category,
      subtitle: subTitleUrls,
      description: descriptionUrls,
      summary,
      author,
      images: imageUrls,
      font: selectedFont.value,
      fontSize,
      transitionType: transitionType.value,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/article/update/${id}`,
        articleData
      );
      console.log(response.data);
      alert("Article updated successfully!");
      navigate("/articles");
    } catch (err) {
      console.error(err);
      alert("Error updating article");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
            Edit Article
          </h2>
          <div className="w-1/2 h-1 bg-baseprimary animate-pulse mx-auto mb-6"></div>
          <div className="absolute inset-0 rounded-lg shadow-lg glow-effect"></div>
          <form onSubmit={handleUpdate} className="relative z-10">
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Titles
              </label>
              {subTitleUrls.map((subtitle, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => handleSubtitleChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Enter Title"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeSubtitleField(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSubtitleField}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Title
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Descriptions
              </label>
              {descriptionUrls.map((description, index) => (
                <div key={index} className="flex items-center mb-2">
                  <textarea
                    value={description}
                    onChange={(e) => handleDescriptionChange(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    placeholder="Enter Description"
                    rows="4"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeDescriptionField(index)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addDescriptionField}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
              >
                Add Description
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Summary
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                placeholder="Enter Summary"
                rows="4"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Font
              </label>
              <Select
                options={fontOptions}
                value={selectedFont}
                onChange={setSelectedFont}
                className="w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Font Size
              </label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
                Transition Type
              </label>
              <Select
                options={transitionOptions}
                value={transitionType}
                onChange={setTransitionType}
                className="w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-baseprimary text-white font-bold py-2 px-4 rounded hover:bg-baseprimarydark transition-colors duration-300"
            >
              Update Article
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditArticle;
