import CheckEmailComponent from "./checkEmailComponent";

export default async function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let userEmail = (await searchParams).email;
  if (typeof userEmail === "string") {
    userEmail = userEmail.toLowerCase();
  }
  return <CheckEmailComponent userEmail={userEmail}></CheckEmailComponent>;
}
