import { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import ProfilePictureUploader from "./ProfilePictureUploader";
import { GrLanguage } from "react-icons/gr";
import ProvinceDropdown from "./ProvinceDropdown";
import { MdOutlineUnfoldMore } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
const ModifyAccount = ({isOpen, onClose}) => {
    if (!isOpen) return null;
    const genders = ["Male", "Female", "Prefer not to say"];
    const [openDropdown, setOpenDropdown] = useState(false); 
    const [selectedGender, setSelectedGender] = useState("Prefer not to say"); 
    const dropdownRef = useRef(null);

    const handleGenderChange =(gender)=>{
        setSelectedGender(gender)
        setOpenDropdown(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false)
            }
       };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

   return ( 
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start  md:pt-0 md:items-center justify-center z-[1000]">
            <div className="bg-white h-screen overflow-y-auto dark:bg-[#1a1a1a] dark:text-white w-[600px] sm:rounded-lg shadow-lg p-5 relative">
                <button onClick={onClose} className={`absolute top-5 text-2xl text-gray-300 dark:hover:text-white hover:text-black ${document.documentElement.dir === "rtl" ? "left-3" : "right-3"}`}><IoClose/></button>
                <h1 className="text-[18px] font-signature mt-1">Modify your account</h1>
                <h2 className="text-[15px] my-1 text-gray-400 "> Fill the required fields to modify your account details.</h2>
                <div className="profile">
                    <p className="text-[#232323] dark:text-white">Profile Picture <span className="text-red-500">*</span></p>
                    <ProfilePictureUploader />
                </div>
                <form action="" className="relative">
                    <div className="flex gap-3">
                        <div className="w-full flex flex-col"> 
                            <label htmlFor="">First Name <span className="text-red-500 ">*</span></label>
                            <input className=" px-3 py-1 rounded-md shadow mt-1 outline-none border-none focus:ring-2 focus:ring-cyan-500 dark:bg-[#282828]" type="text" placeholder="First Name"/>
                        </div>
                        <div className="w-full flex flex-col"> 
                            <label htmlFor="">Last Name <span className="text-red-500 ">*</span></label>
                            <input className=" px-3 py-1 dark:bg-[#282828] rounded-md shadow mt-1 outline-none border-none focus:ring-2 focus:ring-cyan-500" type="text" placeholder="Last Name"/>
                        </div>
                    </div>
                    <div ref={dropdownRef} className="gender mt-4 flex flex-col">
                        <label className="mb-1">Gender <span className="text-red-500">*</span></label>
                        <button   onClick={(e)=>{e.preventDefault();setOpenDropdown(!openDropdown)} } className=" flex text-gray-400 items-center justify-between border-none shadow outline-none focus:ring-2 dark:bg-[#282828]focus:ring-cyan-500 px-3 py-1 w-[50%] rounded-md dark:bg-[#282828]"><span>{selectedGender} </span><span ><MdOutlineUnfoldMore  /> </span></button>
                        {
                            openDropdown && (
                                <div className="w-[50%] p-1 mt-2 rounded-md flex justify-start flex-col border border-cyan-200 dark:bg-[#282828]">
                                    {genders.map((gender, index) => (
                                        <button   type="button"   onClick={(e) =>{e.preventDefault() ;handleGenderChange(gender)}} key={index}
                                        className="flex items-center justify-between px-3 py-1 text-gray-400 hover:bg-cyan-100 mt-1 rounded-md dark:hover:bg-cyan-700 " >
                                            <span>{gender}</span> 
                                            {selectedGender === gender && <IoMdCheckmark size={20}/>}
                                        </button>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                    <div className="phoneNumber mt-4 flex flex-col">
                        <label>Phone Number <span className="text-red-500 ">*</span></label>
                        <div className="relative w-full flex flex-col ">
                            <span className={`absolute top-4   ${document.documentElement.dir === "rtl" ? "right-2" : "left-2"}`}> < GrLanguage  /> </span>
                            <input type="text" placeholder="07********" className="shadow outline-none border-none focus:ring-2 focus:ring-cyan-500 mt-2 px-8 py-1 rounded-md dark:bg-[#282828]"/>
                        </div>
                    </div>
                    <div className="phoneNumber mt-4 flex flex-col">
                        <label>Phone Number </label>
                        <div className="relative w-full flex flex-col ">
                            <span className={`absolute top-4   ${document.documentElement.dir === "rtl" ? "right-2" : "left-2"}`}> < GrLanguage  /> </span>
                            <input type="text" placeholder="07********" className="shadow mt-2 px-8 py-1 outline-none border-none focus:ring-2 focus:ring-cyan-500 rounded-md dark:bg-[#282828]"/>
                        </div>
                    </div>
                    <div className="faceBook mt-4 flex flex-col ">
                        <label >Facebook posted link</label>
                        <input type="text" placeholder="https://www.facebook.com/share/.." className="px-3 py-1 shadow rounded-md mt-2 outline-none border-none focus:ring-2 focus:ring-cyan-500 dark:bg-[#282828]" />
                    </div>
                    <div className="instagram mt-4 flex flex-col ">
                        <label >Instagram posted link</label>
                        <input type="text" placeholder="https://www.instagram.com/share/.." className="px-3 py-1 shadow rounded-md mt-2 outline-none border-none focus:ring-2 focus:ring-cyan-500 dark:bg-[#282828]" />
                    </div>
                    <div className="address flex gap-3 mt-4">
                        <div className="w-full flex flex-col"> 
                            <label htmlFor="">Address <span className="text-red-500 ">*</span></label>
                            <input className=" px-3 py-1 rounded-md shadow  outline-none border-none focus:ring-2 focus:ring-cyan-500 mt-2 dark:bg-[#282828]" type="text" placeholder="Street & House number"/>
                        </div>
                        <div className="w-full flex flex-col"> 
                            <label htmlFor="">Region <span className="text-red-500 "> *</span></label>
                            <input className=" px-3 py-1 rounded-md shadow  outline-none border-none focus:ring-2 focus:ring-cyan-500 mt-2 dark:bg-[#282828]" type="text" placeholder="Your Region"/>
                        </div>
                    </div>
                    <div className="provinces mt-4">
                        <label htmlFor="">Provinces <span className="text-red-500 ">*</span></label>
                        <div className="mt-2">
                            <ProvinceDropdown   positionClass="bottom-11"   onSelectProvince={(province) => setSelectedProvince(province)} />
                        </div>
                    </div>
                    <div className={`w-full flex ${document.documentElement.dir=== "rtl" ? "justify-start" :"justify-end"}`}>
                        <button className={`mt-8 rounded-md bg-cyan-600 flex justify-center items-center gap-1 hover:bg-cyan-500 px-8 py-2 text-white `}> <span> <FiEdit2 /></span>Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default ModifyAccount;