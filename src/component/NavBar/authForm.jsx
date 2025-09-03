import { FiUser } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./Login";
import { useTranslation } from "react-i18next";
import { FiLogOut } from "react-icons/fi";

const AuthForm  = ({setIsLoggedIn}) => {

   const [openBox, setOpenBox] = useState(false);
   const [showModal, setShowModal] = useState(false); 
	const [initialForm, setInitialForm] = useState("login"); 
   const dropdownRef = useRef(null);
   const { t } = useTranslation();
   
   useEffect(()=>{
	  const handleClickOutside =(e)=> {
		 if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
			setOpenBox(false)
		 }
	  }
      document.addEventListener("mousedown", handleClickOutside);
		return()=> {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	},[])

   const [user, setUser] = useState(null);

   useEffect(() => {
      const token = localStorage.getItem("auth-token");
      const name = localStorage.getItem("auth-name");
      const email = localStorage.getItem("auth-email");
      if (token && name && email) {
         setUser({ name, email });
      }
   }, []);


   const handleLogout = () => {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      setUser(null);
      setOpenBox(false);
      };

   return ( 
      <> 
         <div ref={dropdownRef}  className="user relative  flex justify-end z-[1000]"> 
            <button onClick={()=> setOpenBox(!openBox)}  className="ml-4 border-none dark:text-white flex items-center gap-2  py-2 md:px-4 rounded-md font-semibold  outline-none  hover:text-cyan-700 hover:bg-cyan-100  text-[14px] dark:hover:bg-cyan-900"><FiUser size={20}/> {user ? user.name: ""}</button>
            {openBox && (
				<div className={`absolute mt-11 ${user ? 'w-52' : "w-32"} bg-white border dark:bg-[#232323] dark:text-white rounded shadow p-1 border-cyan-200 dark:border-cyan-300 `}>
               {user ?
				 (
                  <>
                  <div className="group flex hover:bg-cyan-100 dark:hover:bg-cyan-700 dark:hover:text-white hover:text-cyan-700 transition-colors duration-300 rounded gap-2 items-center px-2  py-1 cursor-pointer">
                     <p className="   text-sm bg-gray-100 rounded-full group-hover:bg-white dark:bg-[#292929] dark:group-hover:bg-[#292929]"><FiUser size={23}/></p>
                     <p className=" text-[12px]">
                        <span className="font-bold"> {user.name}</span>
                        <span>  {user.email}</span>
                     </p>
                  </div>             
                  <button onClick={handleLogout} className="mt-2 w-full text-left px-2 py-1 hover:bg-cyan-100 hover:text-cyan-700 dark:hover:text-white dark:hover:bg-cyan-700 transition-colors duration-300  flex gap-2 items-center rounded-md text-red-400" >
                     <FiLogOut /> <span>   {t("navbar.button")}</span>
                  </button>
                  </>
               ) : (
                  <>
                  <button onClick={() => {  setInitialForm("register");  setShowModal(true); }} className="py-1 w-full text-left px-4 hover:text-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900 rounded-md">
                     {t("navbar.register")}
                  </button>
                 <button onClick={() => {  setInitialForm("login");  setShowModal(true); }} className="py-1 w-full text-left px-4 hover:text-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900 rounded-md"  >
                     {t("navbar.login")}
                  </button>
                  </>
                 )
			   }
               </div>
            )}
        </div> 
      
        {showModal && (<LoginModal isOpen={showModal}  onClose={() => setShowModal(false)} initialForm={initialForm}/>)}</>);
    }
 
export default AuthForm ;