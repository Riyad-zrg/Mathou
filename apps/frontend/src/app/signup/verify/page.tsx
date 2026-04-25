'use client'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/src/components/ui/breadcrumb";
import { Card, CardContent} from "@/src/components/ui/card";

export default function verifyEmailPage(){
    const queryString = window.location.search;
    
    const params = new URLSearchParams(queryString);

    const userEmail = params.get("email");

    return(
        <div className="flex flex-col w-full p-8 main">
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

            <Card>
                <CardContent>
                    <p>Un lien d'activation de compte à été envoyé à l'adresse e-mail <span className="font-medium">{userEmail}</span></p>
                </CardContent>
            </Card>
        </div>
    )
}