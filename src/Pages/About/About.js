import React from "react";
import aboutData from "../../Components/About/about-data";
import AboutItems from "../../Components/About/AboutItems";

const About = (props) => {
  const aboutCard = aboutData.map((about) => (
    <AboutItems key={about.id} about={about} />
  ));

  return (
    <React.Fragment>
      <div className="container mx-auto mt-20">
        <div>
          <h1 className="flex justify-center font-bold text-4xl text-red-500">
            About Us
          </h1>
        </div>

        <div
          className="
            grid gap-8 xl:grid-cols-3 
            lg:grid-cols-3 md:grid-cols-1 
            p-8 sm:grid-cols-1 mb-40"
        >
          {aboutCard}
        </div>

        <h1>See how it goes</h1>
      </div>
    </React.Fragment>
  );
};

export default About;
