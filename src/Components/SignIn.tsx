import React, {useState} from 'react';
import { AuthError, signInWithRedirect } from "firebase/auth";
import { 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  updateProfile } from 
  "firebase/auth";
import { auth } from "../config/firebase";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import companyLogo from '../img/chatapp-logo.webp';
import GoogleLogo from '../img/google-icon-logo.svg';
//import NavBar from './NavBar'
// import {IconSend } from '@tabler/icons-react'

interface FormData {
  username: string;
  email: string;
  password: string;
  avatar?: File;
 } 

const SignIn: React.FC<{}> = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  //const [user] = useAuthState(auth);

  const googleSignIn = () => {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
      // navigate('/chatbox');
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>();

  // const onSubmit = (data:FormData) => {
  //   console.log(data);
  //   setSuccessMsg("User registration is successful.");
  //   reset();
  // };

  const onSubmit = async (data: FormData) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = credential.user;
      if(user){
        await updateProfile(user, {
            displayName: data.username
        })
      }
      setSuccessMsg("Signed in successfully.");
      reset();
      navigate('/chatbox');
    } catch (error) {
      console.error(error);
      let errorMessage = "Failed to sign in.";
      switch ((error as AuthError).code) {
        case 'auth/wrong-password':
          errorMessage = "Invalid password.";
          break;
        case 'auth/user-not-found':
          errorMessage = "No user found with this email.";
          break;
        // Add more cases as needed
        default:
          break;
      }
      setSuccessMsg(errorMessage);
    }
   };

  return (
    <>
     <button type='button' aria-label='Company Logo' tabIndex={0} className='m-3 fixed h-7 w-auto' onClick={() => navigate('/signin')}>
        <img src={companyLogo} alt="logo" className='m-3 fixed h-7 w-auto'/>
      </button>
      <div className='flex flex-col h-screen w-full sm:flex-row'> 
        <div className='bg-login bg-no-repeat bg-bottom bg-auto min-h-screen w-full flex flex-col p-4'>
          <h1 className='text-center text-black text-xl mt-20 sm:text-2xl font-bold mb-4'>Go beyond the text. Connect on a deeper level.</h1>              
          <span className='text-slate-500 font-medium text-center'>Life's too short for shallow connections. Build genuine bonds with people who matter.</span>
        </div>
        <div className='bg-[#013397] sm:w-3/5 md:w-2/5 flex flex-col justify-center items-center p-4'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          <div className=" flex flex-col mb-2 rounded">
            <h1 className='font-extrabold mb-10 text-white'>Sign In</h1>
            <button 
              onClick={googleSignIn} 
              type='button'
              className='p-2 mb-2 flex gap-2 justify-center text-[#E9ECF6] group-hover:cursor-pointer bg-[#037CD9] rounded-lg text-center'
              >
             <img className=' h-7 w-auto ' src={GoogleLogo} alt="google-logo"/>
              Use Google Account
            </button>
            </div> 
          <div className="flex flex-col mb-2 rounded">
            <label className='text-[#eceef1] mb-1 pr-4'>Email</label>
            <input
              className='p-1'
              type="text"
              placeholder='myemail@example.com'
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid."
                }
              })}
            />
            {errors.email && <p className="font-light text-sm mt-[2px]  text-[#f21e08]">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col mb-2 rounded">
            <label className='text-[#eceef1] mb-1 pr-4'>Password</label>
            <input
              className='p-1'
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value
                    )
                }
              })}
            />
            {errors.password?.type === "required" && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">Password is required.</p>
            )}
            {errors.password?.type === "checkLength" && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">
                Password should be at-least 6 characters.
              </p>
            )}
            {errors.password?.type === "matchPattern" && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol.
              </p>
            )}
          </div>
          <div className="flex flex-col mt-4 pt-1 pb-1 bg-[#FC5C6C] w-full rounded ">
            <label></label>
            <button type="submit">Sign In</button>
          </div>
          {/* <div className='text-slate-400 font-medium text-center p-3'>Forgot password?</div> */}
          <button type='button' aria-label='Company Logo' tabIndex={0} style={{border: 'none',  background: 'none', outline: 'none'}} className='text-slate-400 font-medium text-center p-3'>
          Forgot password?
          </button>
          </form>
    {/* <button type='button' aria-label='Company Logo' tabIndex={0} style={{border: 'none',  background: 'none', outline: 'none'}} onClick={() => navigate('/signin')}>
      <img className='m-3 fixed h-7 w-auto' src={companyLogo} alt="logo"/>
    </button> */}
    {/* <a href='<SignUp.tsx/>'>
      <img className='m-3 fixed h-7 w-auto' src={companyLogo} alt="logo"/>
    </a> */}
    {/* // <div className='flex h-screen w-screen'>  */}
    {/* <div className='flex flex-col sm:flex-row sm:h-full h-screen w-full overflow-hidden'>
      <div className='bg-login bg-no-repeat bg-bottom bg-auto w-3/5 sm:w-full flex flex-col align-middle'>
        <h1 className='text-center text-black mt-20 font-bold text-2xl'> Go beyond the text. Connect on a deeper level.</h1>              
        <span className='text-slate-500 font-medium text-justify ml-4 mr-4 pr-8 pl-8'> Life's too short for shallow connections. Build genuine bonds with people who matter.</span>
      </div> */}
      {/* <div className='bg-[#013397] w-2/5'> */}
          {/* <h1 className='font-extrabold ml-10 text-white'>Sign Up</h1> */}
          {/* <form onSubmit={handleSubmit(onSubmit)} className='m-[60px] mb-6'> */}
          {/* {successMsg && <p className="success-msg">{successMsg}</p>}
          <div className=" flex flex-col mb-2 rounded">
            <h1 className='font-extrabold mb-10 text-white'>Sign In</h1>
            <button 
              onClick={googleSignIn} 
              type='button'
              className='p-2 mb-2 flex gap-2 justify-center text-[#E9ECF6] group-hover:cursor-pointer bg-[#037CD9] rounded-lg text-center'
              >
             <img className=' h-7 w-auto ' src={GoogleLogo} alt="google-logo"/>
              Use Google Account
            </button> */}
            {/* <div className='flex items-center'>
              <div className='mb-4 w-1/2 h-[0.2px] bg-[#E9ECF6] relative top-2'></div>
              <span className='text-[#E9ECF6] pr-2 pl-2'>or</span>
              <div className='mb-4 w-1/2 h-[0.2px] bg-[#E9ECF6] relative top-2'></div>
            </div>
            <label className='text-[#eceef1] mb-1 pr-4'>Username</label>
            <input
              className='p-1'
              type="text"
              {...register("username", {
                required: "Username is required."
              })}
            />
            {errors.username && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">{errors.username.message}</p>
            )}*/}
          {/* </div> 
          <div className="flex flex-col mb-2 rounded">
            <label className='text-[#eceef1] mb-1 pr-4'>Email</label>
            <input
              className='p-1'
              type="text"
              placeholder='myemail@example.com'
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Email is not valid."
                }
              })}
            />
            {errors.email && <p className="font-light text-sm mt-[2px]  text-[#f21e08]">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col mb-2 rounded">
            <label className='text-[#eceef1] mb-1 pr-4'>Password</label>
            <input
              className='p-1'
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 6,
                  matchPattern: (value) =>
                    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                      value
                    )
                }
              })}
            />
            {errors.password?.type === "required" && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">Password is required.</p>
            )}
            {errors.password?.type === "checkLength" && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">
                Password should be at-least 6 characters.
              </p>
            )}
            {errors.password?.type === "matchPattern" && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol.
              </p>
            )}
          </div>
          <div className="flex flex-col mt-4 pt-1 pb-1 bg-[#FC5C6C] w-full rounded ">
            <label></label>
            <button type="submit">Sign In</button>
          </div>
          {/* <div className='text-slate-400 font-medium text-center p-3'>Forgot password?</div> */}
          {/* <button type='button' aria-label='Company Logo' tabIndex={0} style={{border: 'none',  background: 'none', outline: 'none'}} className='text-slate-400 font-medium text-center p-3'>
          Forgot password?
          </button> 
        </form> */}
        <div className='ml-6 text-[#E9ECFC]'>
          <p>Do not have an account?  
            <a href='/signup' className='pl-2 font-semibold'>Sign Up</a>
            </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default SignIn;



