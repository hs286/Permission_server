import permission from "../model/PermissionModel.js";
import seedData from "../model/SeedModel.js";
import mongoose from "mongoose";


export const createPermission = async (request, response) => {
  const { _id, role } = request.body;
  try {
    const SeedData = await seedData.find();

    SeedData.forEach(async (element) => {
      const t = element.type;
      if (t == "GET" && role == "Student") {
        const createPermission = await permission.create({
          userId: _id,
          permissionId: element._id,
        });
        createPermission.save();
      } else if (
        (t == "GET" || t == "POST" || t == "DELETE" || t == "PUT") &&
        role == "Teacher"
      ) {
        const createPermission = await permission.create({
          userId: _id,
          permissionId: element._id,
        });
        createPermission.save();
      }
    });
    return response.status(200).json("Permission Added");
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deletePermission = async (request, response) => {
  const { id } = request.params;
  try {
    const delPermission = await permission.findByIdAndDelete(id);
    return response.status(200).json(delPermission);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const CheckPermission = async (request, response, next) => {
  const method = request.method;
  console.log(method,"to be done")
  var id = mongoose.Types.ObjectId(request.body.userId);
  const allPermissions = await permission.find({userId:id}).populate('permissionId')
  allPermissions.forEach(element => {
    console.log(element.permissionId.type)
  });
  const element = allPermissions.find(
    (element) => element.permissionId.type == method
  );
    console.log(element)
  if (element.permissionId.type == method) {
    next();
  } else {
    const object = {
      error: true,
      message: "Current method is not allowed against this user",
    };
    return response.status(500).json(object);
  }
};
