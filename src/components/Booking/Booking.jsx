import React, { useState, useContext } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user && user.id, //later it will become dynamic
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  console.log(title);

  const handleChange = (e) => {
    setBooking(
      (prev) => ({ ...prev, tourName: title, [e.target.id]: e.target.value }),
      [title]
    );
    // setBooking(
    //   (prevBooking) => ({
    //     ...prevBooking,
    //     tourName: title,
    //   }),
    //   [title]
    // );
  };

  const serviceFee = 10;

  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);

  //Send data to the server
  const handleClick = async (e) => {
    e.preventDefault();

    console.log(booking);

    try {
      if (!user || user === undefined || user === null) {
        return alert("please sign in first");
      }

      const res = await fetch(`${BASE_URL}/booking/`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div
        className="booking__top d-flex align-items-center
       justify-content-between"
      >
        <h3>
          ${price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/*===============booking form start==================*/}
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="phone"
              id="phone"
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup className=" d-flex align-items-center gap-3">
            <input type="date" id="bookAt" onChange={handleChange} required />
            <input
              type="number"
              placeholder="Guests"
              id="guestSize"
              onChange={handleChange}
              required
            />
          </FormGroup>

          {/*===============booking form end==================*/}

          {/*===============booking Bottom==================*/}
          <div className="booking__bottom">
            <ListGroup>
              <ListGroupItem className=" border-0 px-0">
                <h5 className=" d-flex align-items-center gap-1">
                  ${price}
                  <i class="ri-close-line"></i> 1 person
                </h5>
                <span>${price}</span>
              </ListGroupItem>
              <ListGroupItem className=" border-0 px-0">
                <h5>Service Charge</h5>
                <span>${serviceFee}</span>
              </ListGroupItem>
              <ListGroupItem className=" border-0 px-0 total">
                <h5>Total</h5>
                <span>${totalAmount}</span>
              </ListGroupItem>
            </ListGroup>

            <Button className="btn primary__btn w-100 mt-4" type="submit">
              Book Now
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Booking;
