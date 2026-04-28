import { redirect } from "next/navigation";

export async function passwordResetCheckEmail(data: any){
    let isError = false;
    try{
        const response = await fetch(`http://localhost:4000/password-reset/verify-email`,{
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
                redirect(`http://localhost:3000/password-reset/check-email?email=${data.email}`)
            }
    }
}

export async function verifyPasswordResetToken(token:string|null){
    let isError = false;
    try{
        const response = await fetch(`http://localhost:4000/password-reset/verify-password-token`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token})
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
                redirect(`http://localhost:3000/password-reset/check-email?email=${data.email}`)
            }
    }
}