import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import provinces from "./provinces";
import SelecDistrict from "./selecDistrict";
import { IoArrowBack, IoChevronDownOutline } from "react-icons/io5";
import { useContext } from "react";
import { FilterContext } from "../Home/filterContaxt";
const SelecProvince = ({showClass, onClose,  disableDistrict = false}) => {
    const [search, setSearch] = useState("");
    const [showDistrict, setShowDistrict] = useState(false);
    const { t } = useTranslation();
    const { selectedProvince} = useContext(FilterContext);
    const [tempProvince, setTempProvince] = useState(selectedProvince); 
    const navigate = useNavigate();
    // فیلتر ولایت‌ها
    const filterSelecProvinces = provinces.filter((province) =>
        province.toLowerCase().includes(search.toLowerCase())
    );

    
    const handleProvinceClick = (province) => {
        setTempProvince(province); 
        if (!disableDistrict) {
            setShowDistrict(true);  
        }
    // if (onClose) onClose();
    };

    


    return (
        <div className="fixed inset-0 flex md:pt-0 z-50">
            <div className="w-full h-screen create rounded-tl-md rounded-tr-md bg-white shadow overflow-hidden flex flex-col">
                <div className="w-full bg-white sticky z-50 flex flex-col items-center justify-center dark:bg-[#282828] ">
                    <div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500 dark:bg-[#121212] dark:text-cyan-600">
                        <button onClick={ onClose} className="text-[18px] absolute top-8 left-2" > <IoArrowBack size={25} /> </button>
                        <div className="flex items-center justify-center w-full">
                            <p className="text-[20px] font-semibold">Select Province</p>
                        </div>
                    </div>
                    <div className="w-full px-4 bg-gray-100 py-2 dark:bg-[#282828]">
                        <input className="w-full  dark:bg-[#191919] focus:rounded-md px-3 py-3 md:py-1 rounded-full outline-none shadow-[0px_0px_3px_rgba(0,0,0,0.1)] text-sm focus:ring-1 focus:ring-cyan-500 md:mt-0 border border-gray-400 md:border-none"
                        type="text" value={search} onChange={(e) => setSearch(e.target.value)} name="search" placeholder="Search" />
                    </div>
                </div>
                <div className="w-full bg-gray-100 dark:bg-[#282828] overflow-auto p-2 flex flex-col items-center gap-2.5">
                    {filterSelecProvinces.length > 0 ? (
                        filterSelecProvinces.map((province) => (
                            <button  className="px-3 py-1 gap-2.5 bg-white dark:bg-[#191919] rounded-md w-full border-none dark:text-white transition-colors duration-200 hover:text-cyan-700 justify-between hover:bg-cyan-100 dark:hover:bg-cyan-900 flex items-center text-[18px] outline-none shadow"
                            key={province} onClick={() => handleProvinceClick(province)} >
                                {province}
                                <span className={`sapn w-10 h-10 ${showClass} items-center justify-center rounded-full bg-cyan-500`}><IoChevronDownOutline /></span>
                            </button>
                        ))
                        ) : (
                        <div className="px-4 py-2 text-gray-400">No province found</div>
                        )
					}
                </div>
                
                {showDistrict && ( <SelecDistrict showDistrict={showDistrict}    onClose={ onClose} province={tempProvince}   setTempProvince = {setTempProvince}  setShowDistrict={setShowDistrict} />)}
	        </div>
        </div>
    );
};

export default SelecProvince;
