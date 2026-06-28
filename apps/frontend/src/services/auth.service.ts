import { redirect } from "next/navigation";
import { toast } from "sonner";

export async function fetchAccessToken(data: any) {
  let isError = false;
  try {
    const response = await fetch(`http://localhost:4000/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result["message"]);
    }
  } catch (error: any) {
    console.error(error.message);
    isError = true;
    toast.error(error.message, {
      position: "top-center",
      closeButton: true,
    });
  } finally {
    if (!isError) {
      redirect("/");
    }
  }
}

export async function signUp(data: any) {
  let isError = false;
  try {
    const response = await fetch(`http://localhost:4000/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
      }),
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
      redirect(`/signup/check-email?email=${data.email}`);
    }
  }
}

export async function logout() {
  const url = `http://localhost:4000/auth/logout`;
  try {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function verifyEmail(
  token: string | string[] | undefined,
  email: string,
) {
  let isError = false;
  try {
    const response = await fetch(`http://localhost:4000/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
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
      redirect(`/signup/choose-password?email=${email}`);
    }
  }
}

export async function choosePassword(
  email: string | string[] | undefined,
  data: any,
) {
  let isError = false;
  try {
    const response = await fetch(`http://localhost:4000/auth/choose-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
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
      toast.success("Votre compte à bien été créé. Merci de vous connecter.", {
        position: "top-center",
        closeButton: true,
      });
      redirect(`/login`);
    }
  }
}
