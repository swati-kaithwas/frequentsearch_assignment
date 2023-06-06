import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import swal from 'sweetalert';
// import * as Yup from "yup";
// import { Formik } from "formik";

const Registration = () => {
  const [gender, setGender] = useState("");
  const [data, setData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [yearDifference, setYearDifference] = useState(0);
  const [checkedDate, setCheckedDate] = useState();
  const [validation, setValidation] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

//   const validationSchema = Yup.object({
//     first_name: Yup.string().trim().required("Name is required"),
    
//     last_name: Yup.string().trim().required(" last Name is required"),
//     email: Yup.string().email("Invalid email").required("Required"),
//   })


  useEffect(() => {
    if (yearDifference >= "14") {
      setValidation(true);
    } else {
      setValidation(false);
    }
  }, [yearDifference]);

  useEffect(() => {
    setSelectedDate(data?.date_of_birth);
  }, [data]);

  useEffect(() => {
    setCheckedDate(new Date(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    // Calculate the difference in years
    const differenceInYears =
      checkedDate?.getFullYear() - currentDate.getFullYear();
    let numb = differenceInYears.toString().split("-").join("");
    setYearDifference(numb);
  }, [currentDate, checkedDate]);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    const xgender = { ...data };
    xgender.gender = gender;
    setData(xgender);
  }, [gender]);

  useEffect(() => {
    const xage = { ...data };
    xage.age = yearDifference;
    setData(xage);
  }, [yearDifference]);
  console.log("data", data);


  useEffect(() => {
   const address = {...data};
   address.country =selectedCountry?.name;
   address.state=selectedState?.name;
   address.city =selectedCity?.name;
   setData(address)
  }, [selectedCountry,selectedState,selectedCity]);


  function handleKeyPress(event) {
    const charCode = event.which ? event.which : event.keyCode;
    const char = String.fromCharCode(charCode);
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  }

  const handleFormSubmit = () => {
    if (validation) {
      axios.post("https://frequentsearch-assignment.onrender.com/users/registation", data)
      .then((res)=>{
        if(res.data.success){
        swal(`${res.data.message}`)
        }
        else{
            swal(`${res.data.message}`)  
        }

      
      }).catch((err)=>{
        console.log(err)
      })
    } else {
      alert("Must be older than 14 years");
    }
  };

  return (
    <div class="col-11 m-auto">
      <div class="" style={{ maxWidth: "500px", margin: "auto" }}>
        {/* <form class="row g-3"> */}
          <div class="">
            <label class="form-label">First name</label>
            <input
              type="text"
              class="form-control"
              name="first_name"
              value={data?.first_name}
              onKeyPress={handleKeyPress}
              onChange={handleChangeInput}
            />
          </div>
         
          <div class="">
            <label class="form-label">Last name</label>
            <input
              type="text"
              name="last_name"
              class="form-control"
              value={data.last_name}
              onKeyPress={handleKeyPress}
              onChange={handleChangeInput}
              required
            />
          </div>
          <div class="" >
            <label class="form-label">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              value={data?.email}
              onChange={handleChangeInput}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </div>
          <div class="col-md-3" style={{width:"100%"}}>
            <label for="validationDefault04" class="form-label">
              Country
            </label>
           
             <Select
        options={Country.getAllCountries()}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCountry}
        onChange={(item) => {
          setSelectedCountry(item);
        }}
      />
             
          </div>
          <div class="col-md-3" style={{width:"100%"}}>
            <label class="form-label">State</label>
            <Select
        options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedState}
        onChange={(item) => {
          setSelectedState(item);
        }}
      />
          
          </div>
          <div class="col-md-3" style={{width:"100%"}}>
            <label class="form-label">City</label>
        

            <Select 
        options={City.getCitiesOfState(
          selectedState?.countryCode,
          selectedState?.isoCode
        )}
        getOptionLabel={(options) => {
          return options["name"];
        }}
        getOptionValue={(options) => {
          return options["name"];
        }}
        value={selectedCity}
        onChange={(item) => {
          setSelectedCity(item);
        }}
      />
          </div>

          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              onChange={() => setGender("Male")}
              checked={gender == "Male" ? true : false}
            />
            <label class="form-check-label">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              onChange={() => setGender("Female")}
              checked={gender == "Female" ? true : false}
            />
            <label class="form-check-label">Female</label>
          </div>
          <input
            type="date"
            name="date_of_birth"
            class="form-control"
            value={data.date_of_birth}
            placeholder="date of birth"
            onChange={handleChangeInput}
          
            
          />
          <p
            class="text-danger"
            style={
              yearDifference <= "-14"
                ? { display: "none" }
                : { display: "block" }
            }
          >
            Must be older than 14 years
          </p>
          <div class="">
            <label class="form-label">Age</label>
            <input
              type="text"
              name="age"
              class="form-control"
              value={yearDifference}
              readOnly
              required
            />
          </div>
          <div class="col-12 my-3">
            <button
              class="btn btn-primary"
              onClick={handleFormSubmit}
              type="submit"
            >
              Submit
            </button>
            <button
              class="btn btn-primary mx-3"
              onClick={() => navigate("/all")}
            >
              show All Data
            </button>
          </div>
     
      </div>
    </div>
  );
};

export default Registration;
