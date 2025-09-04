import { useState } from "react";
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import Languages from './languages';
import ThemeSelector from "./themeSelector";
import AuthForm from "./authForm";
import { CgProfile } from "react-icons/cg";
import { IoIosAdd} from "react-icons/io";
import { MdOutlineExpandMore ,MdOutlineExpandLess,  MdOutlineHome  } from "react-icons/md";
import { useTranslation } from "react-i18next";


const NavBar = ({setIsLoggedIn}) => {
    const [showModel, setShowmodel] = useState(false);
    const { t } = useTranslation();
return (
    <>
    <div className=" fixed bottom-0 left-0 z-50 flex md:relative md:top-0 md:left-0  lex w-full py-2 md:py-3 px-6 items-center justify-between    shadow-md bg-white dark:bg-[#232323]">
        {/* Logo */}
        <div className=" hidden  px-3  md:flex justify-center items-center pb-1 ring-2 ring-cyan-600 bg-cyan-600 border-2 text-white border-white rounded ">جوینده</div>
       {/* Links*/}
        <nav className="navLink flex md:space-x-3 lg:space-x-4 list-none items-center">
            <NavLink to="/" className={({ isActive }) =>`text-[#232323] dark:text-white  md:hover:bg-cyan-100 md:hover:text-cyan-700   px-3 py-1 rounded cursor-pointer text-lg md:text-base lg:text-lg    flex items-center justify-center flex-col     ${isActive ? "text-cyan-600 md:text-[#232323]" : ""}`}>
                <span className="md:hidden ">< MdOutlineHome  size={24}/></span>  {t("navbar.home")}
            </NavLink>
            <li className="hidden md:block text-[#232323] dark:text-white  hover:bg-cyan-100 dark:hover:bg-cyan-900 px-3 py-1 rounded cursor-pointer text-lg md:text-base lg:text-lg hover:text-cyan-700  "><Link to="/favorites"> {t("navbar.favorites")}</Link></li>
            {/* منوی More */}
            <div className="relative hidden md:flex justify-end">
                <button onClick={() => setShowmodel(!showModel)} className="text-[#232323]  cursor-pointer hover:bg-cyan-100 hover:text-cyan-700  dark:text-white dark:hover:bg-cyan-900 px-3 py-1 rounded flex items-center text-lg md:text-base lg:text-lg ">
                    {t("navbar.more")}<span className="ml-2 text-xl"> {showModel ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />} </span>
                </button>
                {showModel && (
                    <div className="absolute top-[44px] z-[1000] border border-cyan-200 rounded  bg-white w-[180px] text-sm dark:border  dark:border-cyan-300 dark:bg-[#232323] dark:hover:rounded-none">
                        <Link to="/about"> <li className="text-[#232323] block  dark:text-white text-lg hover:bg-cyan-100 dark:hover:bg-cyan-900 px-3 py-1 rounded cursor-pointer hover:text-cyan-700 "> {t("navbar.about")}</li></Link>
                        <Link to="/contact"> <li className="text-[#232323] dark:text-white text-lg hover:bg-cyan-100 dark:hover:bg-cyan-900 px-3 py-1 rounded cursor-pointer  hover:text-cyan-700 ">  {t("navbar.contact")}</li></Link>  
                        <Link to="/privacy" className="block w-full  hover:text-cyan-700  dark:text-white dark:hover:bg-cyan-900 hover:bg-cyan-100 px-3 py-2  text-lg" onClick={() => setShowmodel(false)}>{t("navbar.privacy")}</Link>
                   </div>
                )}
            </div>
        </nav>
         {/* سمت راست */}
        <div className=" flex items-center gap-2">
            <div className="hidden md:inline"><Languages  /></div>
            <div className="ml-2">
                <Link to='/createanAd' >  <button  className="md:bg-cyan-600 md:hover:bg-cyan-400 dark:hover:bg-cyan-700 text-white px-3 lg:px-4 md:py-2 rounded flex flex-col md:flex-row justify-center  items-center gap-1  md:text-sm lg:text-base ">  <IoIosAdd className="text-3xl  md:text-lg text-gray-400 md:text-white dark:text-white"/> <span className="hidden md:inline">{t("navbar.createAd")}</span> <span className="md:hidden text-black dark:text-white">add product</span>  </button></Link>
            </div>
            <div className="hidden md:inline">   <ThemeSelector  /></div>
            <div className="hidden md:inline">  <AuthForm  setIsLoggedIn={setIsLoggedIn}/></div>
        </div>
        <NavLink to="/myprofile " className={({ isActive }) =>  `font-semibold py-2 md:hidden dark:text-white rounded flex flex-col justify-center text-[16px] items-center ${isActive ? "text-cyan-600" : "text-[#232323] hover:text-cyan-600"}` }>  
            <span >< CgProfile    size={24} /></span> My profile
        </NavLink>
    </div>
    </>
  );
};

export default NavBar;
