import Profile from "@/app/_components/freelancerProfile/Profile";
import React from "react";

type Props = { params: string };

export default function page({}: Props) {
  return <Profile editable={true} />;
}
