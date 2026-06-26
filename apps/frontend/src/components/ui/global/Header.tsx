import { getJWTpayload } from "@/src/lib/utils";
import { cookies } from "next/headers";
import LogOutButton from "../hubpage/LogOutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token");
  const jwt = accessToken?.value;
  const jwtPayload = await getJWTpayload(jwt);
  return (
    <section className="flex grow-0 bg-purple-500 justify-center p-3 header">
      <span className="w-full absolute pl-5 font-sans text-white pt-1.5">
        <p className="absolute text-start invisible md:visible">
          Bienvenue sur Socatoa{" "}
          {jwtPayload !== null && (
            <span className="font-semibold ">{jwtPayload.firstname} </span>
          )}
          !
        </p>
        {jwtPayload !== null && (
          <span className="font-semibold visible md:invisible">
            {jwtPayload.firstname}{" "}
          </span>
        )}
      </span>
      <p className="text-white text-3xl font-semibold font-sans">SOCATOA</p>
      <span className="absolute flex w-full justify-end pr-3">
        <LogOutButton></LogOutButton>
      </span>
    </section>
  );
}
