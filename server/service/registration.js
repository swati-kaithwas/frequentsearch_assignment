const Registation = require("../model/registration");

const Create = async (data) => {
  try {
    const result = new Registation(data);
    await result.save();
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const getall = async () => {
  try {
    const result = await Registation.find({});

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = {
  Create,
  getall,
};
