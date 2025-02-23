/* eslint-disable @typescript-eslint/no-unused-vars */
import Container from "@/app/_components/common/Container";
import AllContracts from "@/app/_components/contracts page/allContracts";
import React from "react";

type Props = { contracts?: string };

function page({ contracts }: Props) {
  return (
    <Container>
      <AllContracts />
    </Container>
  );
}

export default page;
