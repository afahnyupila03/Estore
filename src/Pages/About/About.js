import React from "react";
import { useTranslation } from "react-i18next";

import AboutItems from "../../Components/About/AboutItems";

const imageLinks = {
  image1: "https://bit.ly/3L7fuyT",
  image2: "https://bit.ly/3L7fuyT",
  image3: "https://bit.ly/3L7fuyT",
};

const About = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div className="container mx-auto mt-20">
        <div>
          <h1 className="flex justify-center font-bold text-4xl text-red-500">
            {t("aboutPage.aboutUs")}
          </h1>
        </div>

        <div
          className="
            grid gap-8 xl:grid-cols-3 
            lg:grid-cols-3 md:grid-cols-1 
            p-8 sm:grid-cols-1 mb-40"
        >
          <AboutItems
            image={imageLinks.image1}
            title={`${t("aboutPage.whoAre")}`}
            text={`${t("aboutPage.biggestFan")}`}
            button={`${t("aboutPage.timeZone101")}`}
            linkTo="/about/read-more"
          />
          <AboutItems
            image={imageLinks.image2}
            title={`${t("aboutPage.timeZoneBrand")}`}
            text={`${t("aboutPage.madeByUs")}`}
            button={`${t("aboutPage.rightWay")}`}
            linkTo="/about/timezone-brands"
          />
          <AboutItems
            image={imageLinks.image3}
            title={`${t("aboutPage.timeZoneEx")}`}
            text={`${t("aboutPage.muchMore")}`}
            button={`${t("aboutPage.discover")}`}
            linkTo="/about/discover-more"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
