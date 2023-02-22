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
route.get("/",CheckPermission, getAllBlogs);
route.get("/:id",CheckPermission, getBlogById);
route.put("/:id",CheckPermission, updateBlog);
route.delete("/:id",CheckPermission, deleteBlog);

export default route;
