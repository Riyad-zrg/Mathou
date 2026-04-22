import { cookies } from 'next/headers'
import { getJWTpayload } from '../lib/utils';
import { getUserById } from '../services/user.service';

export default async function Home() {
   const cookieStore = await cookies()
   const accessToken = cookieStore.get('access_token');
   const jwt = accessToken?.value;
   const jwtPayload = await getJWTpayload(jwt);

   const user = await getUserById(jwtPayload?.sub);

   console.log(user);
  return (
    <p>Bienvenue à toi ton pseudo ! Tu es sur la hub page !</p>
  );
}
