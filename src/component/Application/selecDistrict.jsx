import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useContext } from "react";
import { FilterContext } from "../Home/filterContaxt";
const districts = [
  "Municipal District 1",
  "Municipal District 2",
  "Municipal District 3",
  "Municipal District 4",
  "Municipal District 5",
  "Municipal District 6",
  "Municipal District 7",
  "Municipal District 8",
  "Municipal District 9",
  "Municipal District 10"
];
const SelecDistrict = ({ province, onClose,showDistrict, setShowDistrict,setTempProvince,setSelectedDistrictsLocal}) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { setSelectedProvince, selectedDistricts, setSelectedDistricts} = useContext(FilterContext);
    const [tempDistricts, setTempDistricts] = useState([...selectedDistricts]); 
    // useEffect(() => {
    //     if (isOpen) setIsVisible(true);
    // }, [isOpen]);

    // const handleClose = () => {
    //     setIsVisible(false);
    //     setTimeout(() => {
    //         setCategory(false);
    //     }, 500); 
    // };

    const [isVisible, setIsVisible] = useState(false);
     useEffect(() => { if (showDistrict) setIsVisible(true); }, [showDistrict]);
    const filteredDistricts = districts.filter(d =>  d.toLowerCase().includes(search.toLowerCase()))
  
    const toggleDistrict = (district) => {
        if (tempDistricts.includes(district)) {
            setTempDistricts(tempDistricts.filter(d => d !== district));
        } else {
            setTempDistricts([...tempDistricts, district]);
        }
    };

    const selectAll = () => {
        if (tempDistricts.length === districts.length) {
            setTempDistricts([]);
        } else {
            setTempDistricts([...districts]);
        }
    };
    
    const handleOk = () => {
        setIsVisible(false); 
        setTimeout(() => {
            setSelectedDistricts(tempDistricts);
            setSelectedProvince(province);
            setTempProvince(province);
            setShowDistrict(false); 
            if(onClose) onClose() 
        }, 300); 
    };

    const handleCancel = () => {
        setIsVisible(false); 
        setTimeout(() => {
            setShowDistrict(false); 
            if(onClose) onClose()
            setTempDistricts(selectedDistricts); 
        }, 500); 
    };

    return ( 
        <AnimatePresence>
          {isVisible && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex items-end md:pt-0  z-50">
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height:  550 }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="w-full create rounded-tl-md rounded-tr-md bg-white dark:bg-[#191919] shadow overflow-hidden flex flex-col"
                >
                    <div className=" w-full bg-white dark:bg-[#191919] sticky  z-50 flex flex-col items-center justify-center gap-2 "> 
                        <div className="w-10 h-1 bg-black rounded-full mt-5 dark:bg-white "></div>
                        <div className=" flex w-full justify-center">
                            <p className=" text-[18px] ">{  province}</p>
                        </div>
                        <div className="w-full  px-4  py-2 ">
                            <input  type="text"  placeholder="Search"  value={search}     onChange={(e) => setSearch(e.target.value)} name="search"
                            className="w-full dark:bg-[#282828]  px-3 py-3 md:py-1 rounded-full  outline-none shadow-[0px_0px_3px_rgba(0,0,0,0.1)] text-sm focus:ring-1 focus:ring-cyan-500 md:mt-0 border border-gray-400 md:border-none"/>
                        </div>
                    </div>
                    <div className="w-full max-h-[430px] overflow-auto  p-2  flex flex-col  items-center gap-2.5">
                        <button  onClick={selectAll}  className="px-3 py-3 dark:bg-[#282828] bg-white gap-2.5 rounded-md w-full border-none dark:text-white transition-colors duration-200   flex items-center text-[18px] outline-none  shadow justify-between ">
                            All <span className={`w-5 h-5 rounded-md" ${ tempDistricts.length === districts.length? "bg-cyan-600 text-white rounded-md " : "border-2 border-black bg-white rounded-md"}`}> 
                                {tempDistricts.length === districts.length && (<IoMdCheckmark />)}
                            </span>
                        </button>
                        { filteredDistricts.length >0 ?
                            ( filteredDistricts.map((district)=> (
                                <button onClick={() => toggleDistrict(district)} key={district}  className="px-3 dark:bg-[#282828] py-3 bg-white gap-2.5 rounded-md w-full border-none dark:text-white    flex items-center justify-between text-[18px] outline-none  shadow ">{district}
                                    <span className={`w-5 h-5 rounded-md" ${tempDistricts.includes(district)  ? "bg-cyan-600 text-white rounded-md " : "border-2 border-black bg-white rounded-md"}`}> { tempDistricts.includes(district) && (<IoMdCheckmark />)}</span>
                                </button>
                                ))
                             ):( 
                                <div className="px-4 py-2 text-gray-400">No districts found</div>
                            )
                        }
                    </div>
                    <div className="flex justify-center gap-2 px-3 py-4">
                        <button onClick={handleCancel}  className="bg-cyan-600 rounded-md text-white py-3  w-full text-xl">Cancel</button>
                        <button onClick={handleOk} className="ok bg-cyan-600 rounded-md text-white py-3  w-full text-xl">Ok</button>
                    </div>
                </motion.div>
            </div>
          )}
        </AnimatePresence>
    );
}
 
export default SelecDistrict;