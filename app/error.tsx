"use client";
import React from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--background-color)] p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-xl text-gray-700 mb-4">{error.message}</p>
      <div className="flex gap-4">
        {reset && (
          <button
            onClick={reset}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Try again
          </button>
        )}
        <Link
          href="/"
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
