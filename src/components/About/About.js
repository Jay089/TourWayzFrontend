import React,{useState} from "react";
import AboutImg from "../assests/night.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutUs from "../../pages/AboutUs";

function About(){
    return(
        <>
        <Navbar />
        <Hero 
        cName="hero-mid"
        heroImg={AboutImg}
        title="About"/>
        <AboutUs/>
        <Footer />
        </>        
    );
}

export default About;