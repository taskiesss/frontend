/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CommunityProfileResponse from "@/app/_types/CommunityProfileResponse";
import { useState } from "react";
import CommunityCoverPhoto from "./CoverPhoto";
import CommunityHeader from "./ProfileHeader";
import Skill from "../common/Skill";
import EditButton from "../common/EditButton";
import SkillForm from "./Forms/SkillForm";
import AboutForm from "./Forms/AboutForm";
import HorizontalCarousel from "./TeamMembers";

interface Props {
  editable: boolean;
  community: CommunityProfileResponse;
  id: string;
}

const items = [
  {
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Andrew Gamal",
    name: "Andrew Gamal",
    position: "Frontend Developer",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Jane Smith",
    name: "Jane Smith",
    position: "Backend Engineer",
  },
  {
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "John Doe",
    name: "John Doe",
    position: "UI/UX Designer",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Sarah Johnson",
    name: "Sarah Johnson",
    position: "Full Stack Developer",
  },
  {
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Michael Brown",
    name: "Michael Brown",
    position: "Data Scientist",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "David Wilson",
    name: "David Wilson",
    position: "DevOps Engineer",
  },
  {
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Emma Taylor",
    name: "Emma Taylor",
    position: "Product Manager",
  },
  {
    src: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Alex Martinez",
    name: "Alex Martinez",
    position: "Mobile Developer",
  },
  {
    src: "https://images.unsplash.com/photo-1587614387466-0a72ca909e16?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Olivia Lee",
    name: "Olivia Lee",
    position: "UX Researcher",
  },
  {
    src: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    alt: "Ryan Thompson",
    name: "Ryan Thompson",
    position: "QA Engineer",
  },
];
export default function Profile({ community, editable, id }: Props) {
  const [editSkillSection, setEditSkillSection] = useState(false);

  const [editLanguageSection, setEditLanguageSection] = useState(false);
  const [editEducationSection, setEditEducationSection] = useState(false);
  const [editAboutSection, setEditAboutSection] = useState(false);
  const [editPortfolioSection, setEditPortfolioSection] = useState(false);
  const [editLinksSection, setEditLinksSection] = useState(false);
  const [editHPWSection, setEditHPWSection] = useState(false);
  const [editEmpHisSection, setEditEmpHisSection] = useState(false);

  console.log(community);

  return (
    <div className="flex flex-col items-center gap-6">
      <CommunityCoverPhoto
        community={{
          coverPhoto: community.coverPhoto,
          id,
        }}
        isAdmin={community.isAdmin}
      />
      <CommunityHeader
        community={{
          name: community.name,
          profilePicture: community.profilePicture,
          title: community.title,
          country: community.country,
          pricePerHour: community.pricePerHour,

          rate: community.rate,
          id,
          isMember: community.isMember,
          isAdmin: community.isAdmin,
          isFull: community.isFull,
        }}
      />

      {/* Skills Section */}
      <div className="flex w-9/12 justify-between bg-[var(--foreground-color)] rounded-2xl py-8 px-6">
        <div className=" flex flex-col gap-5  ">
          <h2 className="text-3xl font-bold">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {community.skills.map((skill, index) => (
              <Skill index={index} skill={skill} key={index} />
            ))}
          </div>
        </div>

        {editSkillSection && (
          <SkillForm
            skills={community.skills}
            closeEdit={() => setEditSkillSection(false)}
            id={id}
          ></SkillForm>
        )}

        {editable && (
          <div className="self-start">
            <EditButton onClick={() => setEditSkillSection(true)} />
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="flex w-9/12 rounded-2xl justify-between py-8 px-6  bg-[var(--foreground-color)] ">
        <div className="flex flex-col gap-5 w-11/12">
          <h2 className="text-3xl font-bold">About</h2>
          <div className="flex gap-2 flex-wrap w-full">
            <p className="text-lg py-2 w-full whitespace-pre-wrap">
              {community.description}
            </p>
          </div>
        </div>

        {editAboutSection && (
          <AboutForm
            description={community.description}
            closeEdit={() => setEditAboutSection(false)}
            id={id}
          ></AboutForm>
        )}
        {editable && (
          <div className="self-start">
            <EditButton onClick={() => setEditAboutSection(true)} />
          </div>
        )}
      </div>

      <HorizontalCarousel items={items} />
    </div>
  );
}
