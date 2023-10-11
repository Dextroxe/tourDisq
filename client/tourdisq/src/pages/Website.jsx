import Companies from "../components/Companies/Companies";
import Contact from "../components/Contact/Contact";
// import Footer from "../components/Footer/Footer";
import GetStarted from "../components/GetStarted/GetStarted";
// import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Residencies from "../components/Residencies/Residencies";
import Value from "../components/Value/Value";

const Website = () => {
  return (
    <div className="App">
      <div>
        <div className="left-circle-gradient" />
        <div className="left-gradient" />
        <div className="right-circle-gradient" />
        {/* <Header /> */}
        <Hero />
      </div>
      <Companies />
      <Residencies />
      <Value />
      <div className="right-circle-gradient" />
      <Contact />
      <GetStarted />
      {/* <Footer/> */}
    </div>
  );
};

export default Website;
