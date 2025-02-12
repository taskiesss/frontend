// _store/_contexts/DarkModeContext.tsx
"use client";
import { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocalStorageState } from "@/app/_hooks/useLocalStorage";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

interface DarkModeProviderProps {
  children: ReactNode;
}

export function DarkModeProvider({ children }: DarkModeProviderProps) {
  // Ensure that we check for window on the client side
  const isClient = typeof window !== "undefined";
  const defaultDarkMode = isClient
    ? window.matchMedia("(prefers-color-scheme: dark)").matches
    : false;

  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    defaultDarkMode,
    "isDarkMode"
  );

  useEffect(() => {
    // Using Tailwind's dark mode by toggling the "dark" class on <html>
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode(): DarkModeContextType {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
