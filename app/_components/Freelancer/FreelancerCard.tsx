"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FreelancerResponse } from "@/app/_types/FreelancerSearch"; // Adjust the path as needed
import Skill from "../common/Skill";
import StarRating from "../common/StarRating";
import userprofile from "@/public/images/userprofile.jpg";

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
  } = freelancer;

  // Use usePathname to get the current path.
  const currentPath = usePathname();
  // Append the freelancer id to create a dynamic detail URL.
  // console.log(currentPath);
  const detailUrl =
    currentPath === "/nx/freelancer/search/freelancers"
      ? `/nx/freelancer/profile/${id}`
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
    <div className="group relative overflow-hidden bg-[var(--background-color)] border-solid border-t-[0.1rem] border-[var(--border-secondary)] w-11/12 transform transition-all duration-300">
      {/* Pseudo-element for hover animation */}
      <div className="absolute inset-0 bg-[var(--foreground-color)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>

      {/* Content container ensuring content appears above the pseudo-element */}
      <div className="relative z-10">
        {/* Container for profile image and freelancer details */}
        <div className="flex flex-row items-start py-5 gap-5">
          {/* Profile Image */}
          <div className="w-36 rounded-xl">
            {profilePicture ? (
              <Image
                src={profilePicture}
                alt={`${name} Profile`}
                width={100}
                height={100}
                quality={100}
                className="object-cover w-full rounded-xl"
              />
            ) : (
              <Image
                src={userprofile}
                alt="Freelancer Profile"
                width={100}
                height={100}
                quality={100}
                className="object-cover w-full rounded-xl"
              />
            )}
          </div>

          {/* Freelancer Details */}
          <div className="flex-1">
            <Link
              href={detailUrl}
              className="block text-4xl text-[var(--accent-color)] no-underline hover:text-[var(--btn-color)] hover:underline"
            >
              {name}
            </Link>
            <span className="text-xl block text-slate-500">{title}</span>
            <div className="pointer-events-none py-[0.2rem]">
              <StarRating
                maxRating={5}
                defaultRating={rate}
                color="var(--star)"
                size={18}
              />
            </div>
            <span className="text-slate-500 block">
              Hourly: ${pricePerHour}
            </span>
            <p className="text-xl py-1">{description}</p>

            {/* Scrollable Skills Section */}
            <div className="relative flex items-center py-2 px-4">
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 z-10 bg-[var(--background-color)] text-[var(--accent-color)] px-2 py-1 hover:bg-[var(--background-color)] text-xl cursor-pointer"
                >
                  ◀
                </button>
              )}

              <div
                ref={scrollRef}
                className="flex gap-4 overflow-hidden scroll-smooth whitespace-nowrap w-full"
              >
                {skills.map((skill, index) => (
                  <Skill key={index} skill={skill} index={index} />
                ))}
              </div>

              {showRightArrow && (
                <button
                  onClick={scrollRight}
                  className="absolute right-0 z-10 bg-[var(--background-color)] text-[var(--accent-color)] text-xl px-2 py-1 hover:bg-[var(--background-color)] cursor-pointer"
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
