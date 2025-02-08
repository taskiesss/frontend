import Link from "next/link";
import React from "react";

type Props = { pathname?: string };

export default function SmallNav({ pathname }: Props) {
  return (
    <nav className="col-span-2 bg-[var(--background-color)] pt-20 pb-3 flex items-center border-solid  border-gray-600 border-b-[0.03rem]  ">
      <ul className="flex gap-44">
        <li>
          <Link
            href={{ pathname: "/jobs", query: { page: "0" } }}
            className={`text-lg text-[var(--accent-color)]${
              pathname === "/jobs"
                ? " text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : " hover:text-[var(--hover-color)]"
            }`}
          >
            Jobs
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/communities", query: { page: "0" } }}
            className={`text-lg text-[var(--accent-color)] ${
              pathname === "/communities"
                ? "text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : "hover:text-[var(--hover-color)]"
            }`}
          >
            Communities
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/freelancer", query: { page: "0" } }}
            className={`text-lg text-[var(--accent-color)] ${
              pathname === "/freelancer"
                ? "text-2xl text-[var(--hover-color)] font-extrabold hover:text-[var(--hover-color)]"
                : "hover:text-[var(--hover-color)]"
            }`}
          >
            Freelancers
          </Link>
        </li>
      </ul>
    </nav>
  );
}
