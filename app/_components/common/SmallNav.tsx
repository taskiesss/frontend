import Link from "next/link";
import React from "react";

type Props = { currentType: string };

export default function SmallNav({ currentType }: Props) {
  return (
    <nav className="col-span-2 bg-[var(--background-color)] p-4 flex items-center justify-center">
      <ul className="flex gap-44">
        <li>
          <Link
            href={{ pathname: "/home", query: { type: "jobs" } }}
            className={`${
              currentType === "jobs"
                ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
            }`}
          >
            Jobs
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/home", query: { type: "communities" } }}
            className={`${
              currentType === "communities"
                ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
            }`}
          >
            Communities
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/home", query: { type: "freelancer" } }}
            className={`${
              currentType === "freelancer"
                ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
            }`}
          >
            Freelancers
          </Link>
        </li>
      </ul>
    </nav>
  );
}
