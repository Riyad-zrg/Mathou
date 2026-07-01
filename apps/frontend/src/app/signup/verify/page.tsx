import path from "path";
import VerifyEmailPageComponent from "./verifyEmailPageComponent";
import { usePathname } from "next/navigation";
export default async function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const pathname = usePathname();
  const verification_token = (await searchParams).verification_token;

  console.log("pathname", pathname);
  console.log("verifToken", verification_token);
  return <VerifyEmailPageComponent verification_token={verification_token} />;
}
