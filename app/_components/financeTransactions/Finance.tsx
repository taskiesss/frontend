// components/Finance.tsx
import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import wallet from "@/public/images/wallet-money-business-svgrepo-com.svg";
import RightPanel from "./RightPanel";

type Props = {
  role?: string;
  profile: {
    profilePicture: string;
    name: string;
    totalBalance: number;
    restrictedOrWorkInProgressBalance: number;
  };
};

function Finance({ profile, role }: Props) {
  return (
    <Container className="py-5 flex gap-7">
      {/* Left Panel */}
      <div className="flex flex-col gap-4 w-1/5 rounded-xl items-center">
        <div className="flex flex-col gap-4 bg-[var(--foreground-color)] w-full p-5 rounded-xl items-center">
          <div className="relative w-14 md:w-24 lg:w-28 aspect-square rounded-full flex-shrink-0 ">
            <Image
              src={profile.profilePicture}
              fill
              priority
              alt="profilepic"
              className="object-cover rounded-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <span className="text-center text-xl ">Hello, {profile.name}</span>
        </div>
        <div className="flex flex-col gap-3 bg-[var(--foreground-color)] w-full rounded-xl items-center">
          <div className="p-5 relative w-14 md:w-24 lg:w-28 aspect-square rounded-full flex-shrink-0 ">
            <Image
              src={wallet}
              fill
              priority
              alt="profilepic"
              className="object-cover rounded-full"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <div className="flex flex-col gap-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 w-full mx-4 mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Available balance
              </div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${profile.totalBalance.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                {role === "client" ? "Restricted" : "Work in progress"}
              </div>
              <div className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                ${profile.restrictedOrWorkInProgressBalance.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex justify-between border-t-2 border-solid border-gray-500 w-full">
            <button className="p-5 text-lg">Withdraw</button>
            <button className="p-5 text-lg">Deposit</button>
          </div>
        </div>
      </div>
      {/* Right Panel */}
      <RightPanel role={role} />
    </Container>
  );
}

export default Finance;
