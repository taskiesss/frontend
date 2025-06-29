"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useDarkMode } from "@/app/_store/_contexts/DarkModeContext";

export default function DarkModeToggleButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the button until we're on the client
  if (!mounted) return null;

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 z-50 p-3 text-xl bg-gray-200 dark:bg-gray-700 rounded-full shadow-md transition-transform hover:scale-110 focus:outline-none"
    >
      {isDarkMode ? (
        <FontAwesomeIcon icon={faSun} className="text-yellow-500" />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          className="text-gray-800 dark:text-gray-200"
        />
      )}
    </button>
  );
}
