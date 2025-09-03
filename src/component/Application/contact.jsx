import { useTranslation } from "react-i18next";
import { IoArrowBack} from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { useState } from "react";
const  ContactPage = ({setOpenCatact}) => {
	const { t } = useTranslation();
    const [user, setUsers] = useState({first_name:'', email:'', subject:'', last_name:'', message:'', company_name:"", phone:''})

    let names, values
    const  data =(e) => {
        names = e.target.name;
        values = e.target.value;
        setUsers({...user, [names]: values})
    }

    
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   };

    const isValidAfghanistanPhone = (phone) => {
        return /^07\d{8}$/.test(phone);
    };

    const [contactErrors, setContactErrors] = useState({ first_name: "",last_name: "", email: "",phone: "", message: ""});
    
    
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
            }
        }catch(error) {
            alert('❌ Network Error: Message Not Sent');
        }
        
    }


  return (
    <div className="fixed inset-0 flex md:pt-0 z-50">
        <div className="w-full h-screen create  bg-white dark:bg-[#282828] shadow overflow-hidden flex flex-col">
            <div className="w-full bg-white sticky z-50 flex flex-col items-center justify-center ">
                <div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500 dark:bg-[#121212] dark:text-cyan-50">
                    <button onClick={()=> setOpenCatact(false)} className="text-[18px] absolute top-8 left-2" > <IoArrowBack size={25} /></button>
                    <div className="flex items-center justify-center w-full">
                        <p className="text-[20px] font-semibold tracking-wide">Contact Us</p>
                    </div>
                </div>
            </div>
             <div className="w-full bg-gray-100 dark:bg-[#282828] overflow-auto p-2 flex flex-col items-center gap-2.5">
            <form className="space-y-4 w-full p-5">
                <div className="w-full">
                    <div className="space-y-2 w-full">
                        <label htmlFor="name" className="text-lg tracking-wide font-semibold leading-none"> {t("contact.firstName")} <span className="text-red-400">*</span> </label>
                        <div className="relative">
                            <input type="text" name="first_name" value={user.first_name}  onChange={data}   	placeholder={t("contact.placeholders.firstName")} className="dark:bg-[#121212] w-full rounded-md border px-3 py-3 border-black  outline-none  dark:border-gray-400"/>
                            {contactErrors.first_name && ( <p className="text-red-700 text-sm mt-1 ml-4">  {contactErrors.first_name}   </p>  )}
                            {user.first_name.length> 0 && user.first_name.length < 2 &&  <p className="text-red-500 text-sm mt-1 ml-2">{t("contact.validation.firstName")}</p>}
                        </div>
                    </div>
                    <div className="space-y-2 w-full mt-4">
                        <label htmlFor="name" className="text-lg font-semibold leading-none">{t("contact.lastName")} <span className="text-red-400">*</span> </label>
                        <div className="relative">
                            <input type="text"  value={user.last_name} name="last_name" onChange={data} 	placeholder={t("contact.placeholders.lastName")}		className="w-full rounded-md border border-black px-3 py-3 outline-none  dark:border-gray-4 dark:bg-[#121212]"/>
                            {contactErrors.last_name && ( <p className="text-red-700 text-sm mt-1 ml-4">  {contactErrors.last_name}   </p>  )}
                            {user.last_name.length >0 && user.last_name.length < 2 &&   <p className="text-red-500 text-sm mt-1 ml-2">{t("contact.validation.lastName")}</p>}
                        </div>
                    </div>
                </div>
                <div className="space-y-2 w-full ">
                    <label htmlFor="name" className="text-lg font-semibold leading-none"> {t("contact.email")}	 <span className="text-red-400">*</span> </label>
                    <div className="relative">
                        <input type="email"     value={user.email} name="email"  onChange={data}  	placeholder={t("contact.placeholders.email")}
                        className=" w-full rounded-md  border border-black p-3 outline-none  dark:bg-[#121212] dark:border-gray-400"/>
                        {contactErrors.email && ( <p className="text-red-700 text-sm mt-1 ml-4">  {contactErrors.email}   </p>  )}
                        {user.email.length >0 && !isValidEmail(user.email) &&  <p className="text-red-500 text-sm mt-1 ml-2">{t("contact.validation.email")}</p>}
                    </div>
                </div>
                <div className="space-y-2 w-full">
                    <label htmlFor="name" className="text-lg font-semibold leading-none"> {t("contact.companyName")} <span className="text-red-400">*</span> </label>
                    <div className="relative">
                        <input type="text" 	placeholder={t("contact.placeholders.companyName")}	className=" w-full rounded-md  border border-black p-3 outline-none  dark:border-gray-400 dark:bg-[#121212]"/>
                    </div>
                </div>
                <div className="space-y-2 w-full ">
                    <label htmlFor="name "  className="text-lg font-semibold leading-none" > {t("contact.phoneNumber")} <span className="text-red-400">*</span> </label>
                    <div className="relative">
                        <span className="absolute left-2 top-2.5 "> < GrLanguage  /> </span>
                        <input type="text" placeholder="07******"  value={user.phone} name="phone" onChange={data} className=" w-full rounded-md  border border-black px-8 py-3  outline-none dark:border-none dark:bg-[#121212]"/>
                        {contactErrors.phone && ( <p className="text-red-700 text-sm mt-1 ml-4">  {contactErrors.phone}   </p>  )}
                        {user.phone.length >0 && !isValidAfghanistanPhone(user.phone) && ( <p className="text-red-500 text-sm mt-1 ml-2">{t("contact.validation.phone")}	</p>)}
                    </div>
                </div>
                <div className="space-y-2 w-full">
                    <label htmlFor="name" className="text-lg font-semibold leading-none"> {t("contact.subject")}
                    <span className="text-red-400">*</span> </label>
                    <div className="relative">
                        <input type="text" 	placeholder={t("contact.placeholders.subject")}
                        className=" w-full rounded-md  border border-black p-3 outline-none  dark:bg-[#121212] dark:border-gray-400"/>
                    </div>
                </div>
                <div className="space-y-2 w-full">
                    <label htmlFor="name" className={`text-lg font-semibold leading-none `}> {t("contact.message")}	 <span className="text-red-400">*</span> </label>
                    <div className="relative">
                        <textarea rows={5} type="text" value={user.message} name="message" onChange={data}  	placeholder={t("contact.placeholders.message")}
                        className="min-h-[60px] w-full rounded-md  border border-black px-3 py-1 outline-none  dark:border-gray-400 dark:bg-[#121212]"/>
                        {contactErrors.message && ( <p className="text-red-700 text-sm mt-1 ml-4">  {contactErrors.message}   </p>  )}
                        {user.message.length >0 && user.message.length < 10 && <p className="text-red-500 text-sm mt-1 ml-2" >{t("contact.validation.message")}</p>}
                    </div>
                </div>
                <button type="button" onClick={handleSubmit} className="p-3 w-full rounded-full bg-cyan-600 hover:bg-cyan-400 text-white flex items-center justify-center border-none outline-none  text-lg font-semibold">  {t("contact.send")}</button>
            </form> 
            </div>
        </div>
    </div>
  );
};

export default ContactPage;
