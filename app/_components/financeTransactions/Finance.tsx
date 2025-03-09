// components/Finance.tsx
import React from "react";
import Container from "../common/Container";
import Image from "next/image";
import userprofile from "@/public/images/userprofile.jpg";
import wallet from "@/public/images/wallet-money-business-svgrepo-com.svg";
import RightPanel from "./RightPanel";

type Props = {
  profile: {
    profilePicture: string;
    name: string;
    totalBalance: number;
  };
};

function Finance({ profile }: Props) {
  return (
    <Container className="py-5 flex gap-7">
      {/* Left Panel */}
      <div className="flex flex-col gap-4 w-1/5 rounded-xl items-center">
        <div className="flex flex-col gap-4 bg-[var(--foreground-color)] w-full p-5 rounded-xl items-center">
          <div className="relative w-14 md:w-24 lg:w-28 aspect-square rounded-full flex-shrink-0 ">
            <Image
              src={userprofile}
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
          <div className="flex flex-col">
            <span className="text-center text-3xl font-extrabold ">
              ${profile.totalBalance.toFixed(2)}
            </span>
            <span className="text-gray-500">Available balance</span>
          </div>
          <div className="flex justify-between border-t-2 border-solid border-gray-500 w-full">
            <button className="p-5 text-lg">Withdraw</button>
            <button className="p-5 text-lg">Deposit</button>
          </div>
        </div>
      </div>
      {/* Right Panel */}
      <RightPanel />
    </Container>
  );
}

export default Finance;
