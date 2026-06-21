import { cookies } from "next/headers";
import { getJWTpayload } from "../lib/utils";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const jwt = accessToken?.value;
  const jwtPayload = await getJWTpayload(jwt);
  return (
    <div>
      <p>Bienvenue {jwtPayload.firstname}! Tu es sur la hub page !</p>
      <a href="/maths/addition">Addition</a>
      <br />
      <a href="/maths/fractions">Fractions</a>
    </div>
  );
}
