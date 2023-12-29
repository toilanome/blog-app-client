import React, { useState } from "react";
import { useMutation } from "react-query";
import { signUp } from "../api/auth";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { useFormik } from "formik";

const Register = () => {
  const [inputValue, setInputValue] = useState("");

  const CreateUser = useMutation({
    mutationFn: async (user) => await signUp(user),
    onSuccess() {
      toast.success("Đăng ký thành công");
    },
    onError() {
      toast.error("Đăng ký thất bại, kiểm tra lại thông tin ");
    },
  });

  const formikValidate = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.userName && values.userName.length <= 6) {
        errors.userName = "Bắt buộc phải nhập userName và phải lớn hơn 6 ký tự ";
      }
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
      if (!values.confirmPassword) {
        errors.confirmPassword = "Bắt buộc phải nhập confirmPassword";
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Password không khớp nhau !!!!!!";
      }

      return errors;
    },
    onSubmit: (values) => CreateUser.mutate(values),
  });

  return (
    <div className="benner min-h-screen flex items-center justify-center">
      <div className="">
        <form onSubmit={formikValidate.handleSubmit}>
        {formikValidate.touched.userName &&
            formikValidate.errors.userName && (
              <span className="text-red-500">
                {formikValidate.errors.userName}
              </span>
            )}
          <div className=" bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7">
     
            <div className="bg-gradient-to-r from-[#313131] to-[#000] mr-6">
              <div className=" text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center">
                UserName
              </div>
            </div>
            
            <input
              className="border-none outline-none"
              type="text"
              placeholder="Enter Username"
              onChange={formikValidate.handleChange}
              onBlur={formikValidate.handleBlur}
              defaultValue={formikValidate.values.userName}
              name="userName"
            />
            
          </div>
         
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
          
          {formikValidate.touched.confirmPassword &&
            formikValidate.errors.confirmPassword && (
              <div className="text-red-500">
                {formikValidate.errors.confirmPassword}
              </div>
            )}
          <div className=" bg-[#FAFAFA] w-[406px] h-12 flex items-center p-2 mb-7">
            <div className="bg-gradient-to-r from-[#313131] to-[#000] mr-6">
              <div className=" text-white font-mono  w-[93px] h-7 text-[12px] font-semibold tracking-wider flex items-center justify-center">
                Confirm
              </div>
            </div>
            <input
              className="border-none outline-none"
              type="password"
              placeholder="Enter Your ConfirmPassword"
              onChange={formikValidate.handleChange}
              onBlur={formikValidate.handleBlur}
              defaultValue={formikValidate.values.confirmPassword}
              name="confirmPassword"
            />
          </div>
          

          <div className=" flex items-center justify-between h-10 ">
            <Link to={"/"} className="text-white">
              <IoHomeOutline className="text-white text-2xl mb-2 cursor-pointer " />
            </Link>

            <button
              className=" text-white font-mono  w-[93px] h-7 text-[15px] tracking-wider text-base font-bold border bg-gradient-to-r from-[#313131] to-[#000] rounded-lg "
              type="submit"
            >
              Register
            </button>
            <Link to={"/login"} className="text-white">
              <IoMdLogIn className="text-white text-2xl" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
