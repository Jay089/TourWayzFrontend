import React, { useState, useContext, useEffect } from "react";

import "./createtour.css";
import userIcon from "../../assets/images/user.png";

import loginImg from "../../assets/images/tour-info.png";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";

import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const CreateTour = () => {
  const { user } = useContext(AuthContext);

  const [tour, setTour] = useState({
    title: undefined,
    city: undefined,
    address: undefined,
    distance: undefined,
    price: undefined,
    maxGroupSize: undefined,
    desc: undefined,
    featured: false,
  });

  const handleChange = (e) => {
    setTour((prev) => ({
      ...prev,
      [e.target.id]:
        e.target.id === "featured" ? e.target.checked : e.target.value,
    }));
  };

  if (user?.role !== "admin") {
    return (
      <h1 className="text-center text-danger  p-5">
        Not Authorised to access this Page
      </h1>
    );
  }
  const handleClick = async (e) => {
    e.preventDefault();

    const url = "http://localhost:8080/tours/";

    try {
      const res = await fetch(url, {
        method: "post",
        mode: "cors",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(tour),
      });

      console.log(res);

      if (res.ok) {
        alert("tour added successfully");
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
            <div className="login_container d-flex justify-content-between">
              <div className="login_img tour-info-img">
                <img src={loginImg} alt="" />
              </div>
              <div className="login_form tour_info">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Tour Info</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Title"
                      id="title"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="City"
                      id="city"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Address"
                      id="address"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Distance"
                      id="distance"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Price"
                      id="price"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="MaxGroupSize"
                      id="maxGroupSize"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Description"
                      id="desc"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="url"
                      placeholder="pasete photo url here"
                      id="photo"
                      required
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>
                      Featured:
                      <input
                        id="featured"
                        type="checkbox"
                        placeholder="Featured"
                        onChange={handleChange}
                      />
                    </label>
                  </FormGroup>
                  <button className="btn secondary_btn auth_btn" type="submit">
                    CREATE_TOUR
                  </button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreateTour;
