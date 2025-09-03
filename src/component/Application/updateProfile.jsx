import {useTranslation} from "react-i18next";
import {IoArrowBack} from "react-icons/io5";
import SelecProvince from "./selectProvince";
import {FaLocationDot} from "react-icons/fa6";
import {useState} from "react";
import ProfilePictureUploader from "../Home/ProfilePictureUploader";
import SelecDistrict from "./selecDistrict";

const UpdateProfile = ({setOpenUpdateProfile}) => {
    const {t} = useTranslation();
    const [openSelecProvince, setOpenSelecProvince] = useState(false); // کنترل باز/بسته شدن
    // const [selectedProvinceLocal, setSelectedProvinceLocal] = useState("")
    const [openSeleDistricts, setOpenSeleDistricts]= useState(false)
    // const [selectedDistrictsLocal, setSelectedDistrictsLocal] = useState([]);

  return (
    <div className="fixed inset-0 flex md:pt-0 z-50">
        <div className="w-full h-screen create  dark:bg-[#232323] bg-white shadow overflow-hidden flex flex-col">
            <div className="w-full bg-white sticky z-50 flex flex-col items-center justify-center ">
                <div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500 dark:text-cyan-600  dark:bg-[#121212]">
                    <button onClick={() => setOpenUpdateProfile(false)} className="text-[18px] absolute top-8 left-2" > <IoArrowBack size={25} /></button>
                    <div className="flex items-center justify-center w-full">
                        <p className="text-[20px] font-semibold tracking-wide"> Update Profile</p>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-100  dark:bg-[#232323] overflow-auto p-2 flex flex-col items-center gap-2.5">
                <div className="profile"> <ProfilePictureUploader /> </div>
                <form  className="relative px-5 w-full">
                    <div className="absolute -top-3 bg-white px-2 dark:bg-[#191919]  left-10 border rounded border-red-600 text-cyan-600"> Personal Info </div>
                    <div className="w-full dark:bg-[#191919] flex flex-col rounded-md border border-red-600 p-6">
                        <input className="w-full px-5 py-3 rounded-full dark:border  dark:bg-[#191919]  dark:border-white  shadow mt-1 focus:ring-2 focus:ring-red-500"
                         type="text" placeholder="First Name" />
                        <input  type="text" placeholder="Last Name" className="w-full px-6 py-3 dark:border  dark:border-white rounded-full dark:bg-[#191919] mt-5 shadow  outline-none  focus:ring-2  focus:ring-red-500"/>
                        <input    type="text" placeholder="email" className="w-full px-5 py-3 dark:border   dark:border-white rounded-full dark:bg-[#191919] shadow mt-5 outline-none  focus:ring-2  focus:ring-red-500"/>
                    </div>
                    <div className="mt-5 relative dark:bg-[#191919] w-full flex flex-col rounded-md border border-red-600 p-6">
                        <div className="absolute -top-3 dark:bg-[#191919] bg-white px-2  left-6 border rounded border-red-600 text-cyan-600"> Contact Info</div>
                        <input type="text" placeholder="Phone No"  className="shadow outline-none dark:bg-[#191919] border-gray-300 dark:border   dark:border-white  bg-white focus:ring-2 focus:ring-red-500  px-6 py-3 rounded-full"/>
                        <input  type="text" placeholder="WhatsApp" className="shadow mt-5 px-6 py-3 outline-none dark:bg-[#191919] dark:border   dark:border-white  border-gray-300 bg-white focus:ring-2 focus:ring-red-500 rounded-full" />
                        <input type="text"  placeholder="Facebook" className="shadow mt-5 px-6 py-3 outline-none dark:bg-[#191919]  dark:border   dark:border-white  border-gray-300 bg-white focus:ring-2 focus:ring-red-500 rounded-full"/>
                        <input type="text"  placeholder="Instagram"  className="shadow mt-5 px-6 py-3 outline-none dark:border   dark:border-white  dark:bg-[#191919] border-gray-300 bg-white focus:ring-2 focus:ring-red-500 rounded-full"/>
                    </div>
                    <div className="mt-5 relative dark:bg-[#191919] w-full flex flex-col rounded-md border border-red-600 p-6">
                        <div className="absolute -top-3 dark:bg-[#191919] bg-white px-2  left-6 border rounded border-red-600 text-cyan-600">   Address </div>
                        <button type="button" 
                         onClick={() => setOpenSelecProvince(true)} 
                         className="province shadow outline-none border-gray-300 dark:bg-[#191919] bg-white focus:ring-2 flex  ite justify-between focus:ring-red-500 border dark:border-gray-500 px-6 py-3 rounded-full" >
                            {/* { || "Select Province"} */}
                            Slect Province
                            <span className=" text-cyan-600"> <FaLocationDot size={27} /> </span>
                        </button>
                        <div className="relative flex flex-col">
                            <button className="shadow mt-5 dark:bg-[#191919] px-6 py-3 outline-none focus:ring-2 border-gray-300 dark:border-gray-500 border bg-white focus:ring-red-500 rounded-full flex items-center justify-between "
							 type="button"
                              onClick={()=>{   
							    if (!setOpenSelecProvince) {
                                    alert("Please select a province first");
                                    return;
                                } setOpenSeleDistricts(true)}} 
							>
                                Select Districts
                                {/* {selectedDistrictsLocal.length > 0   ? selectedDistrictsLocal.join(", ")  : "Select District"} */}
                                <span className=" text-cyan-600"> <FaLocationDot size={27} /></span>
                            </button>
                        </div>
                        <div className="relative">
							<input placeholder="Region" className="shadow mt-5 px-6 py-3 outline-none border  border-gray-300 placeholder:text-black bg-white focus:ring-2 focus:ring-red-500 dark:placeholder:text-white dark:border-gray-500 dark:bg-[#282828] rounded-full flex items-center justify-between w-full"/>
                            <span className=" text-cyan-600 absolute right-6 top-7"><FaLocationDot size={27} /></span>
                        </div>
                    </div>
                   <button className={`mt-8 mb-6 rounded-full w-full bg-cyan-600 flex justify-center items-center gap-1 text-xl hover:bg-cyan-500 px-8 py-3 text-white `} >  Update Profile</button>
                </form>
               {openSelecProvince && ( <SelecProvince showClass="hidden"    disableDistrict={true} onClose={() => setOpenSelecProvince(false)}/> )}
               {/* { openSeleDistricts && (<SelecDistrict   province={} setShowDistrict={setOpenSeleDistricts} setTempProvince={setSelectedProvinceLocal}   />) } */}
            </div>
        </div>
    </div>
  );
};

export default UpdateProfile;
