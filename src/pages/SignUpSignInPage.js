import React, { useState } from 'react'
import Header from '../components/header/Header'
import SignUp from '../components/signUpSignIn/SignUp';
import SignIn from '../components/signUpSignIn/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/loader/Loader';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Profile from './Profile';

function SignUpSignInPage() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [flag, setFlag] = useState(true);

    if(loading) return <Loader />
    if(user && !error) {
        setTimeout(() => {
            navigate('/profile')
        }, 1)
        return <Profile/>
    }

    return (
        <div className='signup-signin'>
            <Header />

            <div className='form-container'>
                {flag ? <SignUp /> : <SignIn />}

                {flag ? (
                    <p onClick={() => setFlag(!flag)}>Already Have An Account? Click Here To Sign In.</p>
                ) : (
                    <p onClick={() => setFlag(!flag)}>Don't Have An Account? Click Here To Sign Up.</p>
                )}
            </div>
        </div>
    )
}

export default SignUpSignInPage