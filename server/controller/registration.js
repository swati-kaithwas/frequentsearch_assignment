const registation = require("../service/registration");
const sendResponse = require("../helper/responsehelper");
const validator = require("email-validator");

const Registation = async (req, res) => {
  try {
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const {
      first_name,
      last_name,
      email,
      country,
      state,
      city,
      gender,
      date_of_birth,
      age,
    } = req.body;
   
    if (
      !first_name ||
      !last_name ||
      !email ||
      !country ||
      !state ||
      !city ||
      !gender ||
      !date_of_birth ||
      !age
    ) {
      return sendResponse(res, 400, {
        sataus: false,
        message: "Please fill all details",
      });
    } else if (spChars.test(first_name) || first_name.match(numbers)) {
      return sendResponse(res, 400, {
        sataus: false,
        messaage: " first name must not have special characters and numbers !",
      });
    } else if (spChars.test(last_name) || last_name.match(numbers)) {
      return sendResponse(res, 400, {
        sataus: false,
        messaage: "last name must not have special characters and numbers !",
      });
    } else if (!validator.validate(email)) {
      return sendResponse(res, 400, {
        status: false,
        message: "please enter correct email",
      });
    }
    const temp = await registation.Create({
      email: email.toLowerCase(),
      first_name: first_name,
      last_name: last_name,
      age: age,
      country: country,
      state: state,
      city:city,
      gender: gender,
      date_of_birth: date_of_birth,
    });

    if (!temp)
      return sendResponse(res, 400, {
        status: false,
        message: "somthing went wrong....",
      });
    return sendResponse(res, 200, {
      status: true,
      data: temp,
      message: "Successfully data add...",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(res, 500, {
      satus: false,
      message: "Internal Error",
    });
  }
};
const getAllData=async(req,res)=>{
    try {
        const data= await registation.getall();
        if(!data) return sendResponse(res, 404, {
            status: false,
            message: "Data not found",
          });
          return sendResponse(res, 200, {
            status: true,
            data: data,
            message: "successfully......",
          });
        
    } catch (error) {
        console.log(error);
        return sendResponse(res, 500, {
          satus: false,
          message: "Internal Error",
        });
    }
}
module.exports = {
  Registation,
  getAllData,
};
