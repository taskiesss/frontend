import React from "react";
import Container from "../_components/common/Container";
import FreelancerList from "../_components/Freelancer/FreelancerList";
import { PageFreelancerResponse } from "../_types/FreelancerSearch";

type Props = { pathname: string };

let paginations: PageFreelancerResponse;

paginations = {
  content: [
    {
      id: "1",
      name: "John Doe",
      title: "Senior Python Developer",
      description: "Experienced developer with expertise in Python and Django.",
      skills: ["Python", "Django"],
      rate: 4.8,
      pricePerHour: 50,
      profilePicture:
        "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
    },
    {
      id: "2",
      name: "Jane Smith",
      title: "Full-Stack Developer",
      description: "Skilled in both front-end and back-end development.",
      skills: ["JavaScript", "React", "Node.js"],
      rate: 4.5,
      pricePerHour: 45,
      profilePicture:
        "https://res.cloudinary.com/dvds6blan/image/upload/v1739139229/samples/imagecon-group.jpg",
    },
    {
      id: "3",
      name: "Mike Johnson",
      title: "Data Scientist",
      description: "Expert in data analysis and machine learning.",
      skills: ["Python", "Machine Learning", "Data Analysis"],
      rate: 4.7,
      pricePerHour: 60,
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

export default function Page({}: Props) {
  return (
    <Container className="py-6">
      {paginations?.content && paginations.content.length > 0 ? (
        <FreelancerList freelancers={paginations} />
      ) : (
        <div className="flex flex-row place-content-center justify-center">
          <span className="text-[var(--accent-color)] text-3xl text-center">
            There are no Freelancers...
          </span>
        </div>
      )}
    </Container>
  );
}
