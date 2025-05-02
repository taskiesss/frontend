"use client";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset?: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background-color)] to-[var(--foreground-color)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--background-color)] rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] border border-[var(--border-color)]">
        <div className="p-8 text-center">
          {/* Glitch Animation Container */}
          <div className="relative mb-8 h-24">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--status-active)] to-[var(--status-inprogress)] animate-pulse">
                404
              </span>
            </div>
            {/* Glitch lines */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <span
                className="text-6xl font-bold text-[var(--status-ended)] animate-glitch"
                style={{ animationDelay: "0.1s" }}
              >
                404
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <span
                className="text-6xl font-bold text-[var(--status-pending)] animate-glitch"
                style={{ animationDelay: "0.2s" }}
              >
                404
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-[var(--accent-color)] mb-4">
            Something went wrong
          </h1>

          <p className="text-[var(--accent-color)] text-opacity-80 mb-8 leading-relaxed">
            {error.message || "We're having trouble loading this page."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {reset && (
              <button
                onClick={reset}
                className="px-6 py-3 bg-[var(--btn-color)] text-[var(--btn-clr-secondary)] rounded-lg hover:bg-[var(--button-hover-background-color)] transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] focus:ring-offset-2"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Try Again
                </span>
              </button>
            )}

            <Link
              href="/"
              className="px-6 py-3 bg-[var(--border-color)] text-[var(--btn-clr-secondary)] rounded-lg hover:bg-[var(--clr-border-dark)] transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--hover-color)] focus:ring-offset-2"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Go Home
              </span>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="bg-[var(--foreground-color)] p-4 flex justify-between items-center border-t border-[var(--border-color)]">
          <div className="w-3 h-3 rounded-full bg-[var(--status-active)] animate-pulse"></div>
          <div
            className="w-3 h-3 rounded-full bg-[var(--status-inprogress)] animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="w-3 h-3 rounded-full bg-[var(--status-pending)] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
