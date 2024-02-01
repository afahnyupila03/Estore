import React from "react";
import Card from "./Components/Card";
import Track from "../../Assets/track.png";
import Return from "../../Assets/sale-return-icon.png";
import Request from "../../Assets/request.png";
import Cancel from "../../Assets/cancel.png";
import Help from "../../Assets/help.png";
import Yes from "../../Assets/vote-yes.png";

export default function ContactPage() {
  return (
    <div>
      <div>
        <div className="text-2xl flex justify-start mb-8 font-semibold font-mono">
          <h1>Customer Service</h1>
        </div>
        <div className="grid justify-center mb-20">
          <h1 className="text-2xl text-center font-semibold font-mono">
            We're Here for You
          </h1>
          <p className="text-center">Call or chat with us here.</p>
        </div>

        <div className=" mb-20 grid">
          <div className=" grid justify-center mb-10">
            <h1 className="text-2xl text-center font-semibold font-mono">
              Need Help?
            </h1>
            <p className="text-center">
              Check out our self-service tools to get help fast.
            </p>
          </div>
          <div className="flex justify-evenly">
            <Card
              actionHeader="Track Your Order"
              image={Track}
              imageName="track"
              actionButton="Get Started"
            />
            <Card
              actionHeader="Make a Return"
              image={Return}
              imageName="return"
              actionButton="Get Started"
            />
            <Card
              actionHeader="Request a Price Adjustment"
              image={Request}
              imageName="request"
              actionButton="Get Started"
            />
          </div>
        </div>

        <div className="grid mb-10 justify-items-stretch">
          <Card
            actionHeader="Need to cancel a recent order?"
            actionText="If you act quickly, you can cancel an order while it's still processing. Just find the order in your purchases, choose Details, then select Cancel Order."
            image={Cancel}
            name="cancel"
            actionButton="Get Started"
          />
        </div>

        <div className="flex mb-10 justify-evenly">
          <Card
            actionHeader="Need help? We're here 24/7."
            actionText="Service: +237 999 999 999"
            image={Help}
            imageName="help"
          />
          <Card
            image={Yes}
            imageName="yes"
            actionHeader="Our Service promise since 1901"
            actionButton="Find Out More"
          />
        </div>
      </div>
    </div>
  );
}
