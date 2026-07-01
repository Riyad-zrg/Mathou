import CheckEmailComponent from "./checkEmailComponent";

export default async function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userEmail = (await searchParams).email;
  return <CheckEmailComponent userEmail={userEmail}></CheckEmailComponent>;
}
