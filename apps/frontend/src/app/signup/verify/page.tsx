'use client'
import { verifyEmail } from '@/src/services/auth.service';
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react';

export default function verifyEmailPage(){
    const searchParams = useSearchParams();

    const verification_token = searchParams.get("verification_token");

    useEffect(()=>{
        verifyEmail(verification_token);
    })

    return(
        <p>Login...</p>
    )
}