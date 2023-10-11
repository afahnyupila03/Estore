import React from "react";
import { useRoutes } from "react-router";
import { routes } from "./Routes/routes";

function App() {

  const routes = useRoutes()


  return (
    <React.StrictMode>
      <h1>Hello Pila, Please start all over. Thank you.</h1>
      <p>Testing merging to maiin branch to see if it works.</p>
    </React.StrictMode>
  );
}

export default App;
