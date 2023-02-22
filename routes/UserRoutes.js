
import express from 'express';
import { addNewUserinDB,checkLogin } from "../controller/UserController.js";

const route =express.Router();

route.post('/login',checkLogin)
route.post('/register',addNewUserinDB)

export default route;