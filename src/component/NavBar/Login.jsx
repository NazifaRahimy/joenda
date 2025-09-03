import { IoClose } from "react-icons/io5";
import  { useState,useEffect } from "react";
import { PiEyeClosedBold } from "react-icons/pi";
import {  IoEye } from "react-icons/io5";
import { auth, provider, signInWithPopup } from "../../firebase";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

    export default function LoginModal({ isOpen, onClose, initialForm = "login" }) {
         // اگر مودال باز نیست، چیزی نمایش نده
         if (!isOpen) return null;
         // وضعیت‌ها
        const [showPassword, setShowPassword] = useState(false);
	    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [login, setLogin] = useState(initialForm);
        const { t } = useTranslation();
        const [agree, setAgree] = useState(false); // ✅ استیت برای موافقت
        const [formErrors, setFormErrors] = useState({ email: "", password: "", first_name: "", last_name:""});

        const handleLogin = async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("User Info:", user);
                localStorage.setItem("auth-token", await user.getIdToken());
			    localStorage.setItem("auth-name", user.displayName);
                localStorage.setItem("auth-email", user.email);
	            window.location.reload(); 
                alert("وارد شدی!");
            } catch (error) {
                console.error("Login error:", error);
                alert("خطا در ورود");
            }
        };

	    const [formData, setformData] = useState({ first_name: "", last_name:"", email: "",  password: "",confirm_password:""})
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

        const hasUpperCase = (str) => /[A-Z]/.test(str);
        const hasLowerCase = (str) => /[a-z]/.test(str);
        const hasSpecialChar = (str) => /[@#$!%*&^]/.test(str);


   // تابع لاگین
    const Login = async(e)=>{
		e.preventDefault();
		
        let valid = true;
        const errors = {};

       if (!formData.email || !isValidEmail(formData.email)) {
            errors.email = t("loginModal.email_invalid");
            valid = false;
        }

        if (!formData.password || formData.password.length < 6) {
            errors.password = t("loginModal.password_short");
            valid = false;
        }

        setFormErrors(errors); // مقداردهی state خطاها
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
				window.location.reload(); // ⬅️ اضافه کن این خطو
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

	  // تابع رجیستر
	 const Register = async(e)=>{
		e.preventDefault();
		let valid = true;
        const errors = {};
	 
        if (!formData.first_name ) {
            errors.first_name = t("loginModal.firstname_error");
            valid = false;
        }
     
        if (!formData.last_name) {
            errors.last_name = t("loginModal.lastname_error");
            valid = false;
        }
     
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.email = t("loginModal.email_invalid");
            valid = false;
        }

        if (!formData.password ) {
            errors.password = t("loginModal.password_short");
            valid = false;
        }

       setFormErrors(errors); // مقداردهی state خطاها
       if (!valid) return;
		const requestDatas = {
			first_name: formData.first_name,
            last_name: formData.last_name,
            email:  formData.email,
            password: formData.password
		}
		try{
			const response = await fetch("http://localhost:3001/register", {
				method: "POST",
				headers: {
                      "Content-Type": "application/json"
				},
				body : JSON.stringify(requestDatas),

			})
			const responseDatas = await response.json();
			if(response.ok){
				alert("Register successful");
				localStorage.setItem("auth-token", responseDatas.token);
				    localStorage.setItem("auth-name", responseDatas.user.name);
					localStorage.setItem("auth-email", responseDatas.user.email); 
				window.location.reload(); // ⬅️ اضافه کن این خطو
				setformData({
	              first_name: "",
                   last_name:"",
                   email: "",
                   password: "",
                });
				window.location.replace("/");
			}else{
				alert("Register failed. Please try again.");
			}
		 }catch(error){
	        alert("Network error. Please check your connection.");
        }
        
	}

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto"; // در صورت unmount شدن یا رفتن به صفحه‌ی دیگه
        };
    }, [isOpen]);

 
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start pt-10 md:pt-0 md:items-center justify-center z-[1000]">
		   <div className="bg-white dark:bg-[#101010] dark:border dark:border-[#282828]   px-6 py-5 rounded-xl w-[450px] shadow-lg relative">
				<button onClick={onClose} className={`absolute top-5 text-2xl text-gray-300 dark:hover:text-white hover:text-black ${document.documentElement.dir === "rtl" ? "left-3" : "right-3"}`}><IoClose/></button>
				{login === "login" ?<h2 className="text-xl font-semibold mb-1  "> {t("loginModal.welcome_back")} </h2>: 
                <h2 className="text-xl font-semibold mb-1  ">  {t("loginModal.welcome_register")} </h2>}
                {login === "login" ? <p className="text-sm text-gray-400 ">{t("loginModal.fill_login")} </p>:
	            <p className="text-sm text-gray-400 "> {t("loginModal.fill_register")}	. </p> }
	            <div  className="flex justify-between bg-gray-100 dark:bg-[#282828]  rounded p-1 rouded my-8">
		            <button onClick={()=> setLogin("login")}   className={`w-[195px] px-6 py-1 rounded ${login === "login" ? "bg-white dark:bg-[#1a1a1a] dark:text-white " : "bg-gray-100 dark:bg-[#282828] dark:text-gray-400" }`}>{t("loginModal.login")}</button>
		            <button onClick={()=> setLogin("register")}  className={`w-[195px] px-6 py-1 rounded ${login === "register" ? "bg-white  dark:bg-[#1a1a1a]  dark:text-white" : "bg-gray-100 dark:bg-[#282828] dark:text-gray-400" }`}>{t("loginModal.register")}</button>
				</div>
				<form action="">
				    <div className="w-full relative flex justify-between">
			         { login === "register" ? 		
					    <div className="w-[190px]">
						    <input  type="text" placeholder={t("loginModal.name_placeholder")}
							value={formData.first_name} name="first_name" onChange={HandlerChange} className=" px-3 py-1 mt-2  border rounded focus:outline-none focus:ring-1 shadow outline-none focus:ring-cyan-500 dark:bg-[#282828] dark:border-none" />
							    {formErrors.first_name && (<p className="text-red-500 text-xs mt-1 ml-2">{formErrors.first_name}</p>)}
					            {formData.first_name.length > 0 && formData.first_name.length < 2 &&<p className="text-red-500 text-xs mt-1 ml-2">{t("loginModal.firstname_error")}</p>}
					    </div> :<></>}
                      { login === "register" ?
					    <div className="w-[190px]">
						    <input  type="text" value={formData.last_name} name="last_name" onChange={HandlerChange} placeholder={t("loginModal.lastname_placeholder")}
						    className="w-[190px] px-3 py-1 mt-2  border rounded focus:outline-none focus:ring-1 shadow outline-none focus:ring-cyan-500  dark:bg-[#282828] dark:border-none " />
						    {formErrors.last_name && ( <p className="text-red-500 text-xs mt-1 ml-2">{formErrors.last_name}</p> )}
						    {formData.last_name.length > 0 && formData.last_name.length < 2 &&<p className="text-red-500 text-xs mt-1 ml-2">{t("loginModal.lastname_error")}.</p>}
						</div>:<></>}
				    </div>
		            <div className="w-full relative">
					    <input  type="email" value={formData.email} onChange={HandlerChange} name="email" placeholder="someone@example.com" className="w-full px-3 py-1 mt-2  border rounded focus:outline-none focus:ring-1 shadow outline-none focus:ring-cyan-500 mb-2  dark:bg-[#282828] dark:border-none " />
                        {formErrors.email && <p className="text-red-700 text-sm ml-3">{formErrors.email}</p>}
					    { formData.email.length > 0 && !isValidEmail(formData.email) && (<p className="text-red-500 text-[13px] mb-1">	{t("loginModal.email_invalid")} </p>)}
				    </div>
		            <div className="w-full relative">
			            <input  type={showPassword ? "text" : "password"} name="password" onChange={HandlerChange} value={formData.password} placeholder="********" className="w-full px-3 py-1 mb-2 border rounded focus:outline-none focus:ring-1 outline-none focus:ring-cyan-500 pr-10 shadow  dark:bg-[#282828] dark:border-none " autoComplete="new-password" />
			            <span className="absolute right-3 top-3 cursor-pointer"   onClick={() => setShowPassword(prev => !prev)} >   {showPassword ? <IoEye /> : <PiEyeClosedBold/>}</span>
						{formErrors.password && <p className="text-red-700 text-sm ml-3">{formErrors.password}</p>}
	                    {formData.password.length > 0 && formData.password.length < 8 && ( <p className="text-red-500 text-xs mb-1">{t('loginModal.password_short')}.</p>)}                   
		                {formData.password.length >= 8 && !hasUpperCase(formData.password)  && (<p className="text-red-500 text-xs mb-1">{t('loginModal.password_upper')}</p>)}
				        {formData.password.length >= 8 && hasUpperCase(formData.password) && !hasLowerCase(formData.password) && (<p className="text-red-500 text-xs mb-1">{t('loginModal.password_lower')}.</p>)}
					    {formData.password.length >= 8 && hasLowerCase(formData.password) && hasUpperCase(formData.password) && !hasSpecialChar(formData.password) && (<p className="text-red-500 text-xs mb-1">P{t('loginModal.password_special')}</p>)} 
					</div>
					 {login === "login" ?   <button   className=" mb-3  text-orange-400 border-b border-b-transparent hover:border-b hover:border-red-500 text-sm outline-none">{t("loginModal.forget_password")}		</button> : <></>}
				     {login === "register" ?
					<div className="w-full relative">
			            <input  type={showConfirmPassword ? "text" : "password"} name="confirm_password" onChange={HandlerChange} value={formData.confirm_password} placeholder="********" className="w-full px-3 py-1 mb-2 border rounded focus:outline-none focus:ring-1  text-sm ouline-none focus:ring-cyan-500 pr-10 shadow  dark:bg-[#282828] dark:border-none " autoComplete="new-password" />
			            <span className="absolute right-3 top-3 cursor-pointer"   onClick={() => setShowConfirmPassword(prev => !prev)} >   {showConfirmPassword ? <IoEye /> : <PiEyeClosedBold/>}</span>
						{formData.confirm_password.length > 0 &&	formData.confirm_password !== formData.password && (<p className="text-red-500 mb-1 text-xs">{t('loginModal.confirm_password_error')} </p>)}
				    </div>:<></>}
					<div className="flex items-center gap-2 my-5">
                        <input className="w-5 h-5 border-2 border-black rounded"
                        type="checkbox"  id="agree"  checked={agree}   onChange={(e) => setAgree(e.target.checked)}  />
                        <label htmlFor="agree" className="text-md tracking-wide"> I agree to the Privacy Policy <Link to="/privacy" className="text-blue-500 tracking-wide underline">Privacy Policy</Link></label>
                    </div>
		            {
					    login === "login" ?    <button onClick={ Login}  disabled={!agree}  className={`bg-cyan-600 hover:bg-cyan-400 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-1     ${!agree ? "opacity-50 cursor-not-allowed" : ""}	`}><span className="mr-2 mt-1">< FaPlus  /></span> {t("loginModal.login")} </button>
			            : <button onClick={ Register} disabled={!agree}    className={`bg-cyan-600 hover:bg-cyan-400 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-1 ${!agree ? "opacity-50 cursor-not-allowed" : ""}	`}><span className="mr-2 mt-1">< FaPlus  /></span>  {t("loginModal.register")}	</button>
				    }
                </form> 
				<div className=" flex items-center justify-center my-5">
			        <div className="flex-grow border-t border-gray-300 mt-1"></div>
                    <span className="px-4 text-sm text-gray-500">{t("loginModal.or_login_with")}		</span> 
		 	        <div className="flex-grow border-t border-gray-300 mt-1"></div>
		        </div>
		        <button onClick={handleLogin}  className="bg-red-600 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-1 " ><span className="mr-2 mt-1 text-green"><img className="w-[20px] h-[20px]" src="google.png" alt="google" /></span> {t("loginModal.google")}</button>
			</div>
        </div>
    );
}


