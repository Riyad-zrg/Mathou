"use client";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardFooter } from "@/src/components/ui/card";
import { getJWTpayload } from "@/src/lib/utils";
import { verifyEmail } from "@/src/services/auth.service";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [error, setError] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const verification_token = (await searchParams).verification_token;
      console.log(verification_token);
      if (verification_token) {
        const jwtPayload = await getJWTpayload(verification_token);
        const result = await verifyEmail(verification_token, jwtPayload.email);
        setError(result);
      } else {
        throw Error("Token invalide");
      }
    };
    verify();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col w-full h-100 place-items-center p-8 gap-8">
        <Card className="flex flex-col w-8/10 h-55 justify-center align-middle text-base">
          <CardContent>
            <Alert variant="destructive" className="w-full">
              <AlertCircleIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <a href="/" className="w-full">
              <Button className="w-full">Retourner à l'accueil</Button>
            </a>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return <p>Login...</p>;
}
