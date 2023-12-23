import React, { useState } from 'react'
import {useMutation} from 'react-query'
import { signUp } from '../api/auth'
import { toast } from 'react-toastify'
import { IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoMdLogIn } from "react-icons/io";


const Register = () => {
    const [inputValue, setInputValue] =  useState('')

    const CreateUser = useMutation({
      mutationFn: async (user) => await signUp(user),
      onSuccess() {
        
        toast.success("Đăng ký thành công")

    },
    onError(){
        toast.error("Đăng ký thất bại, kiểm tra lại thông tin ")
    }

    })

    const onChange = (e) =>{
     const { name, value} = e.target
     setInputValue({
      ...inputValue,
      [name]: value
     })
    }
    console.log("input :", inputValue);

  const register = async (e) => {
    e.preventDefault();
    CreateUser.mutate(inputValue)
    console.log('jaa');
  }

  return (
    <div className='benner min-h-screen flex items-center justify-center'>
      <div className=''>
      <form onSubmit={register}>

          <div className=' bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7' >
                    <div className='bg-gradient-to-r from-[#313131] to-[#000] mr-6'>
                    <div className=' text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center'>UserName</div>

                    </div>
                    <input className='border-none outline-none' type='text'  placeholder='Enter Username' onChange={onChange} name='userName'/>

                  </div>
                  <div className=' bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7' >
                    <div className='bg-gradient-to-r from-[#313131] to-[#000] mr-6'>
                    <div className=' text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center'>Email</div>

                    </div>
                    <input className='border-none outline-none' type='email'  placeholder='Enter your email' onChange={onChange} name='email'/>

                  </div>
                  <div className=' bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7' >
                    <div className='bg-gradient-to-r from-[#313131] to-[#000] mr-6'>
                    <div className=' text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center'>Password</div>

                    </div>
                    <input className='border-none outline-none' type='password' onChange={onChange} name='password'  placeholder='Enter your password'/>

                  </div>
                  <div className=' bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7' >
                    <div className='bg-gradient-to-r from-[#313131] to-[#000] mr-6'>
                    <div className=' text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center'>Confirm</div>

                    </div>
                    <input className='border-none outline-none' type='password' onChange={onChange} name='confirmPassword'  placeholder='ConfirmPassword'/>

                  </div>
                  
                  <div className=' flex items-center justify-between h-10 ' >
                  <Link to={'/'} className='text-white'>
                  <IoHomeOutline className='text-white text-2xl mb-2 cursor-pointer ' />
                  </Link>

                 

                  <button className=' text-white font-mono  w-[93px] h-7 text-[15px] tracking-wider text-base font-bold border bg-gradient-to-r from-[#313131] to-[#000] rounded-lg '>Register</button>
                  <Link to={'/login'} className='text-white'>
                  <IoMdLogIn className='text-white text-2xl' />
                   </Link>
                  </div >
      </form>
      
              
            {/* <form className=' ' onSubmit={register} >
            <h1>Register</h1>
            <input type='text' placeholder='Username' onChange={onChange} name='userName' />
            <input type="email" placeholder='Email' onChange={onChange} name='email'/>

            <input type='password' placeholder='Password' onChange={onChange} name='password' />
            <input type="password" placeholder='ConfirmPassword' onChange={onChange} name='confirmPassword'/>

            <button>Register</button>
            </form> */}
      </div>
   
</div>
  )
}

export default Register