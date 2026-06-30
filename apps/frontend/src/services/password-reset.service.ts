import { redirect } from "next/navigation";
import { toast } from "sonner";

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || "${serverUrl}";

export async function passwordResetCheckEmail(data: any) {
  let isError = false;
  try {
    const response = await fetch(`${serverUrl}/password-reset/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }
  } catch (error: any) {
    isError = true;
    return error.message;
  } finally {
    if (!isError) {
      redirect(`${serverUrl}/password-reset/check-email?email=${data.email}`);
    }
  }
}

export async function resetChoosePassword(
  token: string | string[] | undefined,
  resetId: string | string[] | undefined,
  data: any,
) {
  let isError = false;
  try {
    const response = await fetch(
      `${serverUrl}/password-reset/update/password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          resetId: resetId,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      },
    );
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message);
    }
  } catch (error: any) {
    isError = true;
    return error.message;
  } finally {
    if (!isError) {
      toast.success("Votre mot de passe à bien été modifié.", {
        closeButton: true,
        position: "top-center",
      });
      redirect(`/login`);
    }
  }
}
