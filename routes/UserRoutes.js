import express from 'express';
import { addNewUserInDb,checkLogin } from "../controller/UserController.js";

const route =express.Router();

route.post('/',checkLogin)
route.post('/',addNewUserInDb)

export default route;