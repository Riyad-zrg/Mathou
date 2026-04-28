import { redirect } from "next/navigation";

export async function fetchAccessToken(data:any){
    try{
        const response = await fetch(`http://localhost:4000/auth/login`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:data.email, password: data.password})
        })

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    
    }catch(error: any){
        console.error(error.message);
    } finally {
        redirect('/');
    }
}

export async function signUp(data: any){
    let isError = false;
    try{
        const response = await fetch(`http://localhost:4000/auth/signup`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:data.email, firstname: data.firstname, lastname: data.lastname})
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

export async function verifyEmail(token:string|null, email:string){
    let isError=false;
    try{
        const response = await fetch(`http://localhost:4000/auth/verify-email`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token: token})
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
                redirect(`/signup/choose-password?email=${email}`);
            }
    }
}

export async function choosePassword(email:string|null, data:any){
    let isError=false;
    try{
        const response = await fetch(`http://localhost:4000/auth/choose-password`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:email, password: data.password, confirmPassword: data.confirmPassword})
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
                redirect(`/login`);
            }
    }
}