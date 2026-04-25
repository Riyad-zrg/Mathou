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
    try{
        const response = await fetch(`http://localhost:4000/auth/signup`,{
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email:data.email, firstname: data.firstname, lastname: data.lastname})
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