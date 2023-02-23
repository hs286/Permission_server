import express from "express";
import {
  addnewAssignmentsinDB,
  getAllAssignments,
  updateBlog,
  deleteBlog,
  getBlogById,
} from "../controller/AssignmentController.js";
import multer from "multer";
import { CheckPermission } from "../controller/PermissionController.js";


const upload=multer({dest:'upload/'})
const route = express.Router();

route.post("/",upload.single('file'),CheckPermission, addnewAssignmentsinDB);
route.get("/",CheckPermission, getAllAssignments);
route.get("/:id",CheckPermission, getBlogById);
route.put("/:id",CheckPermission, updateBlog);
route.delete("/:id",CheckPermission, deleteBlog);

export default route;
