import Blogs from "../model/BlogModel.js";

export const addNewBloginDB = async (request, response) => {
  const { title, body, userRole, userId } = request.body || request.body.data;
  const File = request.file;
  console.log(request, "rew");
  console.log(File, userRole,title, body,  userId);
  try {
    const newBlog = await Blogs.create({
      title: title,
      body: body,
      userId: userId,
      userRole:userRole,
      myFile: File.path,
      createdAt: Date.now(),
    });
    await newBlog.save();
    return response.status(200).json(newBlog);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getAllBlogs = async (request, response) => {
  const id = request.header("authorization");
  console.log(request.query);
  try {
    var { page = 1, limit = 10, title = "" } = request.query;
    var newBlog = "",
      query = "";
    if (title == "undefined") {
      
      query = { userId: id };
      console.log(id)
    } else {
      query = { title: { $regex: title }, userId: id };
      console.log(id,"in long")
    }
    newBlog = await Blogs.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await Blogs.count({ userId: id });
    return response
      .status(200)
      .json({ total: total, newBlog });
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const getBlogById = async (request, response, next) => {
  console.log(request.body, "in getblog");
  const { id } = request.params;
  try {
    const data = await Blogs.find({ _id: id })
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
    const newBlog = await Blogs.findOneAndUpdate(
      { _id: id },
      { title: title, body: body },
      { new: true }
    );
    console.log(newBlog,"After upd")
    return response.status(200).json(newBlog);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const deleteBlog = async (request, response) => {
  const { id } = request.params;
  try {
    const newBlog = await Blogs.findByIdAndDelete(id);
    return response.status(200).json(newBlog);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
