"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreelancerResponse } from "@/app/_types/FreelancerSearch"; // Adjust the path as needed
import Skill from "../common/Skill";
import StarRating from "../common/StarRating";
import userprofile from "@/public/images/userprofile.jpg";
import { getExperienceLevel } from "@/app/_helpers/helper";

interface FreelancerCardProps {
  freelancer: FreelancerResponse;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer }) => {
  const {
    id,
    name,
    title,
    description,
    skills,
    rate,
    pricePerHour,
    profilePicture,
    experienceLevel,
    avrgHoursPerWeek,
  } = freelancer;

  // Use usePathname to get the current path.
  const currentPath = usePathname();
  // Append the freelancer id to create a dynamic detail URL.
  // console.log(currentPath);
  const detailUrl =
    currentPath === "/nx/freelancer/search/freelancers"
      ? `/nx/freelancer/profile/${id}`
      : currentPath === "/nx/client/discover-talents" ||
        currentPath === "/nx/client/search/freelancers"
      ? `/nx/client/discover-talents/${id}`
      : `/guest/freelancers/${id}`;

  // Reference and state for the scrollable skills container.
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrowsVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateArrowsVisibility();
    const handleResize = () => updateArrowsVisibility();
    window.addEventListener("resize", handleResize);
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
    <div className="group relative overflow-hidden bg-[var(--background-color)] border-solid border-t-[0.1rem] border-[var(--border-secondary)] w-full sm:w-11/12 mx-auto transform transition-all duration-300">
      {/* Pseudo-element for hover animation */}
      <div className="absolute inset-0 bg-[var(--foreground-color)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>

      {/* Content container ensuring content appears above the pseudo-element */}
      <div className="relative z-10">
        {/* Container for profile image and freelancer details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start py-3 sm:py-5 gap-3 sm:gap-5 px-2 sm:px-4">
          {/* Profile Image */}
          <div className="relative w-24 sm:w-28 md:w-32 aspect-square rounded-xl">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={`${name} Profile`}
                fill
                quality={70}
                className="rounded-full object-cover"
                sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
              />
            ) : (
              <Image
                src={userprofile}
                alt="Freelancer Profile"
                width={100}
                height={100}
                quality={70}
                className="object-cover w-full rounded-xl"
              />
            )}
          </div>

          {/* Freelancer Details */}
          <div className="flex-1 w-full text-center sm:text-left">
            <Link
              href={detailUrl}
              className="block text-2xl sm:text-3xl md:text-4xl text-[var(--accent-color)] no-underline hover:text-[var(--btn-color)] hover:underline"
            >
              {name}
            </Link>
            <span className="text-lg sm:text-xl block text-slate-500">
              {title}
            </span>
            <div className="pointer-events-none py-[0.2rem] flex justify-center sm:justify-start">
              <StarRating
                maxRating={5}
                defaultRating={rate}
                color="var(--star)"
                size={16}
                allowHalf={true}
              />
            </div>
            <span className="text-sm sm:text-base text-slate-500 block">
              Hourly: ${pricePerHour} - {getExperienceLevel(experienceLevel)} -{" "}
              {avrgHoursPerWeek} hr/week
            </span>
            <p className="text-base sm:text-lg md:text-xl py-1 whitespace-pre-wrap">
              {description}
            </p>

            {/* Scrollable Skills Section */}
            <div className="relative flex items-center py-2 px-2 sm:px-4">
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 z-10 bg-[var(--background-color)] text-[var(--accent-color)] px-1 sm:px-2 py-1 hover:bg-[var(--background-color)] text-lg sm:text-xl cursor-pointer"
                >
                  ◀
                </button>
              )}

              <div
                ref={scrollRef}
                className="flex gap-2 sm:gap-4 overflow-x-auto scrollbar-hide scroll-smooth whitespace-nowrap w-full px-4 sm:px-0"
              >
                {skills.map((skill, index) => (
                  <Skill key={index} skill={skill} index={index} />
                ))}
              </div>

              {showRightArrow && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 z-10 bg-[var(--background-color)] text-[var(--accent-color)] text-lg sm:text-xl px-1 sm:px-2 py-1 hover:bg-[var(--background-color)] cursor-pointer"
                >
                  ▶
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerCard;
