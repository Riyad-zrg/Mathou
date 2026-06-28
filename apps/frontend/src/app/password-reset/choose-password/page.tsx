"use client";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/src/components/ui/breadcrumb";
import { Button } from "@/src/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { resetChoosePassword } from "@/src/services/password-reset.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";

const MIN_LENGTH = 10;

const FIELD_VALIDATION = {
  TEST: {
    SPECIAL_CHAR: (value: string) =>
      /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value),
    LOWERCASE: (value: string) => /[a-z]/.test(value),
    UPPERCASE: (value: string) => /[A-Z]/.test(value),
    NUMBER: (value: string) => /.*[0-9].*/.test(value),
  },
  MSG: {
    MIN_LEN: `Le mot de passe doit faire minimum ${MIN_LENGTH} caractères.`,
    SPECIAL_CHAR:
      "Le mot de passe doit contenir au minimum un caractère spécial.",
    LOWERCASE: "Le mot de passe doit contenir au moins une minuscule.",
    UPPERCASE: "Le mot de passe doit contenir au moins une majuscule.",
    NUMBER: "Le mot de passe doit contenir au moins un nombre",
    MATCH: "Les mots de passe doivent correspondre.",
  },
};

const patterns = z
  .string()
  .min(MIN_LENGTH, {
    message: FIELD_VALIDATION.MSG.MIN_LEN,
  })
  .refine(FIELD_VALIDATION.TEST.SPECIAL_CHAR, FIELD_VALIDATION.MSG.SPECIAL_CHAR)
  .refine(FIELD_VALIDATION.TEST.LOWERCASE, FIELD_VALIDATION.MSG.LOWERCASE)
  .refine(FIELD_VALIDATION.TEST.UPPERCASE, FIELD_VALIDATION.MSG.UPPERCASE)
  .refine(FIELD_VALIDATION.TEST.NUMBER, FIELD_VALIDATION.MSG.NUMBER);

const formSchema = z
  .object({
    password: patterns,
    confirmPassword: patterns,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      addFieldIssue("password", ctx);
      addFieldIssue("confirmPassword", ctx);
    }
  });

const addFieldIssue = (field: string, ctx: z.RefinementCtx) => {
  ctx.addIssue({
    code: "custom",
    message: FIELD_VALIDATION.MSG.MATCH,
    path: [field],
    fatal: true,
  });
};

export default async function ChoosePasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [error, setError] = useState(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const resetToken = (await searchParams).resetToken;
  const resetId = (await searchParams).resetId;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setError(await resetChoosePassword(resetToken, resetId, data));
  }

  return (
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
            <BreadcrumbPage>Choisir un mot de passe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {error && (
        <div className="pt-5 pb-5 errorMessage">
          <Alert variant="destructive" className="w-full">
            <AlertCircleIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <section className="text-center text-2xl font-semibold">
        Choisir un mot de passe
      </section>

      <form id="choose-password-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="pb-5">
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Mot de passe</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  required
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">
                  Confirmation du mot de passe
                </FieldLabel>
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder=""
                  required
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button type="submit" form="choose-password-form">
        Suivant
      </Button>
    </div>
  );
}
