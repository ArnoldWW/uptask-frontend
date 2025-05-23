import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools/production";
import Router from "./router";
import { Toaster } from "react-hot-toast";

import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster
        toastOptions={{
          duration: 3000,
          position: "top-right"
        }}
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
