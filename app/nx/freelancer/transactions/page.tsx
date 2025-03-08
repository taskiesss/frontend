import Finance from "@/app/_components/financeTransactions/Finance";
import React from "react";
const profile = {
  profilePicture: "https://example.com/images/isabel-austin.jpg",
  name: "Isabel Austin",
  totalBalance: 1000,
};
function page() {
  return <Finance profile={profile} />;
}

export default page;
