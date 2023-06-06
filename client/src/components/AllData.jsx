import React, { useEffect, useState } from 'react'

const AllData = () => {
    const [data,setData]= useState([])
    useEffect(() => {
        fetchData();
      }, []);
    const fetchData = async () => {
        try {
          const response = await fetch("https://frequentsearch-assignment.onrender.com/users/getAllData");
          const json = await response.json();
          console.log("data", json.data);
    
          setData(json.data);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      };
  return (
   <div class ="bg-secondry ">
   <p class="fs-1 fw-bold my-2 text-center">Cards</p>
   <div class="col-11 m-auto row gap-5 mt-5 justify-content-center ">
        {
            data.length > 0?(data.map((e,i)=>
            <div class ="border rounded-3 bg-light p-2 col-md-3 col-11">
                <p class="ddd"><span class="fw-bold">First Name:</span> {e.first_name}</p>
                <p class="ddd"><span class="fw-bold"> Last Name:</span> {e.last_name}</p>
                <p class="ddd"><span class="fw-bold"> Email:</span> {e.email}</p>
                <p class="ddd"><span class="fw-bold"> Age:</span>{e.age}</p>
                <p class="ddd"><span class="fw-bold"> City: </span>{e.city}</p>
                <p class="ddd"><span class="fw-bold"> State:</span> {e.state}</p>
                <p class="ddd"> <span class="fw-bold">Country: </span>{e.country}</p>
                </div>
        )) : (
          <p>No data to display</p>
        )
        }
     </div>

    </div>

  )
}

export default AllData