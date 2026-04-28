'use client'
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/src/components/ui/breadcrumb"
import { useState } from "react"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { passwordResetCheckEmail } from "@/src/services/password-reset.service"

const formSchema = z.object({
    email: z.email('Le format de l\'adresse e-mail est invalide.'),
})

export default function ResetPasswordSpecifyEmail(){
    const [error, setError]=useState(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "john.doe@gmail.fr",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>){
        setError(await passwordResetCheckEmail(data));
    }

    return(
    <div className="flex flex-col w-full p-8 main">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/login">Connexion</BreadcrumbLink>
                </BreadcrumbItem>
            <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Modifier mon mot de passe</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        {error && 
        <div className="pt-5 pb-5 errorMessage">
            <Alert variant="destructive" className="w-full">
                <AlertCircleIcon />
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>
        </div>
        }

        <section className="text-center text-lg pt-15">
            Renseignez l'adresse e-mail du compte dont vous souhaitez changer le mot de passe
        </section>

        <div className="flex flex-col place-items-center pt-5 gap-5">
            <form className="w-6/10" id="password-reset-email-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="pb-5">
                    <Controller
                        name="email"
                        control={form.control}
                        render={({field, fieldState}) =>(
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">E-mail</FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                aria-invalid={fieldState.invalid}
                                placeholder="prenom.nom@domaine.com"
                                required
                                autoComplete="off"
                            />
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]}/>
                            )}
                        </Field>
                        )}
                    />
                    
                </FieldGroup>
            </form>

            <Button className="w-2/10" type="submit" form="password-reset-email-form">
                Suivant
            </Button>
        </div>

        <section className="text-blue-500 text-center pt-5 text-sm">
            <a href="/login">Revenir au formulaire de connexion</a>
        </section>
    </div>
    )
}