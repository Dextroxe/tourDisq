import "./Hero.css";
// import { HiLocationMarker } from "react-icons/hi";
import SearchBar from "../searchBar/SearchBar";
import CountUp from "react-countup";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Discover <br />
              & Follow
              <br /> Your Dream
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText flexhero-des">
            <span>Find a variety of post that was posted by the users like you</span>
            <span>Forget the hastle and share your experience</span>
          </div>

          {/* <SearchBar /> */}
          <div className="line"></div>

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={200} end={1000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Premium Posts</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Active Users</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Best Posts</span>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="flexCenter hero-right">
          
          <div className="image-item">
            <motion.div
              className="image-first"
              initial={{ x: "7rem", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 3.5,
                type: "spring",
              }}
            >
              <img src="./yoga.jpg" alt="img1" />
              <div className="image-box">
                <motion.img
                  src="./snow.jpg"
                  alt="img2"
                  initial={{ x: "7rem", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 4,
                    type: "spring",
                  }}
                />
                <motion.img
                  src="./plane.jpg"
                  alt="img3"
                  initial={{ x: "7rem", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 3.5,
                    type: "spring",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
