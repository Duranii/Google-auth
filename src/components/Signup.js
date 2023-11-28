"use client"
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { auth, googleAuthProvider } from "./config";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Signup() {
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const router = useRouter();

    const [error, setError] = useState(null);

    const handleSignup = () => {
        const userEmail = email.current.value;
        const userPassword = password.current.value;

        createUserWithEmailAndPassword(auth, userEmail, userPassword)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log('User signed up:', user);
                localStorage.setItem("email", user.email);
                router.push('/signin'); // Redirect to signin page
            })
            .catch((error) => {
                setError(error.message); 
            });
    };

    const handleGoogleSignup = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log('User signed in with Google:', user);
                localStorage.setItem("email", user.email);
                router.push('/signin'); // Redirect to signin page
            })
            .catch((error) => {
                setError(error.message); 
            });
    };

    return (
        <div className='h-screen overflow-y-hidden'>
            {error && <p>Error: {error}</p>}
            <div className='flex flex-col justify-center items-center mt-40'>
                <button className='p-3 border-gray-400 border-[1px]' onClick={handleGoogleSignup}>
                    Sign up with Google
                </button><br /><br />

                <div>
                    <label>Name: </label>
                    <input className='border-[1px] pl-3' placeholder='Name' type='text' ref={name} />
                </div><br />
                <div>
                    <label>Email: </label>
                    <input className='border-[1px] pl-3' placeholder='Email' type='email' ref={email} />
                </div><br />
                <div>
                    <label>Password: </label>
                    <input className='border-[1px] pl-3' placeholder='Password' type='password' ref={password} />
                </div><br />

                <button className='border-[1px] bg-black text-white px-6 py-2' onClick={handleSignup}>
                    Sign up
                </button>

                <p>Already have an account? <Link href="/signin"> <strong className='cursor-pointer'>Log In</strong></Link></p>
            </div>
        </div>
    );
}

export default Signup;
