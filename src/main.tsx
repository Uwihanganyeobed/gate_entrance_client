// src/main.tsx
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes.tsx";
import "./i18n";
import { ThemeProvider } from "./context/ThemeContext.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <Theme>
            <RouterProvider router={router} />
            <ToastContainer />
          </Theme>
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  </ThemeProvider>
);
