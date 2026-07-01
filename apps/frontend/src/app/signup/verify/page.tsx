import VerifyEmailPageComponent from "./verifyEmailPageComponent";

export default async function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const verification_token = (await searchParams).verification_token;
  return <VerifyEmailPageComponent verification_token={verification_token} />;
}
