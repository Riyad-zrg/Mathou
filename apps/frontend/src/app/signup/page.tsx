'use client'
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { signUp } from "@/src/services/auth.service"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/src/components/ui/breadcrumb"
import { useState } from "react"

const formSchema = z.object({
    email: z.email('Le format de l\'adresse e-mail est invalide.'),
    firstname:z.string().max(30,{error: 'Le prénom doit faire une taille maximum de 30 caractères.'}), 
    lastname:z.string().max(30, {error: 'Le prénom doit faire une taille maximum de 30 caractères.'}),
})

export default function LoginForm(){
    const [error, setError]=useState(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "john.doe@gmail.fr",
            firstname: "john",
            lastname: "doe",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>){
        setError(await signUp(data));
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
                    <BreadcrumbPage>Créer un compte</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        {error && <p>{error}</p>}


        <section className="text-center text-2xl font-semibold">
            Créer un compte
        </section>

        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                <Controller
                    name="firstname"
                    control={form.control}
                    render={({field, fieldState}) =>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Prénom</FieldLabel>
                        <Input
                            {...field}
                            id="firstname"
                            aria-invalid={fieldState.invalid}
                            placeholder="John"
                            required
                            autoComplete="off"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]}/>
                        )}
                    </Field>
                    )}
                />
                <Controller
                    name="lastname"
                    control={form.control}
                    render={({field, fieldState}) =>(
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="email">Nom de famille</FieldLabel>
                        <Input
                            {...field}
                            id="lastname"
                            aria-invalid={fieldState.invalid}
                            placeholder="Doe"
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

        <Button type="submit" form="login-form">
            Suivant
        </Button>

        <section className="text-blue-500 text-center pt-5 text-sm">
            <a href="/login">Déja un compte ? Se connecter</a>
        </section>
    </div>
    )
}