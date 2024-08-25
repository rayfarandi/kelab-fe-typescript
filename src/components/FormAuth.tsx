import React, { useState } from "react";
import Button from "./ButtonCustom";
import InputForm from "../components/InputForm";
import FurnitureKel from '../assets/images/cup-coffe-icon.png';
import TextLogo from "../assets/images/text-logo.png";
import { Link } from "react-router-dom";
import facebook from '../assets/images/facebook-logo.png';
import google from '../assets/images/google-logo.png';

interface ButtonAuthProps {
    value:string
}
const ButtonAuth: React.FC<ButtonAuthProps> = ({value}) => {
    return (
        <Link to="#"
        className="w-fit sm:flex-1 flex justify-center items-center gap-4 p-3 sm:p-2 rounded shadow-md hover:shadow-none transition-all duration-500"
      >
        <img src={value === "Facebook" ? facebook : google} className="h-6" alt={`${value} logo`} />
        <p className="text-base-content text-semibold hidden sm:block">{value}</p>
      </Link>  
    )
}

interface FormAuthProps {
    handleAuth: (e: React.FormEvent<HTMLFormElement>) => void
    type: string
}

interface FormField{
    name: string
    label: string
    type: string
    placeholder: string
}

const FormAuth: React.FC<FormAuthProps> = ({ handleAuth, type }) => {
    const [register] = useState<FormField[]>([
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "Enter Your Full Name"
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter Your Email"
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter Your Password"
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Enter Your Password Again"
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter Your Address"
      }
    ]);
  
    const [login] = useState<FormField[]>([
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter Your Email"
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter Your Password"
      }
    ]);
  
    
  
    return (
      <div className="flex flex-col w-11/12">
        <div className="flex items-center gap-4 mb-3">
          <div>
            <img src={FurnitureKel} alt="Cup of Coffee" />
          </div>
          <div>
            <img src={TextLogo} alt="Text Logo" />
          </div>
        </div>
  
        <div className="flex flex-col gap-5">
          <h1 className="text-primary font-semibold text-xl">{type}</h1>
          <p className="text-base-content">
            {type === "Register" || type === "Login"
              ? "Fill out the form correctly"
              : "We will send new password to your email"}
          </p>
  
          <form onSubmit={handleAuth} className="flex flex-col gap-4">
            {type === "Register" ? (
              register.map((item, index) => (
                <InputForm
                  key={index}
                  name={item.name}
                  label={item.label}
                  type={item.type}
                  placeholder={item.placeholder}
                />
              ))
            ) : type === "Login" ? (
              login.map((item, index) => (
                <InputForm
                  key={index}
                  name={item.name}
                  label={item.label}
                  type={item.type}
                  placeholder={item.placeholder}
                />
              ))
            ) : (
              ""
            )}
  
            {type === "Login" ? (
              <Link to="" className="text-primary flex justify-end text-sm">Lupa Password?</Link>
            ) : ''}
  
            <Button
              value={
                type === "Register"
                  ? "Register"
                  : type === "Login"
                    ? "Login"
                    : "Submit"
              }
              py="2"
            />
          </form>
  
          {type === "Register" || type === "Login" ? (
            <>
              <div className="flex justify-center">
                <p className="text-base-content text-sm">
                  {type === "Register"
                    ? "Have An Account?"
                    : "Not Have An Account?"}
                </p>
                <a
                  className="text-primary text-sm"
                  href={type === "Register" ? "/login" : "/register"}
                >
                  {type === "Register" ? "Login" : "Register"}
                </a>
              </div>
  
              <div className="grid grid-cols-3">
                <hr className="border-[0.5px] border-[#dedede] h-0" />
                <p className="text-base-content text-xs text-center">Or</p>
                <hr className="border-[0.5px] border-[#dedede] h-0" />
              </div>
  
              <div className="flex justify-center sm:justify-between gap-10 sm:gap-4">
                <ButtonAuth value="Google" />
                <ButtonAuth value="Facebook" />
              </div>
            </>
          ) : ""}
        </div>
      </div>
    )
  }

export default FormAuth