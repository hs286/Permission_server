import express from "express";
import {
  addNewBloginDB,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controller/BlogController.js";
import multer from "multer";
import { CheckPermission } from "../controller/PermissionController.js";


const upload=multer({dest:'upload/'})
const route = express.Router();

route.post("/",upload.single('file'),CheckPermission, addNewBloginDB);
route.get("/", getAllBlogs);
route.get("/:id", getBlogById);
route.put("/:id", updateBlog);
route.delete("/:id", deleteBlog);

export default route;
