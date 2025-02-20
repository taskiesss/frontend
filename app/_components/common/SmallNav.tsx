import Link from "next/link";
import React from "react";

type Props = {
  pathname?: string;
  role?: "freelancer" | "client";
};

export default function SmallNav({ pathname, role }: Props) {
  // If a role is provided, use the dynamic URLs for logged-in users.
  // Otherwise, use the original URLs.
  const jobsPath = role ? `/nx/${role}/search/jobs` : `/jobs/search`;
  const communitiesPath = role
    ? `/nx/${role}/search/communities`
    : `/communities/search`;
  const freelancersPath = role
    ? `/nx/${role}/search/freelancers`
    : `/freelancers/search`;

  return (
    <nav className="col-span-2 bg-[var(--background-color)] pt-20 pb-3 flex items-center border-solid border-gray-600 border-b-[0.03rem]">
      <ul className="flex gap-44">
        <li>
          <Link
            href={{ pathname: jobsPath, query: { page: "1" } }}
            className={`text-lg text-[var(--accent-color)]${
              pathname === jobsPath
                ? " text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : " hover:text-[var(--hover-color)]"
            }`}
          >
            Jobs
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: communitiesPath, query: { page: "1" } }}
            className={`text-lg text-[var(--accent-color)]${
              pathname === communitiesPath
                ? " text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : " hover:text-[var(--hover-color)]"
            }`}
          >
            Communities
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: freelancersPath, query: { page: "1" } }}
            className={`text-lg text-[var(--accent-color)]${
              pathname === freelancersPath
                ? " text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : " hover:text-[var(--hover-color)]"
            }`}
          >
            Freelancers
          </Link>
        </li>
      </ul>
    </nav>
  );
}
