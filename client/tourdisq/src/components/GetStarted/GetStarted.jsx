import React from "react";
import "./GetStarted.css";
import {IoLogoDiscord} from 'react-icons/io5'
const GetStarted = () => {
  return (
    <div id="get-started" className="g-wrapper">
      <div className="paddings innerWidth g-container">
        <div className="flexColCenter inner-container">
          <span className="primaryText">Get started with TourDisq</span>
          <span className="secondaryText">
            Subscribe and find super attractive community on discord.
            <br />
            <IoLogoDiscord size={50}/>
          </span>
          <button className="button" href>
            <a href="https://discord.gg/UxeyxT7JBt">Join</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
