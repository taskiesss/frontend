import Link from "next/link";
import React from "react";

type Props = {
  pathname?: string;
  role?: "freelancer" | "client" | undefined;
  queryString?: string; // Query string passed from the parent (e.g., "query=Machine")
};

export default function SmallNav({ pathname, role, queryString = "" }: Props) {
  // Prepend "?" to query string if it exists, otherwise use empty string
  const querySuffix = queryString ? `?${queryString}` : "";

  // Dynamic paths based on role, with query string appended
  const jobsPath = `${
    role ? `/nx/${role}/search/jobs` : `/guest/search/jobs`
  }${querySuffix}`;
  const communitiesPath = `${
    role ? `/nx/${role}/search/communities` : `/guest/search/communities`
  }${querySuffix}`;
  const freelancersPath = `${
    role ? `/nx/${role}/search/freelancers` : `/guest/search/freelancers`
  }${querySuffix}`;

  return (
    <nav className="col-span-2 bg-[var(--background-color)] pt-20 pb-3 flex items-center border-solid border-gray-600 border-b-[0.03rem]">
      <ul className="flex gap-44">
        {role === "freelancer" && (
          <li>
            <Link
              href={jobsPath}
              className={`text-lg text-[var(--accent-color)]${
                pathname === jobsPath.split("?")[0]
                  ? " text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                  : " hover:text-[var(--hover-color)]"
              }`}
            >
              Jobs
            </Link>
          </li>
        )}

        <li>
          <Link
            href={freelancersPath}
            className={`text-lg text-[var(--accent-color)]${
              pathname === freelancersPath.split("?")[0]
                ? " text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : " hover:text-[var(--hover-color)]"
            }`}
          >
            Freelancers
          </Link>
        </li>
        <li>
          <Link
            href={communitiesPath}
            className={`text-lg text-[var(--accent-color)]${
              pathname === communitiesPath.split("?")[0]
                ? " text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : " hover:text-[var(--hover-color)]"
            }`}
          >
            Communities
          </Link>
        </li>
      </ul>
    </nav>
  );
}
