import { redirect } from "next/navigation";

export async function passwordResetCheckEmail(data: any){
    let isError = false;
    try{
        const response = await fetch(`http://localhost:4000/auth/password-reset/verify-email`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:data.email})
        })

        if (!response.ok) {
            const result = await response.json()
            throw new Error(result.message);
        }
        }catch(error: any){
            isError=true;
            return error.message
        } finally {
            if(!isError){
                redirect(`/signup/check-email?email=${data.email}`);
            }
    }
}
