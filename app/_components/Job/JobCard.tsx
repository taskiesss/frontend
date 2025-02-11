"use client";
import React, { useRef, useState, useEffect } from "react";
import StarRating from "../common/StarRating";
import Skill from "../common/Skill";
import { timeAgo } from "@/app/_helpers/helper";

// Define TypeScript interface for Job
interface Job {
  id: string;
  title: string;
  description: string;
  experienceLevel: string;
  skills: string[];
  pricePerHour: number;
  postedDate: string;
  projectLength: string;
  rate: number;
  isSaved: boolean;
}

// Define props for JobCard
interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const {
    title,
    description,
    skills,
    experienceLevel,
    pricePerHour,
    postedDate,
    rate,
    projectLength,
  } = job;

  // Mapping project length to human-readable format
  const getProjectLength = (length: string): string => {
    switch (length) {
      case "_less_than_1_month":
        return "Less than 1 month";
      case "_1_to_3_months":
        return "1 to 3 months";
      case "_3_to_6_months":
        return "3 to 6 months";
      case "_more_than_6_months":
        return "More than 6 months";
      default:
        return "Unknown duration";
    }
  };

  // Reference for scrolling
  const scrollRef = useRef<HTMLDivElement>(null);

  // State for arrow visibility
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Update arrow visibility based on scroll position and content size
  const updateArrowsVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    // Initial check on mount
    updateArrowsVisibility();

    // Update arrows on window resize
    const handleResize = () => updateArrowsVisibility();
    window.addEventListener("resize", handleResize);

    // Update arrows on scroll events
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", updateArrowsVisibility);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", updateArrowsVisibility);
      }
    };
  }, []);

  // Scroll Functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="group relative overflow-hidden bg-[var(--background-color)] border-solid border-t-[0.1rem] border-[var(--border-secondary)] w-11/12 ">
      {/* This wrapper adds a before pseudo-element that animates on group hover */}
      <div className="absolute inset-0 bg-[var(--foreground-color)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

      {/* Ensure content stays above the pseudo-element */}
      <div className="relative z-10 py-5">
        {/* Posted Date */}
        <span className="text-slate-500">{timeAgo(postedDate)}</span>

        {/* Star Rating (Non-Interactive) */}
        <div className="pointer-events-none py-[0.2rem]">
          <StarRating
            maxRating={5}
            defaultRating={rate}
            color="var(--star)"
            size={18}
          />
        </div>

        {/* Job Title */}
        <a
          href="#"
          className="block text-4xl text-[--accent-color] no-underline hover:text-[--btn-color] hover:underline"
        >
          {title}
        </a>

        {/* Job Details */}
        <span className="text-slate-500">
          Hourly: ${pricePerHour} - {experienceLevel} -{" "}
          {getProjectLength(projectLength)}
        </span>

        {/* Job Description */}
        <p className="text-xl">{description}</p>

        {/* Scrollable Skills Section with Buttons */}
        <div className="relative flex items-center mt-3">
          {/* Left Scroll Button - rendered only when needed */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-[var(--background-color)] text-white px-2 py-1 hover:bg-[var(--background-color)] text-xl cursor-pointer"
            >
              ◀
            </button>
          )}

          {/* Skills List (Scrollable) */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-hidden scroll-smooth whitespace-nowrap w-full"
          >
            {skills.map((skill, index) => (
              <Skill skill={skill} index={index} key={index} />
            ))}
          </div>

          {/* Right Scroll Button - rendered only when needed */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-0 cursor-pointer z-10 bg-[var(--background-color)] text-xl text-white px-2 py-1 hover:bg-[var(--background-color)]"
            >
              ▶
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
