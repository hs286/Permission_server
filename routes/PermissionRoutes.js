import express from 'express';
import { createPermission,deletePermission, getPermissions } from '../controller/PermissionController.js';

const route =express.Router();

route.post('/',createPermission);
route.delete('/:id',deletePermission);
route.get('/:id',getPermissions);

export default route;