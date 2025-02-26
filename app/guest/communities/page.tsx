/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Container from "../../_components/common/Container";
import CommunityList from "../../_components/Community/CommunityList";
import { PageCommunityResponse } from "../../_types/CommunitySearch";
import { searchCommunities } from "../../_lib/Search/Search";

type Props = {
  searchParams: Promise<{
    page?: string | "0";
  }>;
};

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
//       profilePicture:
//         "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
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

export default async function page({ searchParams }: Props) {
  const params = await searchParams;
  const { page } = params;
  const pageNumber = Number(page) ? Number(page) : 1;
  try {
    paginations = await searchCommunities({ page: pageNumber - 1, size: 10 });
  } catch (e: any) {
    console.error(e.message);
  }
  return (
    <Container className="py-6">
      {paginations?.content && paginations?.content.length > 0 ? (
        <CommunityList communities={paginations} />
      ) : (
        <div className=" grid place-items-center min-h-screen">
          <span className="text-[var(--accent-color)] text-3xl">
            There is no Communities...
          </span>
        </div>
      )}
    </Container>
  );
}
