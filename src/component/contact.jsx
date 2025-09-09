import useMobile from "./useMobile";
import PageTitle from "./pagetitle";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { TbBrandFacebook } from "react-icons/tb";
import { FaInstagram,  FaTelegram , FaWhatsapp } from "react-icons/fa";
import Footer from "./footer";
import { GrLanguage } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import ScrollToTopButton from "./bottomToTob";
import  ContactPageMobile  from "./Application/contact";
function ContactPage() {
	const { t } = useTranslation();
    const isMobile = useMobile();
	const [user, setUsers] = useState({ first_name:'', email:'', subject:'', last_name:'', message:'', company_name:"", phone:''})

    const [touched, setTouched] = useState({
		first_name: false,
		last_name: false,
		email: false,
		phone: false,
		message: false,
		
	})

	let names, values
    const  data =(e) => {
        names = e.target.name;
	    values = e.target.value;
        console.log(names, values)
	    setUsers({...user, [names]: values})
    }

    const handleBlur = (e)=> {
	    setTouched((prve) => ({
		    ...prve,
		    [e.target.name]: true,
	    }))
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   };

    const isValidAfghanistanPhone = (phone) => {
        return /^07\d{8}$/.test(phone);
    };

	const [contactErrors, setContactErrors] = useState({ first_name: "",last_name: "", email: "", phone: "", message: "" });
 
	const handleSubmit = async(e) => {
        e.preventDefault();
        let valid = true;
        const errors = {};
	
    if (!user.first_name || user.first_name.length < 2) {
        errors.first_name = t("contact.validation.firstName");
    }

    if (!user.last_name || user.last_name.length < 2) {
        errors.last_name = t("contact.validation.lastName");
    }

    if (!user.email) {
        errors.email = t("contact.validation.email");
    } else if (!isValidEmail(user.email)) {
        errors.email = t("contact.validation.email");
    }

    if (!user.phone) {
        errors.phone = t("contact.validation.phone");
    } else if (!isValidAfghanistanPhone(user.phone)) {
        errors.phone = t("contact.validation.phone");
    }

    if (!user.message || user.message.length < 10) {
        errors.message = t("contact.validation.message");
    }
    setContactErrors(errors)
    if (!valid) return;
        try {
			const respones = await fetch('https://api.ganjyab.af/api/contact', {
                method: "POST", 
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			
			if(respones.ok){
                alert('✅ Message Sent');
                console.log('sent');
				setUsers({ first_name:'', email:'', subject:'', last_name:'', message:'', company_name:"", phone:''})
                } else {
                 alert('❌ Error Occurred, Message Not Sent');
                 console.log('not sent')
                }
		}catch(error) {
		    alert('❌ Network Error: Message Not Sent');
            console.error(error);
		}
		
   }

  return (
    <>
    {isMobile ? < ContactPageMobile  />:
    (<div className="relative">
        <PageTitle title="pages.contact" />
        <div className="container mx-auto min-h-screen ">
            <section className=" grid items-center grid-cols-1 md:grid-cols-2 mt-12 gap-8  ">
			<div className="flex size-full items-center justify-center ">
				<img src="Contan_us.png" alt="gril" width='800px'  className="w-full  rounded-lg object-cover h-[500px]"/>
			</div>
            <div>
				<div>
					<h1 className="mb-3 text-3xl font-semibold">{t("contact.title")}</h1>
					<form className="space-y-2.5">
						<div className="w-full gap-2.5 flex">
							<div className="space-y-2 w-full">
                                <label htmlFor="name" className="text-sm font-medium leading-none"> {t("contact.firstName")}<span className="text-red-400">*</span> </label>
							   <div className="relative">
                                    <input type="text" name="first_name" onBlur={handleBlur} value={user.first_name}  onChange={data} 	placeholder={t("contact.placeholders.firstName")} className="h-9 w-full rounded-md shadow-sm border px-3 py-1 focus:ring-1 focus:ring-cyan-500 outline-none dark:border-none dark:bg-[#282828]"/>
								    {contactErrors.first_name && ( <p className="text-red-500 text-xs mt-1 ml-2">  {contactErrors.first_name}   </p>  )}
								    {touched.first_name && user.first_name.length < 2 &&  <p className="text-red-500 text-xs mt-1 ml-2">{t("contact.validation.firstName")}</p>}
								</div>
							</div>
							<div className="space-y-2 w-full">
                               <label htmlFor="name" className="text-sm font-medium leading-none">{t("contact.lastName")} <span className="text-red-400">*</span> </label>
							   <div className="relative">
                                    <input type="text" value={user.last_name} name="last_name" onBlur={handleBlur} onChange={data} 	placeholder={t("contact.placeholders.lastName")}		className="h-9 w-full rounded-md shadow border px-3 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-none dark:bg-[#282828]"/>
									{contactErrors.last_name && ( <p className="text-red-500 text-xs mt-1 ml-2">  {contactErrors.last_name}   </p>  )}
								    {touched.last_name && user.last_name.length < 2 &&   <p className="text-red-500 text-xs mt-1 ml-2">{t("contact.validation.lastName")}</p>}
								</div>
							</div>
						</div>
						<div className="space-y-2 w-full">
                            <label htmlFor="name" className="text-sm font-medium leading-none"> {t("contact.email")}	 <span className="text-red-400">*</span> </label>
							<div className="relative">
                                <input type="email" 	placeholder={t("contact.placeholders.email")}
								 value={user.email} name="email" onBlur={handleBlur} onChange={data} className="h-9 w-full rounded-md shadow border px-3 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:bg-[#282828] dark:border-none"/>
								{contactErrors.email && ( <p className="text-red-500 text-xs mt-1 ml-2">  {contactErrors.email}   </p>  )}
						        {touched.email && !isValidEmail(user.email) &&  <p className="text-red-500 text-xs mt-1 ml-2">{t("contact.validation.email")}</p>}
							</div>
					    </div>
						<div className="space-y-2 w-full">
                            <label htmlFor="name" className="text-sm font-medium leading-none"> {t("contact.companyName")}<span className="text-red-400">*</span> </label>
							<div className="relative">
                                <input type="text" 	placeholder={t("contact.placeholders.companyName")}	value={user.company_name} name="company_name" onChange={data} className="h-9 w-full rounded-md shadow border px-3 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-none dark:bg-[#282828]"/>
							</div>
						</div>
						<div className="space-y-2 w-full ">
                            <label htmlFor="name" className={`${touched.phone && !isValidAfghanistanPhone(user.phone) ? "text-red-500" : ""}`}> {t("contact.phoneNumber")} <span className="text-red-400">*</span> </label>
							<div className="relative">
							    <span className="absolute left-2 top-2.5 text-white "> < GrLanguage  /> </span>
                                <input type="text" placeholder="07******" onBlur={handleBlur} value={user.phone} name="phone" onChange={data} className="h-9 w-full rounded-md shadow border px-8 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-none dark:bg-[#282828]"/>
							    {contactErrors.phone && ( <p className="text-red-500 text-xs mt-1 ml-2">  {contactErrors.phone}   </p>  )}
							    {touched.phone && !isValidAfghanistanPhone(user.phone) && ( <p className="text-red-500 text-xs mt-1 ml-2">{t("contact.validation.phone")}	</p>)}
							</div>
						</div>
						<div className="space-y-2 w-full">
                           <label htmlFor="name" className="text-sm font-medium leading-none"> {t("contact.subject")}
					        <span className="text-red-400">*</span> </label>
							<div className="relative">
                                <input type="text" className="h-9 w-full rounded-md shadow border px-3 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:bg-[#282828] dark:border-none"
								placeholder={t("contact.placeholders.subject")} value={user.subject} name="subject" onChange={data} />
							</div>
						</div>
						<div className="space-y-2 w-full">
                            <label htmlFor="name" className={`text-sm font-medium leading-none ${touched.message && user.message.length < 10 ? "text-red-500" : ""}`}> {t("contact.message")}	 <span className="text-red-400">*</span> </label>
							<div className="relative">
                                <textarea rows={5} type="text" value={user.message} name="message" onChange={data} onBlur={handleBlur} 	placeholder={t("contact.placeholders.message")}
								 className="min-h-[60px] w-full rounded-md shadow border px-3 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-none dark:bg-[#282828]"/>
								{contactErrors.message && ( <p className="text-red-500 text-xs mt-1 ml-2">  {contactErrors.message}   </p>  )}
								{touched.message && user.message.length < 10 && <p className="text-red-500 text-xs mt-1 ml-2" >{t("contact.validation.message")}</p>}
						   </div>
						</div>
						<button type="button" onClick={handleSubmit} className="px-3 py-2 rounded bg-cyan-600 hover:bg-cyan-400 text-white flex items-center justify-center border-none outline-none "> <span className="mr-1 text-xl mt-1"><IoIosAdd /></span> {t("contact.send")}</button>
					</form>
				</div>
				<div className="flex items-center justify-center my-4">
                    <div className="border-t border-gray-300 flex-grow"></div>
				</div>
				<div className="flex justify-center items-center space-x-3 rounde-md py-4 dark:bg-[#282828] mb-10">
                    <a href="" className="dark:bg-[#1f1f1f] bg-cyan-600 transition hover:bg-blue-500 p-2 rounded-full flex items-center justify-center text-xl cursor-pointer dark:hover:bg-[#282828] text-white"><TbBrandFacebook  /></a>
					<a href="" className="dark:bg-[#1f1f1f] bg-cyan-600 transition hover:bg-blue-500 p-2 rounded-full flex items-center justify-center text-xl cursor-pointer dark:hover:bg-[#282828] text-white"><FaInstagram  /></a>
					<a href="" className="dark:bg-[#1f1f1f] bg-cyan-600 transition hover:bg-blue-500 p-2 rounded-full flex items-center justify-center text-xl cursor-pointer dark:hover:bg-[#282828] text-white">< FaTelegram   /></a>
					<a href="" className="dark:bg-[#1f1f1f] bg-cyan-600 transition hover:bg-blue-500 p-2 rounded-full flex items-center justify-center text-xl cursor-pointer dark:hover:bg-[#282828] text-white"><FaWhatsapp  /></a>
				</div>
			</div>
			</section>
        </div>
	    {/* <div className="fixed bottom-4 right-0 group">
            <div className="flex h-[60px] bg-white  dark:bg-white dark:text-black shadow-[0px_0px_5px_rgba(0,0,0,0.5)] w-[70px] group-hover:w-[270px] overflow-hidden  transition-all duration-700 ease-in-out rounded-l-[3px]">
                <div className="w-[70px] flex flex-col justify-center items-center shrink-0">
                    <img src="recaptcha_logo.png" alt="recaptcha_logo" className="w-[50px] h-[45px] object-cover" />
                    <div className="flex text-[10px] justify-center group-hover:hidden">
                        <a href="">Privacy</a>
                        <p className="px-[2px]">-</p>
                        <a href="">Terms</a>
                    </div>
                </div>
                <div className=" w-[200px] bg-blue-600 text-white  flex-col justify-center pl-4  opacity-0 scale-90 translate-x-4 group-hover:flex group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-700 ease-in-out hidden">
                    <p className="text-[14px] font-bold">protected by reCAPTCHA</p>
                    <div className="flex text-[10px] mt-[2px]">
                        <a href="">Privacy</a>
                        <p className="px-[2px]">-</p>
                        <a href="">Terms</a>
                    </div>
                </div>
            </div>
        </div> */}
        <ScrollToTopButton />
        <Footer />
    </div>
    )
   }
   </>
  );
}

export default ContactPage