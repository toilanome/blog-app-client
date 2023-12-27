import React, {useState} from 'react'
import { signIn } from '../api/auth'
import { useMutation } from 'react-query'
import  {toast}  from 'react-toastify'
import { redirect, useNavigate } from 'react-router-dom'
import { GiArchiveRegister } from "react-icons/gi";
import { HiOutlineLogin } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { IoCreateOutline } from "react-icons/io5";
import { useFormik } from 'formik'
const LoginPage = () => {
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

  
  const formikValidate = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors = {};

      
      if (!values.email) {
        errors.email = "Required email";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Chưa nhập địa chỉ email";
      }
      if (!values.password) {
        errors.password = "Bắt buộc phải nhập password";
      } else if (values.password.length < 8) {
        errors.password = "Password phải lớn hơn 8 ký tự";
      }
      

      return errors;
    },
    onSubmit: (values) => mutationAccount.mutate(values),
  });

  return (
    <div className="benner min-h-screen flex items-center justify-center">
    <div className="">
      <form onSubmit={formikValidate.handleSubmit}>
      
       
        {formikValidate.touched.email && formikValidate.errors.email && (
          <div className="text-red-500">{formikValidate.errors.email}</div>
        )}
        <div className=" bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7">
          <div className="bg-gradient-to-r from-[#313131] to-[#000] mr-6">
            <div className=" text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center">
              Email
            </div>
          </div>

          <input
            className="border-none outline-none"
            type="email"
            placeholder="Enter Your Email"
            onChange={formikValidate.handleChange}
            onBlur={formikValidate.handleBlur}
            defaultValue={formikValidate.values.email}
            name="email"
          />
        </div>
        
        {formikValidate.touched.password &&
          formikValidate.errors.password && (
            <div className="text-red-500">
              {formikValidate.errors.password}
            </div>
          )}
        <div className=" bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7">
          <div className="bg-gradient-to-r from-[#313131] to-[#000] mr-6">
            <div className=" text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center">
              Password
            </div>
          </div>
          <input
            className="border-none outline-none"
            type="password"
            placeholder="Enter Your password"
            onChange={formikValidate.handleChange}
            onBlur={formikValidate.handleBlur}
            defaultValue={formikValidate.values.password}
            name="password"
          />
        </div>
        
       
        

        <div className='text-center mt-12 flex items-center justify-between'>
                  <Link to={'/'} className='text-white'>
                  <HiOutlineLogin className='text-white text-2xl' />
                   </Link>
                  <button className=' text-white font-mono  w-[93px] h-7 text-[15px] tracking-wider text-base font-bold border bg-gradient-to-r from-[#313131] to-[#000] rounded-lg  text-center ' type='submit'>Login</button>
                  <div>
                  <Link to={'/register'} className='text-white'>
                  <IoCreateOutline   className='text-white text-2xl' />
                   </Link>
                  </div>
                  </div>
      </form>
    </div>
  </div>
    

    
  )
}

export default LoginPage