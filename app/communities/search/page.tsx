import CommunitiyAside from "@/app/_components/common/CommunityAside";
import Container from "@/app/_components/common/Container";
import { PageCommunityResponse } from "@/app/_types/CommunitySearch";
import Link from "next/link";
import { Suspense } from "react";
import CustomeSelection from "../../_components/common/CustomeSelection";
import SmallNav from "../../_components/common/SmallNav";
import Spinner from "../../_components/common/Spinner";

export const revalidate = 3600;
// {
//   "search": "Data Science",
//   "skills": [
//     "Data Science",
//     "Machine Learning"
//   ],
//   "experienceLevel": "intermediate",
//   "hourlyRateMin": 20,
//   "hourlyRateMax": 50,
//   "rate": 4,
//   "isFull": true,
//   "page": 0,
//   "size": 10,
//   "sortBy": "name",
//   "sortDirection": "ASC"
// }
export interface PageProps {
  pathName?: string;
  searchParams: Promise<{
    skills?: string;
    jobType?: string;
    minRate?: string;
    maxRate?: string;
    query?: string;
    page?: string | "1";
    rate?: string;
    isFull?: boolean;
    advanced?: string;
    "Sort by"?: string;
    "Sort direction"?: "ASC" | "DESC";
  }>;
}

let paginations: PageCommunityResponse;

paginations = {
  content: [
    {
      id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
      isFull: true,
      name: "Data Science Enthusiasts",
      experienceLevel: "Intermediate",
      description: "A community for data science enthusiasts...",
      skills: ["Data Science", "Machine Learning"],
      memberCount: 500,
      rating: 4.7,
      pricePerHour: 29.99,
      profilePicture: "https://example.com/community.jpg",
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
  totalElements: 100,
  totalPages: 10,
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

// const getProjectLength = (length: string): string => {
//   switch (length) {
//     case "Less than one month":
//       return "_less_than_1_month";
//     case "1 to 3 months":
//       return "_1_to_3_months";
//     case "3 to 6 months":
//       return "_3_to_6_months";
//     case "More than 6 months":
//       return "_more_than_6_months";
//     default:
//       return "Unknown duration";
//   }
// };

const Page = async ({ searchParams }: PageProps) => {
  // Await the promise to get the query parameters.
  const params = await searchParams;
  const {
    query,
    skills,
    isFull,
    page,
    rate,
    minRate,
    maxRate,

    advanced,
    "Sort by": sortBy,
    "Sort direction": sortDirection,
  } = params;

  // Show advanced filters if advanced=true in the query.
  const showAdvanced = advanced === "true";

  const decodedSearch = query ? decodeURIComponent(query) : "";

  // Convert comma‑separated filter strings to arrays.
  // const experienceArr = experience ? experience.split(",") : [];
  // const projectLengthArr = projectLength ? projectLength.split(",") : [];
  const skillArr = skills ? skills.split(",") : [];

  // const ResProjectLength = projectLengthArr.map((length) =>
  //   getProjectLength(length)
  // );

  try {
    const hourlyRateMinNumber = minRate ? Number(minRate) : undefined;
    const hourlyRateMaxNumber = maxRate ? Number(maxRate) : undefined;
    const pageNumber = Number(page) ? Number(page) : 1;
    const rating = rate ? Number(rate) : undefined;

    const request = {
      search: decodedSearch,
      skills: skillArr,
      isFull: isFull,
      hourlyRateMin: hourlyRateMinNumber,
      hourlyRateMax: hourlyRateMaxNumber,
      page: pageNumber - 1,
      size: 10,
      sortBy: sortBy,
      sortDirection: sortDirection,
      rate: rating,
    };

    console.log(request);
    // const res = await searchJobs(request);
    // paginations = res;
  } catch (error) {
    console.error("Community search failed:", error);
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
        <SmallNav pathname="/communities/search" />

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
            <CommunitiyAside />
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
            {/* <JobList jobs={paginations} /> */}
          </Suspense>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};

export default Page;
