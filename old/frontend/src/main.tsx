import { createRoot } from "react-dom/client";
import "../styles/styles.css";
import App from "./App";
import { StrictMode } from "react";
import { store } from "../../../app/_store/store";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
