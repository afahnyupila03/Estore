import React from "react";
import Card from "./Components/CardComponents/Card";
import Track from "../../Assets/track.png";
import Return from "../../Assets/sale-return-icon.png";
import Request from "../../Assets/request.png";
import Cancel from "../../Assets/cancel.png";
import Help from "../../Assets/help.png";
import Yes from "../../Assets/vote-yes.png";
import { useTranslation } from "react-i18next";

export default function ContactPage() {

  const {t} = useTranslation()

  return (
    <div>
      <div>
        <div className="text-2xl flex justify-start mb-6 font-semibold font-mono">
          <h1>{t("auth.customerService")}</h1>
        </div>
        <div className="grid justify-center mb-14">
          <h1 className="text-2xl text-center font-semibold font-mono">
           {t("contact.hereForYou")}
          </h1>
          <p className="text-center">{t("contact.callOrChat")}</p>
        </div>

        <div className="mb-20">

          <div className=" grid justify-center mb-10">
            <h1 className="text-2xl text-center font-semibold font-mono">
              {t("auth.needHelp")}
            </h1>
            <p className="text-center">
              {t("contact.selfService")}
            </p>
          </div>

          <div className="flex gap-x-8 gap-y-6 items-center flex-col md:flex-row lg:flex-row justify-evenly">
            <Card
              actionHeader={t("contact.trackOrder")}
              image={Track}
              imageName="track"
              actionButton={t("contact.getStarted")}
            />
            <Card
              actionHeader={t("contact.makeReturn")}
              image={Return}
              imageName="return"
              actionButton={t("contact.getStarted")}
            />
            <Card
              actionHeader={t("contact.requestPrice")}
              image={Request}
              imageName="request"
              actionButton={t("contact.getStarted")}
            />
          </div>
        </div>

        <div className="grid mb-10 justify-items-stretch">
          <Card
            actionHeader={t("contact.needCancel")}
            actionText={t("contact.actQuickly")}
            image={Cancel}
            name="cancel"
            imageClass="hidden lg:block"
            actionButton={t("contact.getStarted")}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 mb-10 justify-evenly">
          <Card
            actionHeader={t("contact.here247")}
            actionText={t("contact.service")}
            image={Help}
            imageName="help"
          />
          <Card
            image={Yes}
            imageName="yes"
            actionHeader={t("contact.outService")}
            actionButton={t("contact.findOut")}
          />
        </div>
      </div>
    </div>
  );
}
