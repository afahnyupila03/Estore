import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "react-query";
import store from "./Store/store";
import { BrowserRouter } from "react-router-dom";
import './i18n'

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={new QueryClient()}>
          <Suspense fallback={<div>Loading ~~~</div>}>
            <App />
          </Suspense>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
