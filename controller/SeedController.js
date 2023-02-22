import SeedData from "../model/SeedModel.js";

export const getSeedData = async (request, response) => {
  try {
    const data = await SeedData.find();

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

export const createSeedData = async (request, response) => {
  try {
    const data = await SeedData.create({
      type: request.body.type,
    });
    await data.save();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
