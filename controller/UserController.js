import Users from "../model/UserModel.js";
import jwt from "jsonwebtoken";

export const addNewUserInDb = async (request, response) => {
  const { email, name, age, password, id,role } = request.body;
console.log(email,name,age,password,role)
  try {
    const newUser = await Users.create({
      email: email,
      name: name,
      age: age,
      password: password,
      role:role,
    });
    newUser.save();
    console.log(newUser)
    return response.status(200).json(newUser);
    // Users.findOne({ email: request.body.email }).then((user) => {
    //   if (!user)
    //   {

    //   }
    //   // else{
    //   //   return response.status(500).json(error.message);
    //   // }
    // });

    // return;
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const checkLogin = async (request, response) => {
  var { email='', password='' } = request.query;
  try {
    const newUser = await Users.find({
      email: email,
      password: password,
    });
    if (newUser != "") {
      const accessToken = jwt.sign(
        { email: newUser[0].email, _id: newUser[0]._id,role:newUser[0].role },
        process.env.ACCESS_TOKEN
      );
      return response
        .status(200)
        .json({ newUser: newUser, token: accessToken });
    } else {
      return response.status(500).json();
      
    }
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
