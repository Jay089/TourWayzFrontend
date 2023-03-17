import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import "../styles/login.css";

import userImg from "../assets/images/getalluser.png";

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async (e) => {
    const url = "http://localhost:8080/users/";

    try {
      const res = await fetch(url, {
        method: "get",
        mode: "cors",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      console.log(res);

      const result = await res.json();
      setUsers(result);

      console.log(result);

      if (res.ok) {
        alert("tour fetch successfully");
      } else {
        alert("retry");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login_container d-flex">
              <div className="all-userimg">
                <img src={userImg} alt="" />
              </div>
              <div className="user-table">
                <h2>User Details</h2>

                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>Sr. No</th>
                      <th>UserName</th>
                      <th>Email</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  className="get_alluser secondary_btn"
                  onClick={getAllUsers}
                >
                  Get All Users
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default UserDetails;
