import permission from "../model/PermissionModel.js";

export const createPermission = async (request, response) => {
  const { userId,permissionId } = request.body;
  try {    
        const createPermission = await permission.create({
          userId: userId,
          permissionId: permissionId,
        });
        createPermission.save();
    return response.status(200).json({createPermission});
  } catch (error) {
    return response.status(500).json(error);
  }
};

export const deletePermission = async (request, response) => {
  const { id } = request.params;
  console.log(id,"INdele")
  try {
    const delPermission = await permission.findByIdAndDelete(id);
    return response.status(200).json(delPermission);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getPermissions = async(request,response) =>
{
  const {id} = request.params;
  try {
    const getPermissions=await permission.find({userId:id}).populate('permissionId')
    return response.status(200).json(getPermissions);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const CheckPermission = async (request, response, next) => {
  const method = request.method;
  const id = request.header("authorization");
  // console.log(method,"to be done")
  // var id = mongoose.Types.ObjectId(request.body.userId);
  console.log(id);
  const allPermissions = await permission
    .find({ userId: id })
    .populate("permissionId");
  console.log(allPermissions);
  allPermissions.forEach((element) => {
    console.log(element.permissionId.type);
  });
  const element = allPermissions.find(
    (element) => element.permissionId.type == method
  );
  console.log(element);
  if (element == undefined) {
    const object = {
      error: true,
      message: "Current method is not allowed against this users",
    };
    return response.status(500).json(object);
  } else if (element.permissionId.type == method) {
    next();
  }
};
