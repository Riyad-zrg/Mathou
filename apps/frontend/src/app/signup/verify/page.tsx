'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

export default function verifyEmailPage(){
    const searchParams = useSearchParams();

    const verification_token = searchParams.get("verification_token");

    useEffect(()=>{
        
    })

    return(
        <p>Login...</p>
    )
}