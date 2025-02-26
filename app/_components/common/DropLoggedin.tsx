"use state";
import Link from "next/link";
import React from "react";

interface DropLoggedinProps {
  options: { label: string; link: string }[];
  onClose: () => void;
}

const DropLoggedin: React.FC<DropLoggedinProps> = ({ options, onClose }) => {
  return (
    <ul className="flex flex-col bg-[var(--foreground-color)] p-2 rounded shadow min-w-max">
      {options.map((o) => (
        <li key={o.link} className="p-4 border-b border-gray-300 last:border-0">
          <Link href={o.link}>
            <button onClick={onClose}>
              <span className="cursor-pointer hover:text-[var(--hover-color)]">
                {o.label}
              </span>
            </button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DropLoggedin;
