import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';

function Signin() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        const userEmail = emailRef.current.value;
        const userPassword = passwordRef.current.value;
    
        // Check if email and password are empty
        if (!userEmail || !userPassword) {
            setError('Email and password should not be empty.');
            return;
        }
    
        // Check if the email is in a valid format using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
            setError('Please enter a valid email address.');
            return;
        }
    
        // Check if the password meets the minimum character length
        if (userPassword.length < 6) {
            setError('Password should be at least 6 characters long.');
            return;
        }
    
        try {
            const auth = getAuth(); // Get Firebase Auth instance
            const userCredential = await signInWithEmailAndPassword(auth, userEmail, userPassword);

            if (userCredential) {
                router.push('/home');
            }
        } catch (error) {
            console.error('Error signing in:', error);

            switch (error.code) {
                case AuthErrorCodes.INVALID_EMAIL:
                case AuthErrorCodes.USER_NOT_FOUND:
                    setError('Incorrect email. Please check your email.');
                    break;
                case AuthErrorCodes.WRONG_PASSWORD:
                    setError('Incorrect password. Please check your password.');
                    break;
                default:
                    setError('An error occurred while signing in. Please try again.');
                    break;
            }
        }
    };
    
    return (
        <div className='h-screen overflow-y-hidden flex flex-col justify-center items-center pt-16'>
            <p className='text-3xl font-bold pb-3'>Login Page</p>
            {error && <p className='text-red-500'>{error}</p>}
            <div>
                <label>Email: </label>
                <input className='border-[1px] pl-3' placeholder='Email' type='email' ref={emailRef} />
            </div><br />
            <div>
                <label>Password: </label>
                <input className='border-[1px] pl-3' placeholder='Password' type='password' ref={passwordRef} />
            </div><br />

            <button className='border-[1px] bg-black text-white p-2 cursor-pointer' onClick={handleLogin}>
                Login
            </button>

            <p>Not a Member? <Link href="/"><strong className='cursor-pointer'>Signup</strong></Link></p>
        </div>
    );
}

export default Signin;
