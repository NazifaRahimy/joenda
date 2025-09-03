import  { useState} from "react";
import { PiEyeClosedBold } from "react-icons/pi";
import {  IoEye } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import {  IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

    export default function Registration() {
        const [showPassword, setShowPassword] = useState(false);
        const [showConfirmPassword, setShowConfirmPassword] = useState(false);
        const [agree, setAgree] = useState(false); 
        const { t } = useTranslation();
        const navigate = useNavigate();  
        const [formData, setformData] = useState({first_name: "", last_name:"", email: "", password: "",confirm_password:"",})
    
        const [formErrors, setFormErrors] = useState({ first_name: "", last_name: "", email: "", password: "", confirm_password: "",});

        let  names, values;
        const HandlerChange =(e) => {
            names = e.target.name;
            values = e.target.value;
            setformData({...formData, [names]: values})
        }

        const isValidEmail = (email) => {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        };

        const Register = async(e)=>{
            e.preventDefault();

            let valid = true;
            const errors = {};

            if (!formData.first_name || formData.first_name.length < 2) {
                errors.first_name = "Plase enter a valid name";
                valid = false;
            }

        if (!formData.last_name || formData.last_name.length < 2) {
            errors.last_name = "lase enter a valid name";
            valid = false;
        }

        if (!formData.email || !isValidEmail) {
            errors.email = "plase enter a valid email address";
            valid = false;
        }

        if (!formData.confirm_password) {
            errors.confirm_password = "Please confirm your password";
            valid = false;
        } else if (formData.confirm_password !== formData.password) {
            errors.confirm_password = "Passwords do not match";
            valid = false;
        }
        if (!formData.password || formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
            valid = false;
        }
        
        setFormErrors(errors);

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

  
 
    return (
        <div className="fixed top-0 left-0 bg-white dark:bg-[#121212] w-full h-screen flex items-start  md:items-center justify-center z-[1000]">
            <div className="bg-gray-100 dark:bg-[#282828]  dark:border dark:border-[#282828]     w-full h-screen shadow-lg relative">
                <div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500  dark:text-cyan-600 dark:bg-[#121212] ">
                    <button className={`back text-[18px] absolute ${document.documentElement.dir === "rtl"? "right-3 rotate-180" : "left-2"} top-8 `}
                        onClick={() => navigate(-1)} >
                        <IoArrowBack size={25} />
                    </button>
                    <div className="flex items-center justify-center w-full">
                        <p className="text-[20px] font-semibold tracking-wide">Registration</p>
                    </div>
                </div>
                <form className="px-7 py-6">
                    <div className="w-full">
                        <input  type="text" placeholder={t("loginModal.name_placeholder")}   value={formData.first_name} name="first_name" onChange={HandlerChange}
                        className={` px-6 py-3 mt-2 w-full border dark:bg-[#101010] dark:border-white rounded-full focus:outline-none focus:ring-1 shadow outline-none focus:ring-cyan-500 ${ formErrors.first_name ? "border-red-600 shadow-none" : ""} `} />
                        {formErrors.first_name && <p className="text-red-700 pl-4">{formErrors.first_name}</p>}
                    </div> 
                     <div className=" w-full">
                        <input  type="text" value={formData.last_name} name="last_name" onChange={HandlerChange} placeholder={t("loginModal.lastname_placeholder")}
                        className={`px-6 py-3 w-full mt-4  border rounded-full focus:outline-none focus:ring-1 shadow outline-none focus:ring-cyan-500  dark:bg-[#101010] dark:border-white ${ formErrors.last_name ? "border-red-600 shadow-none" : ""}`} />
                        {formErrors.last_name && <p className="text-red-700 pl-4">{formErrors.last_name}</p>}
                    </div>
                    <div className="w-full relative">
                        <input  type="email" value={formData.email} onChange={HandlerChange} name="email" placeholder="Email" className={`w-full px-6 py-3  mt-4 border rounded-full focus:outline-none focus:ring-1  text-sm ouline-none focus:ring-cyan-500 pr-10 shadow  dark:bg-[#101010] dark:border-white   ${ formErrors.email ? "border-red-600" : "border-gray-400"} `} />
                        {formErrors.email && <p className="text-red-700 pl-4">{formErrors.email}</p>}
                    </div>
                    <div className="w-full relative">
                        <input type={showPassword ? "text" : "password"} name="password" onChange={HandlerChange} value={formData.password} placeholder="Password" className={`w-full px-6 py-3 mt-4 border rounded-full focus:outline-none focus:ring-1 outline-none dark:bg-[#101010] dark:border-white  focus:ring-cyan-500 pr-10 shadow   autoComplete="new-password"  ${formErrors.password ? "border-red-600 shadow-none" : ""}`} />
                        <span className="absolute right-6 top-8 cursor-pointer"   onClick={() => setShowPassword(prev => !prev)} >   {showPassword ? <IoEye /> : <PiEyeClosedBold/>}</span>
                        {formErrors.password && <p className="text-red-700 ml-4">{formErrors.password}</p>}
                    </div>
                    <div className="w-full relative">
                        <input  type={showConfirmPassword ? "text" : "password"} name="confirm_password" onChange={HandlerChange} value={formData.confirm_password} placeholder="Repeat Password" className={`w-full px-6 py-3  mt-4 border rounded-full focus:outline-none focus:ring-1  text-sm ouline-none focus:ring-cyan-500 pr-10 shadow  dark:bg-[#101010] dark:border-white  " autoComplete="new-password ${ formErrors.confirm_password ? "border-red-600  shadow-none" : ""}`}/>
                        <span className="absolute right-6 top-8 cursor-pointer"   onClick={() => setShowConfirmPassword(prev => !prev)} >   {showConfirmPassword ? <IoEye /> : <PiEyeClosedBold/>}</span>
                        {formErrors.confirm_password && <p className="text-red-700 pl-4">{formErrors.confirm_password}</p>}
                    </div>
                    <button onClick={ Register} disabled={!agree}  
                    className={`bg-cyan-500 hover:bg-cyan-400 text-black text-xl px-6 py-3 rounded-full w-full flex items-center justify-center gap-1 mt-5  ${!agree ? "opacity-50 cursor-not-allowed" : ""}`}> 
                        {t("loginModal.register")}
   	                </button>
                </form> 
                <div className="px-7">
                    <div className=" flex items-center px-4 ">
			            <span className="px-4 text-[18px] tracking-wide">Don'n have an account ?		</span> 
                        <Link to="/login"  className=" text-cyan-600 text-2xl"> Login	</Link> 
		 	        </div>
                    <div className="flex items-center gap-2 my-5">
                        <input   type="checkbox"  id="agree"   checked={agree}   onChange={(e) => setAgree(e.target.checked)}   className="w-5 h-5 border-2 border-black rounded"/>
                        <label htmlFor="agree" className="text-md tracking-wide">
                            I agree the <Link to="/privacy" className="text-blue-400 tracking-wide">Privacy Policy</Link>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}


