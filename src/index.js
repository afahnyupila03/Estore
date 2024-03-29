import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/store";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import './i18n'
import { QueryClientProvider, QueryClient } from "react-query";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback=<div>Loading</div>>
            <App />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
