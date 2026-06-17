import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AppToaster } from "./components/app-toaster/app-toaster";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppToaster />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
