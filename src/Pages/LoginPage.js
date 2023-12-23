import React, {useState} from 'react'
import { signIn } from '../api/auth'
import { useMutation } from 'react-query'
import  {toast}  from 'react-toastify'
import { redirect, useNavigate } from 'react-router-dom'
import { GiArchiveRegister } from "react-icons/gi";
import { HiOutlineLogin } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { IoCreateOutline } from "react-icons/io5";
const LoginPage = () => {
  const [inputValue, setInputValue] =useState({}) 
const navigate = useNavigate()
  const mutationAccount = useMutation({
      mutationFn: (user) => signIn(user),
      onSuccess(response){
        const {accessToken} = response.data
        
        localStorage.setItem('accessToken', accessToken)
      toast.success("đăng nhập thành công")

      window.location.href = '/'

      },
      onError(){
          toast.error("Đăng nhập thất bại, kiểm tra lại thông tin ")
      }
  })

  const onChange = (e) =>{
      const {name, value} = e.target;
      setInputValue({
          ...inputValue,
          [name]:value
      })
  }
  

  const Login = (e) =>{
      e.preventDefault()
      mutationAccount.mutate(inputValue)
  }

  return (
    <div className='benner min-h-screen flex items-center justify-center'>
    <div className=''>
    <form onSubmit={Login}>
    
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
                
            
                

                 
                  <div className='text-center mt-12 flex items-center justify-between'>
                  <Link to={'/'} className='text-white'>
                  <HiOutlineLogin className='text-white text-2xl' />
                   </Link>
                  <button className=' text-white font-mono  w-[93px] h-7 text-[15px] tracking-wider text-base font-bold border bg-gradient-to-r from-[#313131] to-[#000] rounded-lg  text-center '>Login</button>
                  <div>
                  <Link to={'/register'} className='text-white'>
                  <IoCreateOutline   className='text-white text-2xl' />
                   </Link>
                  </div>
                  </div>
                 
              
          
    </form>
    
            
          
    </div>
 
</div>
    

    // <div>
    //     <form className='login' onSubmit={Login}>
    //     <h1>Login</h1>
    //     <input type="email" placeholder='Email' onChange={onChange} name='email'/>

    //     <input type='password' placeholder='Password' onChange={onChange} name='password' />

    //     <button>Login</button>
    // </form>
    // </div>
  )
}

export default LoginPage