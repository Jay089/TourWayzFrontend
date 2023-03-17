import React, { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import "../styles/booked.css";

function AllTours() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { data, error, loading } = useFetch(`http://localhost:8080/booking/`);

  if (user?.role !== "admin") {
    return (
      <h1 className="text-center text-danger  p-5">
        Not Authorised to access this Page
      </h1>
    );
  }

  return (
    <div>
      <div className="container w-50 p-5">
        <h2 className="text-center text-warning">ALL BOOKED TOURS</h2>
        <div className="py-4">
          <table className="table border table-striped table-hover shadow">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Booked Date</th>
                <th scope="col">Location</th>
                <th scope="col">Group Size</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr className="p-3">
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{item.fullName}</td>
                  <td>{item.userEmail}</td>
                  <td>{item.bookAt}</td>
                  <td>{item.tourName}</td>
                  <td>{item.guestSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllTours;
