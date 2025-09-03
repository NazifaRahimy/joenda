import  { useState,useEffect } from "react";
import { PiEyeClosedBold } from "react-icons/pi";
import {  IoEye } from "react-icons/io5";
import { auth, provider, signInWithPopup } from "../../firebase";
import { useTranslation } from "react-i18next";
import Registration from "./registration";
import { Link } from "react-router-dom";

export default function Login( { openRegistration, setOpenRegistration}) {
      
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();
    const [agree, setAgree] = useState(false); 
    const [error, setError] = useState("");   

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
		if (!agree) { 
            setError("Please accept the privacy policy before logging in."); 
            setTimeout(() => setError(""), 4000);
            return; 
        }
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User Info:", user);
            localStorage.setItem("auth-token", await user.getIdToken());
			localStorage.setItem("auth-name", user.displayName);
            localStorage.setItem("auth-email", user.email);
	        window.location.reload(); 
            window.location.replace("/myprofile");
            alert("وارد شدی!");
        } catch (error) {
            console.error("Login error:", error);
            alert("خطا در ورود");
        }
    };
	
    const [formData, setformData] = useState({ email: "",  password: "",})
	let  names, values;
	const HandlerChange =(e) => {
		names = e.target.name;
		values = e.target.value;
		setformData({...formData, [names]: values})
        console.log(names, values)
	}

	const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const Login = async(e)=>{
		e.preventDefault();
        if (!agree) { 
            setError("Please accept the privacy policy before logging in."); 
            setTimeout(() => setError(""), 4000);
            return; 
        }

        let valid = true;
        const errors = {};
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.email = "Please enter a valid email address";
            valid = false;
        }

        if (!formData.password || formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            valid = false;
        }

        setFormErrors(errors);
        if (!valid) return;

		const requestData = {
			email: formData.email,
			password: formData.password
		}
		try{
			const response = await fetch("http://localhost:3001/login", {
				method: "POST",
				headers: {
                    "Content-Type": "application/json"
				},
				body : JSON.stringify(requestData),

			})
			const responseData = await response.json();
			if(response.ok){
				alert("Login successful");
				localStorage.setItem("auth-token", responseData.token);
				localStorage.setItem("auth-name", responseData.user.name);
				localStorage.setItem("auth-email", responseData.user.email); 
				window.location.reload(); 
				setformData({
	                email: "",
                    password: "",
                });
				window.location.replace("/");
			}else{
				alert("Login failed. Please try again.");
			}
		}catch(error){
	        alert("Network error. Please check your connection.");
        }
        
	}

 
    return (
        <div className="fixed top-0 left-0 bg-white w-full h-screen flex md:pt-0 md:items-center justify-center z-[1000]">
		   <div className="bg-gray-100 dark:bg-[#101010] dark:border dark:border-[#282828]   px-8 py-5  w-full shadow-lg relative">
			    <div className="w-full h-auto mt-5 gap-5  flex flex-col items-center justify-center mb-5">
                    <div className="w-[120px] h-[120px] rounded-full  border-4 border-white dark:border-[#101010] ring-4 ring-cyan-600 bg-cyan-600 text-white text-3xl flex items-center justify-center"> جوینده</div>
                    <p className="  mt-2 text-xl text-cyan-600 tracking-wide">AFghanistan Online Market </p>
                </div>
				<form onSubmit={Login}>
				    <div className="w-full relative">
					    <input  type="email" name="email" placeholder="Email"  value={formData.email} onChange={HandlerChange}   className={`w-full px-6 py-3 mt-2 border rounded-full focus:outline-none focus:ring-1 outline-none focus:ring-cyan-500 dark:bg-[#282828] dark:border-none ${formErrors.email ? "border-red-600 shadow-none" : "border-gray-400"}`} />
						{formErrors.email && <p className="text-red-700 text-sm ml-3">{formErrors.email}</p>}
                    </div>
		            <div className="w-full relative">
			            <input type={showPassword ? "text" : "password"} name="password"   onChange={HandlerChange} value={formData.password}  placeholder="Password"    className={`w-full px-6 py-3 mt-2 border rounded-full focus:outline-none focus:ring-1 outline-none focus:ring-cyan-500 pr-10 dark:bg-[#282828] dark:border-none ${
                         formErrors.password ? "border-red-600 shadow-none" : "border-gray-400" }`}	autoComplete="new-password" />
			            <span className="absolute right-8 top-4 cursor-pointer"   onClick={() => setShowPassword(prev => !prev)} >   {showPassword ? <IoEye /> : <PiEyeClosedBold/>}</span>
						{formErrors.password && <p className="text-red-700 text-sm ml-3">{formErrors.password}</p>}
					</div>
					<button type="button" className=" my-6  text-blue-400 border-b border-b-transparent hover:border-b hover:border-red-500 text-[18px] outline-none tracking-wide">{t("loginModal.forget_password")}		</button> 
				    <button type="submit"   className="bg-cyan-600 hover:bg-cyan-400 text-white px-4 py-3 rounded-full w-full flex items-center justify-center gap-1 text-xl tracking-wide	">{t("loginModal.login")} </button>
                </form> 
				<div className=" flex items-center px-4 my-5">
			        <span className="px-4 text-[16px] tracking-wide">Don'n have an account ?		</span> 
                    <Link to="/registration" className="ress text-cyan-600  tracking-wide"> Registration	</Link> 
		 	    </div>
				{openRegistration && (<Registration />)}
                <button onClick={handleLogin}  className=" px-8 py-2 rounded-full border-2 border-black w-full flex items-center justify-between text-xl   tracking-wide" >Sign with Google <img className="w-10" src="google.png" alt="google" /></button>
				{error && (
                    <div className=" absolute bottom-8 left-8 right-8  mx-auto bg-red-600 text-white py-5 px-8 rounded-full">
						<p className=" text-center text-xl tracking-wide">{error}</p>
					</div>
                )}
				<div className="flex items-center gap-2 my-5">
                    <input  type="checkbox"  id="agree"  checked={agree} onChange={(e) => setAgree(e.target.checked)} 
	                className={`w-5 h-5 border-2 border-black rounded cursor-pointer ${ agree ? "bg-cyan-600 border-none" : "bg-white"}`}/>
                    <label htmlFor="agree" className="text-md tracking-wide">I agree to the <Link to="/privacy" className="text-blue-400 tracking-wide">Privacy Policy</Link></label>
                </div>
            </div>
        </div>
    );
}


