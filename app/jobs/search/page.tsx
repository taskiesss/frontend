import Container from "@/app/_components/common/Container";
import Aside from "@/app/_components/common/JobAside";
import Link from "next/link";
import { Suspense } from "react";
import CustomeSelection from "../../_components/common/CustomeSelection";
import JobList from "../../_components/common/JobList";
import SmallNav from "../../_components/common/SmallNav";
import Spinner from "../../_components/common/Spinner";
import { searchJobs } from "../../_lib/Search/Search";
import { PageJobResponse } from "../../_types/JobSearch";

export const revalidate = 3600;

export interface PageProps {
  pathName?: string;
  searchParams: Promise<{
    type?: string;
    skills?: string;
    experience?: string;
    jobType?: string;
    minRate?: string;
    maxRate?: string;
    projectLength?: string;
    query?: string;
    page?: string | "1";
    rate?: string;
    advanced?: string; // Controls whether advanced filters are shown
    "Sort by"?: string;
    "Sort direction"?: "ASC" | "DESC";
  }>;
}

let paginations: PageJobResponse;

paginations = {
  content: [
    {
      id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
    {
      id: "884dda4d-c986-44c9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
    {
      id: "884dfa4d-c986-44c9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
    {
      id: "884dda4d-c986-44k9-bba8-d1bef62d1c91",
      title: "Full Stack Developer",
      description: "Seeking a skilled React developer...",
      experienceLevel: "Intermediate",
      skills: ["React", "HTML", "CSS", "JavaScript"],
      pricePerHour: 29.99,
      postedDate: "2024-02-02",
      projectLength: "_1_to_3_months",
      rate: 4,
      isSaved: false,
    },
  ],
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
      empty: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 10,
    paged: true,
    unpaged: false,
  },
  totalElements: 50,
  totalPages: 5,
  last: false,
  size: 10,
  number: 0,
  sort: {
    sorted: false,
    unsorted: true,
    empty: false,
  },
  numberOfElements: 10,
  first: true,
  empty: false,
};

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
  // Await the promise to get the query parameters.
  const params = await searchParams;
  const {
    query,
    skills,
    experience,
    page,
    rate,
    minRate,
    maxRate,
    projectLength,
    advanced,
    "Sort by": sortBy,
    "Sort direction": sortDirection,
  } = params;

  // Show advanced filters if advanced=true in the query.
  const showAdvanced = advanced === "true";

  const decodedSearch = query ? decodeURIComponent(query) : "";

  // Convert comma‑separated filter strings to arrays.
  const experienceArr = experience ? experience.split(",") : [];
  const projectLengthArr = projectLength ? projectLength.split(",") : [];
  const skillArr = skills ? skills.split(",") : [];

  const ResProjectLength = projectLengthArr.map((length) =>
    getProjectLength(length)
  );

  try {
    const hourlyRateMinNumber = minRate ? Number(minRate) : undefined;
    const hourlyRateMaxNumber = maxRate ? Number(maxRate) : undefined;
    const pageNumber = page ? Number(page) : 1;
    const rating = rate ? Number(rate) : undefined;

    const request = {
      search: decodedSearch,
      skills: skillArr,
      experienceLevel: experienceArr,
      hourlyRateMin: hourlyRateMinNumber,
      hourlyRateMax: hourlyRateMaxNumber,
      projectLength: ResProjectLength,
      page: pageNumber - 1,
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
    { label: "Rate", value: "Rate" },
    { label: "Price Per Hour", value: "pricePerHour" },
    { label: "Posted At", value: "postedAt" },
  ];
  const DirectionOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
  ];

  return (
    <Container>
      <div className="h-screen grid grid-cols-[0.75fr_3fr] grid-rows-[min-content_min-content_1fr]">
        {/* Top navigation */}
        <SmallNav pathname="/jobs" />

        {/* Sorting controls */}
        <div className="col-span-2 bg-[var(--background-color)]  flex gap-10 py-4 justify-end">
          <Suspense fallback={<Spinner />}>
            <CustomeSelection options={SortByOptions}>Sort by</CustomeSelection>
            <CustomeSelection options={DirectionOptions}>
              Sort direction
            </CustomeSelection>
          </Suspense>
        </div>

        {/* Advanced search panel or button */}
        {showAdvanced ? (
          <div className="relative">
            <Aside />
          </div>
        ) : (
          <div className="">
            <Link href="?advanced=true">
              <button className="px-4 py-2 bg-[var(--btn-color)] text-[var(--accent-color)] rounded-md">
                Advanced Search
              </button>
            </Link>
          </div>
        )}

        {/* Job results */}
        {paginations ? (
          <Suspense fallback={<Spinner />}>
            <JobList jobs={paginations} />
          </Suspense>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};

export default Page;
