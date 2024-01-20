import React, {useEffect, useState} from 'react';
import { 
  GoogleAuthProvider,
  signInWithRedirect,
  createUserWithEmailAndPassword,
  updateProfile } from 
  "firebase/auth";
  //import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../config/firebase";
import companyLogo from '../img/chatapp-logo.webp';
import GoogleLogo from '../img/google-icon-logo.svg';
//import AddAvatar from '../img/addAvatar.png';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
//import NavBar from './NavBar'
// import {IconSend } from '@tabler/icons-react'

interface FormData {
  username: string;
  email: string;
  password: string;
  avatar?: FileList;
 } 

const SignUp: React.FC<{}> = () => {
  const [successMsg, setSuccessMsg] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();
  
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

  useEffect(() => {
    if(selectedFile){
      console.log(selectedFile);
    }
  }, [selectedFile]);

  const onSubmit = async (data:FormData) => {
    try{
      const userCredential = await createUserWithEmailAndPassword( auth, data.email, data.password);
      const user = userCredential.user;
      if(user){
        await updateProfile(user, {
          displayName: data.username,
        })
        console.log(data);
        //if(data.avatar){
          // if(data.avatar && data.avatar[0]){
          //   console.log(selectedFile);
          //   const file = data.avatar[0];
        //   if (data.avatar && data.avatar.length > 0) {
        //     const file = data.avatar.item(0); // Get the file from the FileList
        //     if (file !== null){
        //     const storage = getStorage();
        //     const storageRef = ref(storage, `avatar/${user.uid}`);
        //     const uploadTask = uploadBytesResumable(storageRef, file);

        //   uploadTask.on('state_changed', (snapshot) =>{
        //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //       console.log('Upload is ' + progress + '% done');
        //       switch (snapshot.state) {
        //         case 'paused':
        //           console.log('Upload is paused');
        //           break;
        //         case 'running':
        //           console.log('Upload is running');
        //           break;
        //             }
        //           },
        //           (error) => {
        //               // Handle unsuccessful uploads
        //               console.log('Upload unsuccessful');
        //           },
        //           () => {
        //               // Handle successful uploads on complete
        //               // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        //               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //                 updateProfile(user, {
        //                   photoURL: downloadURL,
        //                 });
        //               });
        //           }
        //     );
        //   }
        // };
      }
        setSuccessMsg("User registration is successful.");
        reset();
        navigate('/');
        }catch(error){
        console.error(error);
        alert(error);
        setSuccessMsg('Failed to create new account');
        }
      }
      


  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     console.log(event.target.files[0]);
  //       setSelectedFile(event.target.files[0]);
  //       console.log(selectedFile);
  //   } else {
  //       setSelectedFile(null);
  //   }
  // }

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
        <div className='bg-[#013397] sm:w-3/5 md:w-2/5  flex flex-col justify-center items-center p-4'>
          <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
          {successMsg && <p className="success-msg">{successMsg}</p>}
          <div className=" flex flex-col mb-2 rounded">
            <h1 className='font-extrabold mb-10 text-white'>Sign Up</h1>
            <button 
              onClick={googleSignIn} 
              type='button'
              className='p-2 mb-2 flex gap-2 justify-center text-[#E9ECF6] group-hover:cursor-pointer bg-[#037CD9] rounded-lg text-center'
              >
             <img className=' h-7 w-auto ' src={GoogleLogo} alt="google-logo"/>
              Use Google Account
            </button>
            <div className='flex items-center'>
              <div className='mb-4 w-1/2 h-[0.2px] bg-[#E9ECF6] relative top-2'></div>
              <span className='text-[#E9ECF6] pr-2 pl-2'>or</span>
              <div className='mb-4 w-1/2 h-[0.2px] bg-[#E9ECF6] relative top-2'></div>
            </div>
            <label className='text-[#eceef1] mb-1 pr-4'>Username</label>
            <input
              className='p-1'
              type="text"
              placeholder='myemail@example.com'
              {...register("username", {
                required: "Username is required."
              })}
            />
            {errors.username && (
              <p className="font-light text-sm mt-[2px]  text-[#f21e08]">{errors.username.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-2 rounded">
            <label className='text-[#eceef1] mb-1 pr-4'>Email</label>
            <input
              className='p-1'
              type="text"
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
          {/* <label htmlFor='avatar' className='flex items-center gap-2 cursor-pointer text-xs'>
            <input id='avatar' style={{display: 'none'}} type='file' accept="image/png, image/jpeg" {...register("avatar")} onChange={handleFileChange}/>
            <img src={AddAvatar} alt='' className='w-8' />
            <span className='text-base text-[#E9FCF6]'>{(selectedFile instanceof File ? selectedFile.name : selectedFile) || "Add an avatar"}</span>
          </label> */}
          <div className="flex flex-col mt-4 pt-1 pb-1 bg-[#FC5C6C] w-full rounded ">
            <label></label>
            <button type="submit">Sign Up</button>
          </div>
          {/* <div className='text-slate-400 font-medium text-center p-3'>Forgot password?</div> */}
          <button type='button' aria-label='Company Logo' tabIndex={0} style={{border: 'none',  background: 'none', outline: 'none'}} className='text-slate-400 font-medium text-center p-3'>
          Forgot password?
          </button>
        </form>
        <div className='ml-6 text-[#E9ECFC]'>
          <p>Already have an account?  
            <a href='/' className='pl-2 font-semibold'>Sign In</a>
            </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default SignUp;
