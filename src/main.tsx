import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { store } from "./store.ts";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
