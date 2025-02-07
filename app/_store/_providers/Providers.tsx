"use client"; // Mark this as a Client Component

import { store } from "../store"; // Adjust the path as needed
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
