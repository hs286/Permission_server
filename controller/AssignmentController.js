import Assignments from "../model/BlogModel.js";

export const addnewAssignmentsinDB = async (request, response) => {
  const { title, body, userRole, userId } = request.body || request.body.data;
  const File = request.file;
  console.log(request, "rew");
  console.log(File, userRole,title, body,  userId);
  try {
    const newAssignments = await Assignments.create({
      title: title,
      body: body,
      userId: userId,
      userRole:userRole,
      myFile: File.path,
      createdAt: Date.now(),
    });
    await newAssignments.save();
    return response.status(200).json(newAssignments);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getAllAssignments = async (request, response) => {
  const id = request.header("authorization");
  console.log(id,"in getall");
  try {
    var { page = 1, limit = 10, title = "" } = request.query;
    var newAssignments = "",
      query = "";
    if (title == "undefined") {
      
      query = {};
      console.log(id)
    } else {
      query = { title: { $regex: title } };
      console.log(id,"in long")
    }
    newAssignments = await Assignments.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
      console.log(newAssignments)
    const total = await Assignments.count();
    return response
      .status(200)
      .json({ total: total, newAssignments });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getBlogById = async (request, response, next) => {
  console.log(request.body, "in getblog");
  const { id } = request.params;
  try {
    const data = await Assignments.find({ _id: id })
      .populate("userId", "name")
      .where("userId.name");
    return response.status(200).json({ data });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const updateBlog = async (request, response) => {
  const { title, body } = request.body;
  const { id } = request.params;
  console.log(request.body,"IN Update")
  try {
    const newAssignments = await Assignments.findOneAndUpdate(
      { _id: id },
      { title: title, body: body },
      { new: true }
    );
    console.log(newAssignments,"After upd")
    return response.status(200).json(newAssignments);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteBlog = async (request, response) => {
  const { id } = request.params;
  console.log("In delete")
  try {
    const newAssignments = await Assignments.findByIdAndDelete(id);
    return response.status(200).json(newAssignments);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
