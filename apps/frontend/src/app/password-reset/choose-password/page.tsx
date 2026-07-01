import ChoosePasswordComponent from "./choosePasswordComponent";

export default async function ChoosePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resetId = (await searchParams).reset_id;
  const resetToken = (await searchParams).reset_token;

  return (
    <ChoosePasswordComponent
      resetId={resetId}
      resetToken={resetToken}
    ></ChoosePasswordComponent>
  );
}
