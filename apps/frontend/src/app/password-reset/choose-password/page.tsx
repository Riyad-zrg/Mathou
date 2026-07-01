import ChoosePasswordComponent from "./choosePasswordComponent";

export default async function ChoosePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resetId = (await searchParams).resetId;
  const resetToken = (await searchParams).resetToken;

  return (
    <ChoosePasswordComponent
      resetId={resetId}
      resetToken={resetToken}
    ></ChoosePasswordComponent>
  );
}
