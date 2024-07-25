import React from "react";
import { useTranslation } from "react-i18next";
import { AboutCommitment, AboutData } from "./AboutData";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="mt-10 mx-40 px-10">
      <div className="my-4">
        <h1 className="font-bold text-4xl text-gray-900">
          {t("home.aboutUs")}
        </h1>
        <p className="mt-4 text-lg">{t("about.aboutIntro")}</p>
      </div>

      <div className="mt-6">
        <h1 className="font-bold text-4xl text-gray-900">
          {t("about.productCategories")}
        </h1>

        {AboutData(t).map((about) => (
          <div className="mt-4" key={about.category}>
            <h1 className="font-medium text-2xl text-gray-900 mt-4">
              <span className="mr-4">-</span>
              {about.category}
            </h1>
            <p className="mt-4 text-lg">{about.categoryIntro}</p>
          </div>
        ))}
      </div>

      <div className="my-4">
        <h1 className="font-bold text-4xl text-gray-900">
          {t("about.commitment")}
        </h1>
        <p className="mt-4 text-lg">{t("about.commitmentIntro")}</p>
      </div>

      {AboutCommitment(t).map((commitment) => (
        <div className="flex mt-4" key={commitment.commitment}>
          <p>
            <span className="font-medium text-2xl text-gray-900 mt-4">
              {commitment.commitment}
            </span>{" "}
            : <span className="mt-4 text-lg">{commitment.commitmentIntro}</span>
          </p>
        </div>
      ))}

<div className="my-4">
        <h1 className="font-bold text-4xl text-gray-900">
          {t("home.contactUs")}
        </h1>
        <p className="mt-4 text-lg">{t("about.contactUsIntro")}</p>
      </div>
    </div>
  );
}
