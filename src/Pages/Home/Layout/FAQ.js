import { useQuery } from "react-query";
import { FAQServices } from "../../../Services/HomeService";
import { Fragment } from "react";
import UseAnimation from "../../../Components/Loader";
import loading from "react-useanimations/lib/loading";
import React from "react";
import { useTranslation } from "react-i18next";
import { faqQuestionBase } from "../components/FAQQuestionBase";

export default function FAQ() {
  const { t } = useTranslation();
  const {
    data = {},
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery("FAQ", () => FAQServices(t));

  let FAQ;

  if (isLoading) {
    FAQ = (
      <div className="flex justify-center">
        <p>{error}</p>
        <UseAnimation
          animation={loading}
          className="text-red-5000"
          color="red"
          size={100}
        />
      </div>
    );
  } else if (isError) {
    FAQ = (
      <div className="flex justify-center">
        <p>{error}</p>
        <button onClick={() => refetch()}>Try again</button>
      </div>
    );
  } else {
    FAQ = (
      <Fragment>
        <h1 className="text-2xl font-semibold text-center my-4">
          {t("faq.frequentlyAsked")}
        </h1>
        {data.map((faq, index) => (
          <div key={faq.id} className="mb-4">
            <div className="mb-2">
              <h1 className="text-2xl font-semibold">
                <span>{index + 1}. </span>
                {faq.question}
              </h1>
            </div>
            <div>
              <p className="text-lg">{faq.answer}</p>
            </div>
          </div>
        ))}
      </Fragment>
    );
  }

  return (
    <div className="mx-60 max-w-2xl px-40 mt-10 sm:px-6 lg:max-w-7xl lg:px-8">
      {FAQ}
    </div>
  );
}
