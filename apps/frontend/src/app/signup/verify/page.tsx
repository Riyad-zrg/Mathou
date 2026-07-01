import VerifyEmailPageComponent from "./verifyEmailPageComponent";

export const dynamic = "force-dynamic";

export default async function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const verification_token = (await searchParams).verification_token;
  return <VerifyEmailPageComponent verification_token={verification_token} />;
}
