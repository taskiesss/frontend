import Link from "next/link";
import React from "react";

type Props = { pathname?: string };

export default function SmallNav({ pathname }: Props) {
  return (
    <nav className="col-span-2 bg-[var(--background-color)] p-4 flex items-center justify-center">
      <ul className="flex gap-44">
        <li>
          <Link
            href={{ pathname: "/jobs", query: { page: "0" } }}
            className={`${
              pathname === "/jobs"
                ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
            }`}
          >
            Jobs
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/communities", query: { page: "0" } }}
            className={`${
              pathname === "/communities"
                ? "text-[var(--accent-color)] font-bold hover:text-[var(--hover-color)]"
                : "text-[var(--foreground-color)] hover:text-[var(--hover-color)]"
            }`}
          >
            Communities
          </Link>
        </li>
        <li>
          <Link
            href={{ pathname: "/freelancer", query: { page: "0" } }}
            className={`${
              pathname === "/freelancer"
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
