"use client";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import logo_dark from "@/public/images/logo_dark.png";
import Image from "next/image";
import Container from "./Container";

interface NavBarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onLogin, onSignup }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-toggle-button");
      const searchButton = document.getElementById("search-toggle-button");

      if (
        mobileMenu &&
        !mobileMenu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node) &&
        searchButton &&
        !searchButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get("search") as string;

    const currentPath = window.location.pathname;
    const searchRegex = /^\/search\/(jobs|freelancers|communities)(\/)?$/i;

    if (searchRegex.test(currentPath)) {
      router.push(`${currentPath}?query=${encodeURIComponent(searchTerm)}`);
    } else {
      const searchtype = currentPath.includes("jobs")
        ? "jobs"
        : currentPath.includes("freelancers")
        ? "freelancers"
        : currentPath.includes("communities")
        ? "communities"
        : "jobs";
      router.push(
        `/guest/search/${searchtype}?query=${encodeURIComponent(searchTerm)}`
      );
    }
    setIsSearchVisible(false);
  };

  const navigationItems = [
    { name: "Freelancers", href: "freelancers" },
    { name: "Jobs", href: "jobs" },
    { name: "Communities", href: "communities" },
    { name: "About us", href: "about" },
  ];

  return (
    <Container>
      <nav className="bg-[var(--background-color)] py-3 sm:py-4 md:py-6 lg:py-8 xl:py-10 relative">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex w-[7rem] sm:w-[8rem] md:w-[9rem] lg:w-[10rem] h-auto">
            <Link href="/">
              <Image
                src={logo_dark}
                alt="Taskaya Logo"
                className="h-auto w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-col justify-center">
            <ul className="list-none flex gap-6 lg:gap-12 xl:gap-20 items-center">
              {navigationItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={`/guest/${item.href.toLowerCase()}`}
                    className="bg-inherit cursor-pointer"
                  >
                    <span className="font-semibold text-base lg:text-lg xl:text-xl hover:text-[var(--btn-color)] transition-colors whitespace-nowrap">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Search & Auth */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-7">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <button
                    aria-label="Search"
                    className="bg-inherit p-0 cursor-pointer flex"
                    type="submit"
                  >
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="text-gray-400 text-lg lg:text-xl"
                    />
                  </button>
                </div>
                <input
                  type="text"
                  name="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you looking for?"
                  className="bg-[var(--background-color)] placeholder:text-gray-400 pl-[2.5rem] lg:pl-[3rem] p-2 w-[16rem] sm:w-[20rem] md:w-[24rem] lg:w-[28rem] rounded-2xl border-solid border border-[var(--border-color)] focus:outline-none focus:ring-2 text-sm lg:text-base"
                />
              </div>
            </form>

            <div className="flex gap-4 lg:gap-7">
              <button
                className="px-3 lg:px-4 text-base lg:text-xl cursor-pointer bg-transparent whitespace-nowrap hover:text-[var(--btn-color)] transition-colors"
                onClick={onLogin}
              >
                <Link href="/login">Log in</Link>
              </button>
              <Button
                className="whitespace-nowrap text-base lg:text-xl px-4 lg:px-6"
                onClick={onSignup}
              >
                <Link className="text-[var(--accent-color)]" href="/signup">
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile & Tablet Menu Buttons */}
          <div className="flex lg:hidden items-center gap-3 sm:gap-4">
            <button
              id="search-toggle-button"
              onClick={() => {
                setIsSearchVisible(!isSearchVisible);
                if (isMenuOpen) setIsMenuOpen(false);
              }}
              className="p-2 hover:text-[var(--btn-color)] transition-colors"
              aria-label="Toggle search"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-lg sm:text-xl md:text-2xl"
              />
            </button>
            <button
              id="menu-toggle-button"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                if (isSearchVisible) setIsSearchVisible(false);
              }}
              className="p-2 hover:text-[var(--btn-color)] transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <FontAwesomeIcon
                icon={isMenuOpen ? faXmark : faBars}
                className="text-xl sm:text-2xl md:text-3xl"
              />
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Search Bar */}
        {isSearchVisible && (
          <div className="lg:hidden mt-3 sm:mt-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="w-full bg-[var(--background-color)] placeholder:text-gray-400 pl-10 sm:pl-12 md:pl-14 p-2 md:p-3 rounded-2xl border-solid border border-[var(--border-color)] focus:outline-none focus:ring-2 text-sm sm:text-base md:text-lg"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 -translate-y-1/2"
                aria-label="Search"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-gray-400 text-lg sm:text-xl md:text-2xl"
                />
              </button>
            </form>
          </div>
        )}

        {/* Mobile & Tablet Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute top-full left-0 right-0 bg-[var(--background-color)] border-t border-[var(--border-color)] shadow-lg z-50"
          >
            <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6">
              {/* Navigation Links */}
              <ul className="space-y-3 sm:space-y-4 md:space-y-5">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/guest/${item.href.toLowerCase()}`}
                      className="block py-2 text-base sm:text-lg md:text-xl font-semibold hover:text-[var(--btn-color)] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 pt-4 md:pt-6 border-t border-[var(--border-color)]">
                <div className="">
                  <button
                    className="w-full py-2 text-base sm:text-lg md:text-xl font-semibold hover:text-[var(--btn-color)] transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogin?.();
                    }}
                  >
                    <Link href="/login">Log in</Link>
                  </button>
                </div>
                <Button
                  className="w-full text-base sm:text-lg md:text-xl self-center py-2 md:py-3"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onSignup?.();
                  }}
                >
                  <Link className="text-[var(--accent-color)]" href="/signup">
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </Container>
  );
};

export default NavBar;
