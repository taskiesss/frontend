import React, { useRef } from "react";

export default function JobCard() {
  const content = {
    id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
    title: "Full Stack Developer",
    description: "Seeking a skilled React developer...",
    experienceLevel: "Intermediate",
    skills: [
      "React",
      "HTML",
      "CSS",
      "JavaScript",
      "Redux",
      "TailwindCSS",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "GraphQL",
    ],
    pricePerHour: 29.99,
    postedDate: "2024-02-02",
    rate: 4,
    isSaved: false,
    projectLength: "_1_to_3_months",
  };

  let projectLength;
  switch (content.projectLength) {
    case "_less_than_1_month":
      projectLength = "Less than 1 month";
      break;
    case "_1_to_3_months":
      projectLength = "1 to 3 months";
      break;
    case "_3_to_6_months":
      projectLength = "3 to 6 months";
      break;
    case "_more_than_6_months":
      projectLength = "More than 6 months";
      break;
    default:
      projectLength = "";
      break;
  }

  // Reference for scrolling
  const scrollRef = useRef<HTMLDivElement>(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-[var(--background-color)] h-auto border-solid border-r-0 border-l-0 border-b-0 border-[var(--foreground-color)] w-[50rem] p-5 px-8">
      <span className="text-slate-500">{content.postedDate}</span>

      <a
        href="#"
        className="block text-4xl text-[--btn-color] no-underline hover:text-[--btn-color] hover:underline"
      >
        {content.title}
      </a>
      <span className="text-slate-500">
        Hourly: ${content.pricePerHour} - {content.experienceLevel} -{" "}
        {projectLength}
      </span>
      <p className="text-xl">{content.description}</p>

      {/* Scrollable Skills Section with Buttons */}
      <div className="relative flex items-center mt-3">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-[var(--background-color)] text-white px-2 py-1 hover:bg-[var(--background-color)] text-xl cursor-pointer"
        >
          ◀
        </button>

        {/* Skills List (Scrollable) */}
        <div
          ref={scrollRef}
          className="flex gap-4 px-8 overflow-hidden scroll-smooth whitespace-nowrap w-full"
        >
          {content.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-[--hover-color] rounded-2xl py-1 px-2 text-base whitespace-nowrap"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 cursor-pointer z-10 bg-[var(--background-color)] text-xl text-white px-2 py-1  hover:bg-[var(--background-color)]"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
