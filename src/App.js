// TODO: Try implementing Custom Input and fetch-post hooks in the Checkout form and other places where possible.

import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";

import { routes } from "./Routes/routes.js";

import Navbar from "./Pages/Home/Layout/Navbar.js";
import Footer from "./Pages/Home/Layout/Footer.js";

import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const Fallback = () => {
  return (
    <div className="flex justify-center bg-gray-20">
      <div className="z-40" style={{ padding: "30rem" }}>
        <UseAnimations animation={loading} size={60} />
      </div>
    </div>
  );
};

function App() {
  const route = useRoutes(routes);

  return (
    <Suspense fallback=<Fallback />>
      <Navbar />

      {route}

      <Footer />
    </Suspense>
  );
}

export default App;
