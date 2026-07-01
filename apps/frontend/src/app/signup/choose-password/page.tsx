import ChoosePasswordPageComponent from "./choosePasswordPageComponent";

export default async function SignUpChoosePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userEmail = (await searchParams).email;
  return (
    <ChoosePasswordPageComponent
      userEmail={userEmail}
    ></ChoosePasswordPageComponent>
  );
}
