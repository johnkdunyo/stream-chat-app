import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import SigninImage from '../assets/signup.jpg';

// create a cookie session
const cookies = new Cookies();

const Auth = () => {

    const initialState = {
        fullName: "",
        userName: "",
        password: "",
        confirmPassword: "",
        avatarURL: "",
        phoneNumber: ""

    };

    const [ isSignUP, setIsSignUp] = useState(true);
    const [form, setForm] = useState(initialState)

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // hnadle logic for login and register

        const  { userName, fullName, password, phoneNumber, avatarURL} = form;

        const URL = 'http://localhost:3001/auth'

        const { data: {token, userID, hashPassword} } =  await axios.post(`${URL}/${isSignUP ? 'signup' : 'login'}`, 
                        {
                            userName, fullName, password, phoneNumber, avatarURL
                        }
        );

        // setting sign in values to a the cookie..like storing it in th3 cookie
        cookies.set('token', token)
        cookies.set('userID', userID)
        cookies.set('userName', userName)
        cookies.set('fullName', fullName)

        if(isSignUP){
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashPassword', hashPassword)
        }
        window.location.reload();
        // reload anytime you set cookies so it rewload the whole applications



    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name] : e.target.value})
        // console.log(form)
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
    }


  return (
    <React.Fragment>
        <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
            <div className='auth__form-container_fields-content'>
                <p>{isSignUP ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={onSubmitHandler}>
                    {isSignUP &&  (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'> Full Name </label>
                            <input 
                                type='text'
                                name="fullName"
                                placeholde="Full name"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                        <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='userName'> User Name </label>
                        <input 
                            type='text'
                            name="userName"
                            placeholde="user name"
                            onChange={handleChange}
                            required
                        />
                        </div>

                    {isSignUP &&  (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='phoneNumber'> Phone Number </label>
                            <input 
                                type='text'
                                name="phoneNumber"
                                placeholde="Phone Number"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    {isSignUP &&  (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarURL'> Avatar URL </label>
                            <input 
                                type='text'
                                name="avatarURL"
                                placeholde="Avatar URL"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'> Password </label>
                            <input 
                                type='password'
                                name="password"
                                placeholde="Password"
                                onChange={handleChange}
                                required
                            />
                        </div>

                    {isSignUP &&  (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'> Password </label>
                            <input 
                                type='password'
                                name="confirmPassword"
                                placeholde="Confim Password"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className='auth__form-container_fields-content_button'>
                        <button>{isSignUP ? "Sign UP" : "Sign In"}</button>
                    </div>

                </form>
                <div className='auth__form-container-fields_account'>
                    <p>
                        {isSignUP ? "Already have an account? " :  "Dont have an account? " }
                        <span onClick={switchMode}>
                            {isSignUP ? "Sign in" : "Sign Up"}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        {/* image here */}
        <div className='auth__form-container_image'>
            <img src={SigninImage} alt="sign in" />
        </div>
    </div>
    </React.Fragment>
  )
}

export default Auth