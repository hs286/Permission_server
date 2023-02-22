import express from 'express';
import { createPermission,deletePermission } from '../controller/PermissionController.js';

const route =express.Router();

route.post('/',createPermission);
route.delete('/',deletePermission);


export default route;