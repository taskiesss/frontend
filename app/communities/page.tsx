import React from "react";
import Container from "../_components/common/Container";
import CommunityList from "../_components/Community/CommunityList";
import { PageCommunityResponse } from "../_types/CommunitySearch";

type Props = { pathname: string };

let paginations: PageCommunityResponse;

paginations = {
  content: [
    {
      id: "887dda4d-c986-44c9-bba8-d1bef62d1c91",
      isFull: true,
      name: "Data Science Enthusiasts",
      experienceLevel: "intermediate",
      description: "A community for data science enthusiasts...",
      skills: ["Data Science", "Machine Learning"],
      memberCount: 500,
      rating: 4.7,
      pricePerHour: 29.99,
      profilePicture:
        "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
    },
    {
      id: "887sda4d-c986-44c9-bba8-d1bef62d1c91",
      isFull: true,
      name: "Data Science Enthusiasts",
      experienceLevel: "intermediate",
      description: "A community for data science enthusiasts...",
      skills: ["Data Science", "Machine Learning"],
      memberCount: 500,
      rating: 4.7,
      pricePerHour: 29.99,
      profilePicture:
        "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
    },
    {
      id: "887ada4d-c986-44c9-bba8-d1bef62d1c91",
      isFull: true,
      name: "Data Science Enthusiasts",
      experienceLevel: "intermediate",
      description: "A community for data science enthusiasts...",
      skills: ["Data Science", "Machine Learning"],
      memberCount: 500,
      rating: 4.7,
      pricePerHour: 29.99,
      profilePicture:
        "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
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

export default function page({}: Props) {
  return (
    <Container className="py-6">
      {paginations?.content ? (
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
