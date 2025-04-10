import Link from "next/link";

type SmallNavProps = {
  communityId: string;
  pathname: string; // To determine the active link
};

export default function SettingsSmallNav({
  communityId,
  pathname,
}: SmallNavProps) {
  return (
    <nav className="bg-[var(--background-color)] pt-6 pb-3 flex items-center border-solid border-gray-600 border-b-[0.03rem]">
      <ul className="flex gap-8">
        <li>
          <Link
            href={`/communities/${communityId}/settings/positions`}
            className={`text-lg text-[var(--accent-color)] whitespace-nowrap py-2 px-0 hover:text-[var(--hover-color)] font-medium ${
              pathname === `/communities/${communityId}/settings/positions`
                ? "text-2xl text-[var(--hover-color)] font-extrabold"
                : "border-transparent"
            }`}
            aria-current="page"
          >
            Positions & Roles
          </Link>
        </li>
      </ul>
    </nav>
  );
}
