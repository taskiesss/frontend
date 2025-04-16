/* eslint-disable @typescript-eslint/no-explicit-any */
import { timeAgo } from "@/app/_helpers/helper";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  p: any;
  i: number;
  handleDelete: any;
};

function Comment({ p, i, handleDelete }: Props) {
  return (
    <li
      className="flex gap-4 items-center hover:opacity-80 transition-opacity relative"
      key={i}
    >
      {/* delete button */}
      <button
        onClick={() => handleDelete(p.content.commentId)}
        className="absolute self-start right-4 opacity-70 hover:opacity-100 transition-opacity"
      >
        <FontAwesomeIcon icon={faTrash} className="text-lg" />
      </button>

      <div className="w-fit self-start">
        <Link href={`/nx/freelancer/profile/${p.postOwner.id}`}>
          <div className="relative w-16 aspect-square rounded-full overflow-hidden">
            <Image
              src={p.postOwner.profilePicture}
              alt={`${p.postOwner.name} img`}
              fill
              className="object-cover rounded-full overflow-hidden"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </Link>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div>
          <Link
            href={`/nx/freelancer/profile/${p.postOwner.id}`}
            className="hover:text-[var(--button-hover-background-color)] hover:underline text-lg font-semibold"
          >
            <span className="text-lg font-semibold">{p.postOwner.name}</span>
          </Link>
          <p className="text-sm opacity-80">{timeAgo(p.date)}</p>
        </div>
        <p className="text-lg whitespace-pre-wrap">{p.content}</p>
      </div>
    </li>
  );
}

export default Comment;
