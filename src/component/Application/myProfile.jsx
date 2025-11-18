import {useState, useEffect} from "react";
import {FiUser, FiLogIn, FiLogOut} from "react-icons/fi";
import {GrLanguage} from "react-icons/gr";
import HomePage from "../Home/home";
import {
  MdOutlineNightlight,
  MdKeyboardArrowRight,
  MdAppRegistration,
  MdContactPage,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import useMobile from "../useMobile";
import {BiBox} from "react-icons/bi";
import ChangeLanguage from "./changeLanguage";
import {FaRegUser, FaRegBookmark} from "react-icons/fa6";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {MdOutlinePrivacyTip, MdOutlineDelete} from "react-icons/md";
import {Link} from "react-router-dom";
import ContactPage from "./contact";
import UpdateProfile from "./updateProfile";
import Logout from "./logout";
import DeleteAccount from "./deleteAccount";
import {useTranslation} from "react-i18next";
const MyProfile = () => {
  const [theme, setTheme] = useState("day");
  const [user, setUser] = useState(null);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("selectedLang") || "English"
  );
  const [openCantact, setOpenCatact] = useState(false);
  const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openDeleteAccount, setOpenDeleteAccount] = useState(false);
  const {i18n} = useTranslation();
  const isMobile = useMobile();

  const isRTL = i18n.dir() === "rtl";
  const handleLanguageSelect = (langLabel, langCode) => {
    setCurrentLanguage(langLabel);
    localStorage.setItem("selectedLang", langLabel);
    localStorage.setItem("selectedLangCode", langCode);
  };
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const name = localStorage.getItem("auth-name");
    const email = localStorage.getItem("auth-email");
    if (token && name && email) {
      setUser({name, email});
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "day" || savedTheme === "night") {
      setTheme(savedTheme);
    } else {
      setTheme("day");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "night") {
      document.documentElement.classList.add("dark");
    } else if (theme === "day") {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>{
      isMobile ? (<div className="w-full pb-20 ">
      <div className="sticky top-0 z-20 flex w-full justify-start items-center h-20 px-3 bg-cyan-500">
        <p className="text-[20px] font-semibold mt-4 tracking-wide">
          {" "}
          My Profile
        </p>
      </div>
      <div className="relative px-4 pt-1 pb-4 w-full bg-gray-100  dark:bg-[#121212]  overflow-y-auto ">
        {user && (
          <div className="user flex mt-3 justify-start items-center gap-4 px-3 mb-5">
            <div className="imageProfile flex items-center justify-center w-[60px] h-[60px] border bg-cyan-600 border-gray-400 rounded-full">
              <FiUser size={20} /> {user.image}{" "}
            </div>
            <div className="info flex flex-col gap-1">
              <p className="userName text-xl font-medium">{user.name}</p>
              <p className="email text-[17px] text-gray-400">{user.email}</p>
            </div>
          </div>
        )}
        <div className="w-full px-3 py-2 flex flex-col bg-white dark:bg-[#232323] shadow rounded mt-2 ">
          <button
            onClick={() => setTheme(theme === "day" ? "night" : "day")}
            className="border-b p-1 pb-2 border-gray-400 flex justify-between items-center gap-2"
          >
            <span className="flex gap-3 text-[#282828] dark:text-white text-[16px] tracking-wide  ">
              <MdOutlineNightlight size={25} className="-rotate-45" /> Dark Mode
            </span>
            <div className="relative w-[55px] h-8 bg-gray-300 dark:bg-cyan-600 rounded-full">
              <span
                className={`w-8 h-8 bg-gray-400 dark:bg-white rounded-full absolute top-0 ${
                  theme ? "right-0" : "left-0"
                } `}
              ></span>
            </div>
          </button>
          <div
            onClick={() => setOpenLanguage(!openLanguage)}
            className=" px-3 py-2  flex justify-between items-center gap-2"
          >
            <span className="mt-1 flex gap-3 text-[#282828] dark:text-white text-[16px] tracking-wide">
              <GrLanguage size={22} /> Change Language{" "}
            </span>
            <span className="button text-[#282828]  dark:text-white text-[13px] flex gap-2">
              {" "}
              {currentLanguage}{" "}
              {isRTL ? (
                <MdKeyboardArrowLeft size={25} className="text-cyan-600" />
              ) : (
                <MdKeyboardArrowRight size={25} className="text-cyan-600" />
              )}{" "}
            </span>
          </div>
          {user && (
            <div>
              <Link
                to="/favorites"
                className="login  px-3 py-2 border-t border-gray-400 flex justify-between items-center gap-2"
              >
                <span className=" flex items-center gap-3 text-[#282828] dark:text-white text-[16px] tracking-wide ">
                  <FaRegBookmark size={20} /> Saved Products{" "}
                </span>
                <span className="text-cyan-600">
                  {" "}
                  {isRTL ? (
                    <MdKeyboardArrowLeft size={25} />
                  ) : (
                    <MdKeyboardArrowRight size={25} />
                  )}
                </span>
              </Link>
              <Link
                to="/myProducts"
                className="register px-3 py-2 border-t border-gray-400 flex justify-between items-center gap-2"
              >
                <span className=" flex gap-3 text-[#282828] dark:text-white items-center  tracking-wide text-[16px]">
                  {" "}
                  <BiBox size={25} /> My Products{" "}
                </span>
                <span className="text-cyan-600">
                  {" "}
                  {isRTL ? (
                    <MdKeyboardArrowLeft size={25} />
                  ) : (
                    <MdKeyboardArrowRight size={25} />
                  )}{" "}
                </span>
              </Link>
            </div>
          )}
        </div>
        {openLanguage && (
          <ChangeLanguage
            setOpenLanguage={setOpenLanguage}
            onSelectLanguage={(label, code) =>
              handleLanguageSelect(label, code)
            }
          />
        )}
        {user ? (
          <div className="w-full px-3 py-1 flex flex-col bg-white dark:bg-[#232323] rounded shadow mt-3">
            <button
              onClick={() => setOpenUpdateProfile(true)}
              className="login  px-3 py-2 border-gray-400 flex justify-between items-center gap-2"
            >
              <span className=" flex items-center gap-3 text-[#282828] dark:text-white text-[16px] tracking-wide ">
                {" "}
                <FaRegUser size={22} /> Update Profile
              </span>
              <span className="text-cyan-600">
                {" "}
                {isRTL ? (
                  <MdKeyboardArrowLeft size={25} />
                ) : (
                  <MdKeyboardArrowRight size={25} />
                )}{" "}
              </span>
            </button>
            <button
              onClick={() => setOpenDeleteAccount(true)}
              className="register px-3 py-2 border-b border-gray-400 flex justify-between items-center gap-2"
            >
              <span className=" flex gap-3 text-[#282828] dark:text-white items-center  tracking-wide text-[16px]">
                {" "}
                <MdOutlineDelete size={27} /> Delet Account
              </span>
              <span className="text-cyan-600">
                {" "}
                {isRTL ? (
                  <MdKeyboardArrowLeft size={25} />
                ) : (
                  <MdKeyboardArrowRight size={25} />
                )}
              </span>
            </button>
            <button
              onClick={() => setOpenLogout(true)}
              className="login  px-3 py-2 border-gray-400 flex justify-between items-center gap-2"
            >
              <span className=" flex items-center gap-3 text-[#282828] dark:text-white text-[16px] tracking-wide ">
                <FiLogOut size={23} /> Logout
              </span>
              <span className="text-cyan-600">
                {" "}
                {isRTL ? (
                  <MdKeyboardArrowLeft size={25} />
                ) : (
                  <MdKeyboardArrowRight size={25} />
                )}
              </span>
            </button>
          </div>
        ) : (
          <div className="w-full px-3 py-1 flex flex-col bg-white dark:bg-[#232323] rounded shadow mt-3">
            <Link
              to="/login"
              className="login border-b px-3 py-2 border-gray-400 flex justify-between items-center gap-2"
            >
              <span className=" flex items-center gap-3 text-[#282828] dark:text-white text-[16px] tracking-wide ">
                {" "}
                <FiLogIn size={23} /> Login
              </span>
              <span className="text-cyan-600">
                {" "}
                {isRTL ? (
                  <MdKeyboardArrowLeft size={25} />
                ) : (
                  <MdKeyboardArrowRight size={25} />
                )}{" "}
              </span>
            </Link>
            <Link
              to="/registration"
              className="register px-3 py-2 border-gray-400 flex justify-between items-center gap-2"
            >
              <span className=" flex gap-3 text-[#282828] dark:text-white items-center  tracking-wide text-[16px]">
                {" "}
                <MdAppRegistration size={25} /> Registration
              </span>
              <span className="text-cyan-600">
                {" "}
                {isRTL ? (
                  <MdKeyboardArrowLeft size={25} />
                ) : (
                  <MdKeyboardArrowRight size={25} />
                )}
              </span>
            </Link>
          </div>
        )}
        {openLogout && (
          <Logout setOpenLogout={setOpenLogout} setUser={setUser} />
        )}
        {openUpdateProfile && (
          <UpdateProfile setOpenUpdateProfile={setOpenUpdateProfile} />
        )}
        {openDeleteAccount && (
          <DeleteAccount setOpenDeleteAccount={setOpenDeleteAccount} />
        )}
        <div className="w-full px-3 py-2  flex flex-col bg-white dark:bg-[#232323] rounded shadow mt-3">
          <Link
            to="/privacy"
            className="login border-b px-3 py-2 border-gray-400 flex justify-between items-center gap-2"
          >
            <span className="text-[#282828] flex gap-3 items-center dark:text-white tracking-wide text-[16px] ">
              {" "}
              <MdOutlinePrivacyTip size={25} /> privacy Policy{" "}
            </span>
            <span className="text-cyan-600">
              {" "}
              {isRTL ? (
                <MdKeyboardArrowLeft size={25} />
              ) : (
                <MdKeyboardArrowRight size={25} />
              )}
            </span>
          </Link>
          <Link
            to="/about"
            className="  border-b px-3 py-3 border-gray-400 flex justify-between items-center  gap-2"
          >
            <span className="text-[#282828] dark:text-white flex items-center gap-3 text-[16px] tracking-wide">
              {" "}
              <AiOutlineInfoCircle size={25} /> About Us
            </span>
            <span className="text-cyan-600">
              {" "}
              {isRTL ? (
                <MdKeyboardArrowLeft size={25} />
              ) : (
                <MdKeyboardArrowRight size={25} />
              )}
            </span>
          </Link>
          <button
            onClick={() => setOpenCatact(true)}
            className="login px-3 py-2 border-gray-400 flex justify-between items-center gap-2"
          >
            <span className="text-[#282828] dark:text-white flex gap-3 items-center tracking-wide text-[16px]">
              {" "}
              <MdContactPage size={25} /> Contact Us{" "}
            </span>
            <span className="text-cyan-600">
              {" "}
              {isRTL ? (
                <MdKeyboardArrowLeft size={25} />
              ) : (
                <MdKeyboardArrowRight size={25} />
              )}{" "}
            </span>
          </button>
        </div>
        {openCantact && <ContactPage setOpenCatact={setOpenCatact} />}
        <div className="login px-4 py-2 border-black flex justify-between dark:bg-[#232323] items-center gap-2 bg-white mt-4 rounded">
          <span className="text-[#282828] dark:text-white mt-1 text-[16px]">
            version
          </span>
          <span className="text-[#282828] text-lg dark:text-white">1.0.0</span>
        </div>
      </div>
    </div>): (
       <HomePage />
      )
    }
    </>
  );
};

export default MyProfile;
