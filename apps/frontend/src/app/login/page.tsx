'use client'
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel} from "@/src/components/ui/field"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { fetchAccessToken } from "@/src/services/auth.service"

const formSchema = z.object({
    email: z.email('Le format de l\'adresse e-mail est invalide.'),
    password: z.string().min(10, {message:"Le mot de passe doit faire une taille de minimum 10 caractères."})
})

export default function LoginForm(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>){
        fetchAccessToken(data);
    }

    return(
        <div className="flex flex-col w-full p-8 main">
            <section className="text-center text-2xl font-semibold">
                SOCATOA
            </section>

            <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
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
                        name="password"
                        control={form.control}
                        render={({field, fieldState})=>(
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                                <Input
                                    {...field}
                                    id="password"
                                    type="password"
                                    placeholder="••••••••••"
                                    aria-invalid={fieldState.invalid}
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
            
            <section className="text-blue-500 text-center p-2 text-sm">
                <a href="example.com">Mot de passe oublié ?</a>
            </section>

            <Button type="submit" form="login-form">
                Se connecter
            </Button>

            <section className="text-blue-500 text-center pt-5 text-sm">
                <a href="/signup">Créer un compte</a>
            </section>
        </div>
    )
}