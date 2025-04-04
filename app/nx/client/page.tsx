import { redirect } from "next/navigation";

type Props = { params: string };

export default function page({}: Props) {
  redirect("/nx/client/discover-talents");
}
