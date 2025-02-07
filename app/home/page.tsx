import Aside from "@/app/_components/common/Aside";
import Link from "next/link";
import { Suspense } from "react";
import CustomeSelection from "../_components/common/CustomeSelection";
import JobList from "../_components/common/JobList";
import Spinner from "../_components/common/Spinner";
import { searchJobs } from "../_lib/Search/Search";
import { PageJobResponse } from "../_types/JobSearch";
import SmallNav from "../_components/common/SmallNav";

export const revalidate = 3600;

export interface PageProps {
  searchParams: Promise<{
    type?: string;
    skills?: string[];
    experience?: string;
    jobType?: string;
    minRate?: string;
    maxRate?: string;
    projectLength?: string;
    search?: string;
    page?: string;
    rate?: string;

    "Sort by"?: string;
    "Sort direction"?: "ASC" | "DESC";
  }>;
}
let paginations: PageJobResponse;

// paginations = {
//   content: [
//     {
//       id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
//       title: "Full Stack Developer",
//       description: "Seeking a skilled React developer...",
//       experienceLevel: "Intermediate",
//       skills: ["React", "HTML", "CSS", "JavaScript"],
//       pricePerHour: 29.99,
//       postedDate: "2024-02-02",
//       projectLength: "_1_to_3_months",
//       rate: 4,
//       isSaved: false,
//     },
//   ],
//   pageable: {
//     sort: {
//       sorted: false,
//       unsorted: true,
//       empty: false,
//     },
//     offset: 0,
//     pageNumber: 0,
//     pageSize: 10,
//     paged: true,
//     unpaged: false,
//   },
//   totalElements: 50,
//   totalPages: 5,
//   last: false,
//   size: 10,
//   number: 0,
//   sort: {
//     sorted: false,
//     unsorted: true,
//     empty: false,
//   },
//   numberOfElements: 10,
//   first: true,
//   empty: false,
// };

const getProjectLength = (length: string): string => {
  switch (length) {
    case "Less than one month":
      return "_less_than_1_month";
    case "1 to 3 months":
      return "_1_to_3_months";
    case "3 to 6 months":
      return "_3_to_6_months";
    case "More than 6 months":
      return "_more_than_6_months";
    default:
      return "Unknown duration";
  }
};

const Page = async ({ searchParams }: PageProps) => {
  // Await the promise to get the actual query parameters object
  const params = await searchParams;
  const currentType = params?.type || "";

  // Destructure the awaited object (params) instead of the promise
  const {
    search,
    type,
    skills,
    experience,
    page,
    rate,
    minRate,
    maxRate,
    projectLength,
    "Sort by": sortBy, // Using the decoded key with space
    "Sort direction": sortDirection,
  } = params;

  const decodedSearch = search ? decodeURIComponent(search) : "";

  // If some values are comma-separated, convert them into arrays
  const experienceArr = experience ? experience.split(",") : [];
  const projectLengthArr = projectLength ? projectLength.split(",") : [];

  let ResProjectLength = projectLengthArr?.map((length: string) =>
    getProjectLength(length)
  );

  try {
    // Convert string values to numbers. If the conversion fails, fallback to undefined.
    const hourlyRateMinNumber = minRate ? Number(minRate) : undefined;
    const hourlyRateMaxNumber = maxRate ? Number(maxRate) : undefined;
    const pageNumber = page ? Number(page) : 0;
    const rating = rate ? Number(rate) : undefined;

    const request = {
      search: decodedSearch,
      skills: skills,
      experienceLevel: experienceArr,
      hourlyRateMin: hourlyRateMinNumber,
      hourlyRateMax: hourlyRateMaxNumber,
      projectLength: ResProjectLength,
      page: pageNumber,
      size: 10,
      sortBy: sortBy,
      sortDirection: sortDirection,
      rate: rating,
    };
    console.log(request);
    const res = await searchJobs(request);
    paginations = res;
  } catch (error) {
    console.error("Job search failed:", error);
  }

  const SortByOptions = [
    { label: "Newest", value: "newest" },
    { label: "title", value: "title" },
    { label: "Client Rating", value: "client_rating" },
  ];
  const DirectionOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
  ];

  return (
    <div className="h-screen grid grid-cols-[1fr_3fr] grid-rows-[min-content_min-content_1fr]">
      <SmallNav currentType={currentType} />
      <div className="col-span-2 bg-[var(--foreground-color)] p-4 flex justify-end">
        <Suspense fallback={<Spinner />}>
          <CustomeSelection options={SortByOptions}>Sort by</CustomeSelection>
          <CustomeSelection options={DirectionOptions}>
            Sort direction
          </CustomeSelection>
        </Suspense>
      </div>

      <Aside />
      <Suspense fallback={<Spinner />}>
        {type === "jobs" ? (
          <JobList jobs={paginations} />
        ) : type === "freelancer" ? (
          <span>Freelancers</span>
        ) : (
          <span>Community</span>
        )}
      </Suspense>
    </div>
  );
};

export default Page;
