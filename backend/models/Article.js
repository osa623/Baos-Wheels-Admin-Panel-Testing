import mongoose from "mongoose";


const ArticleSchema = new mongoose.Schema(
  {
    createdDate: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true, 
    },
    images: {
      type: [String], 
      default: [],
    },
    
    subtitle:{
      type:[String],
      default:[]
    },

    description: {
      type: [String],
      default: [],
    },

    summary:{
      type:String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model("Article", ArticleSchema);
