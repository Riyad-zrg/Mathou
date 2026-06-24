import { cookies } from "next/headers";
import { getJWTpayload } from "../lib/utils";

export default async function Home() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const jwt = accessToken?.value;
  const jwtPayload = await getJWTpayload(jwt);
  return (
    <div>
      {/* <p>Bienvenue {jwtPayload.firstname}! Tu es sur la hub page !</p> */}
      <a href="/maths/addition">Additions</a>
      <br />
      <a href="/maths/fraction">Fractions</a>
      <br />
      <a href="/maths/derivation">Dérivations</a>
      <br />
      <a href="/maths/factorization">Factorisations</a>
      <br />
      <a href="/maths/priorities">Priorités opératoires</a>
      <br />
      <a href="/maths/equation">Équations</a>
      <br />
      <a href="/maths/proportionality">Proportionnalité</a>
    </div>
  );
}
