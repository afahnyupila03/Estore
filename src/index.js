import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { QueryClientProvider, QueryClient } from "react-query";
import AppState from "./Store";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AppState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppState>
    </QueryClientProvider>
  </StrictMode>
);
