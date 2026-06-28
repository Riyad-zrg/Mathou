"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";

export default async function verifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userEmail = (await searchParams).userEmail;

  return (
    <div className="flex flex-col text-center w-full p-8 gap-8 main">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/login">Connexion</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/signup">Créer un compte</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Vérification courriel</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col w-full place-items-center gap-8">
        <Card className="flex flex-col w-8/10 h-50 justify-center text-base">
          <CardContent>
            <p>
              Un courriel pour activer votre compte à été envoyé à l'adresse
              e-mail <span className="font-medium">{userEmail}</span>
            </p>
          </CardContent>
        </Card>

        <a href="/" className="w-4/10">
          <Button className="w-full">Retourner à l'accueil</Button>
        </a>
      </div>
    </div>
  );
}
