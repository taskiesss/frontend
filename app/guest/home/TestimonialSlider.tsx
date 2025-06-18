"use client";

import React, { useRef, useState, useEffect } from "react";

export default function TestimonialSlider() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Check scroll position and update button states
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setAtStart(scrollLeft === 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // Small buffer
    };

    handleScroll(); // Initial check
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    const container = carouselRef.current;
    const card = container.querySelector(
      ".testimonial-card"
    ) as HTMLElement | null;
    const cardWidth = card?.offsetWidth || 0;

    if (cardWidth === 0) return;

    const scrollAmount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    // Delay state updates to allow DOM to update before checking again
    setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setAtStart(scrollLeft === 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }, 300);
  };

  return (
    <section className="flex-1 p-6 bg-[var(--foreground-color)]">
      <h2 className="text-3xl font-bold text-center mb-10">
        What Our Clients Say
      </h2>

      <div className="relative max-w-5xl mx-auto px-12">
        {/* Scrollable Testimonials */}
        <div
          id="testimonialCarousel"
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-4 scroll-smooth scrollbar-hide"
        >
          {/* Testimonial Card Wrapper - Full Width */}
          <div
            className="testimonial-card snap-start w-full flex-shrink-0 p-6 flex flex-col items-start  rounded-xl transition-transform duration-300 hover:scale-[1.02] will-change-transform"
            style={{
              scrollSnapAlign: "start",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="italic text-lg opacity-90 mb-4">
              Working with Taskaya has been an amazing experience. I found the
              perfect freelancer for my project quickly and efficiently.
            </p>
            <span className="font-semibold text-[var(--accent-color)]">
              — Sarah Johnson
            </span>
            <span className="text-md text-[var(--accent-color)] opacity-70">
              Product Manager, TechCo
            </span>
          </div>

          {/* Testimonial Card 2 */}
          <div
            className="testimonial-card snap-start w-full flex-shrink-0 p-6 flex flex-col items-start  rounded-xl transition-transform duration-300 hover:scale-[1.02] will-change-transform"
            style={{
              scrollSnapAlign: "start",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="italic text-lg opacity-90 mb-4">
              The process was seamless from start to finish. Highly recommend
              Taskaya for hiring top talent fast!
            </p>
            <span className="font-semibold text-[var(--accent-color)]">
              — David Kim
            </span>
            <span className="text-md text-[var(--accent-color)] opacity-70">
              Founder, StartupX
            </span>
          </div>

          {/* Testimonial Card 3 */}
          <div
            className="testimonial-card snap-start w-full flex-shrink-0 p-6 flex flex-col items-start   rounded-xl transition-transform duration-300 hover:scale-[1.02] will-change-transform"
            style={{
              scrollSnapAlign: "start",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            <p className="italic text-lg opacity-90 mb-4">
              I’ve tried many platforms, but Taskaya is by far the most
              user-friendly and effective one for finding skilled freelancers.
            </p>
            <span className="font-semibold text-[var(--accent-color)]">
              — Priya Rao
            </span>
            <span className="text-md text-[var(--accent-color)] opacity-70">
              Marketing Director, CreativeHub
            </span>
          </div>
        </div>

        {/* Left Arrow Outside */}
        <button
          aria-label="Previous Testimonial"
          onClick={() => scroll("left")}
          disabled={atStart}
          className={`absolute top-1/2 left-0 -translate-x-1/2 transform -translate-y-1/2 bg-[var(--btn-color)] hover:bg-[var(--hover-color)] text-white p-2 rounded-full shadow-md z-10 transition-opacity ${
            atStart ? "opacity-40 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>

        {/* Right Arrow Outside */}
        <button
          aria-label="Next Testimonial"
          onClick={() => scroll("right")}
          disabled={atEnd}
          className={`absolute top-1/2 right-0 translate-x-1/2 transform -translate-y-1/2 bg-[var(--btn-color)] hover:bg-[var(--hover-color)] text-white p-2 rounded-full shadow-md z-10 transition-opacity ${
            atEnd ? "opacity-40 cursor-not-allowed" : "opacity-100"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
