/* eslint-disable @typescript-eslint/no-explicit-any */
import AdvancedSearchButton from "@/app/_components/Community/AdvancedSearchButton";
import CommunityList from "@/app/_components/Community/CommunityList";
import Container from "@/app/_components/common/Container";
import CustomeSelection from "@/app/_components/common/CustomeSelection";
import Spinner from "@/app/_components/common/Spinner";
import { searchCommunities } from "@/app/_lib/Search/Search";
import { PageCommunityResponse } from "@/app/_types/CommunitySearch";
import { Suspense } from "react";

export const revalidate = 3600;

export interface PageProps {
  pathName?: string;
  searchParams: Promise<{
    skills?: string;
    experience?: string;
    jobType?: string;
    minRate?: string;
    maxRate?: string;
    query?: string;
    page?: string | "1";
    rate?: string;
    isFull?: boolean;
    "Sort by"?: string;
    "Sort direction"?: "ASC" | "DESC";
  }>;
}

let paginations: PageCommunityResponse;

// paginations = {
//   content: [
//     {
//       id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
//       isFull: true,
//       name: "Data Science Enthusiasts",
//       experienceLevel: "intermediate",
//       description: "A community for data science enthusiasts...",
//       skills: ["Data Science", "Machine Learning"],
//       memberCount: 500,
//       rating: 4.7,
//       pricePerHour: 29.99,
//       profilePicture: "",
//     },
//     {
//       id: "887sda4d-c986-44c9-bba8-d1bef62d1c91",
//       isFull: true,
//       name: "Data Science Enthusiasts",
//       experienceLevel: "intermediate",
//       description: "A community for data science enthusiasts...",
//       skills: ["Data Science", "Machine Learning"],
//       memberCount: 500,
//       rating: 4.7,
//       pricePerHour: 29.99,
//       profilePicture:
//         "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
//     },
//     {
//       id: "887ada4d-c986-44c9-bba8-d1bef62d1c91",
//       isFull: true,
//       name: "Data Science Enthusiasts",
//       experienceLevel: "intermediate",
//       description: "A community for data science enthusiasts...",
//       skills: ["Data Science", "Machine Learning"],
//       memberCount: 500,
//       rating: 4.7,
//       pricePerHour: 29.99,
//       profilePicture:
//         "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
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
//   totalElements: 100,
//   totalPages: 10,
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

const Page = async ({ searchParams }: PageProps) => {
  // Await the promise to get the query parameters.
  const params = await searchParams;
  const {
    experience,
    query,
    skills,
    isFull,
    page,
    rate,
    minRate,
    maxRate,

    "Sort by": sortBy,
    "Sort direction": sortDirection,
  } = params;

  // Show advanced filters if advanced=true in the query.

  const decodedSearch = query ? decodeURIComponent(query) : "";

  // Convert comma‑separated filter strings to arrays.
  const experienceArr = experience ? experience.split(",") : [];
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
      experienceLevel: experienceArr,
      hourlyRateMin: hourlyRateMinNumber,
      hourlyRateMax: hourlyRateMaxNumber,
      page: pageNumber - 1,
      size: 10,
      sortBy: sortBy,
      sortDirection: sortDirection,
      rate: rating,
    };

    // console.log(request);
    const res = await searchCommunities(request);
    paginations = res;
  } catch (error: any) {
    console.error("Community search failed:", error.message);
  }

  const SortByOptions = [
    { label: "Rate", value: "Rate" },
    { label: "Price Per Hour", value: "pricePerHour" },
  ];
  const DirectionOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
  ];

  return (
    <Container>
      <div className="h-screen grid grid-cols-[0.65fr_3fr] grid-rows-[min-content_min-content_1fr]">
        {/* Top navigation */}

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
        <AdvancedSearchButton />

        {/* Job results */}
        {paginations?.content && paginations?.content.length > 0 ? (
          <Container className="w-full px-3 sm:px-5 lg:px-7 xl:px-14">
            <Suspense fallback={<Spinner />}>
              <CommunityList communities={paginations} />
            </Suspense>
          </Container>
        ) : (
          <div className=" grid place-items-center min-h-screen">
            <span className="text-[var(--accent-color)] text-3xl">
              There is no Communities...
            </span>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Page;
