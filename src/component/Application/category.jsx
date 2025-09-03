import {useTranslation} from "react-i18next";
import {motion, AnimatePresence} from "framer-motion";
import { useState, useEffect } from "react";
const Category = ({isOpen, setCategory, setSelectedCategory}) => {
    const [isVisible, setIsVisible] = useState(false);
    const {t} = useTranslation();
    useEffect(() => {
        if (isOpen) setIsVisible(true);
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setCategory(false);
        }, 300); 
    };


  return (
    <AnimatePresence>
		{isVisible && (
            <div className="fixed inset-0 w-full h-screen bg-black  bg-opacity-60 flex items-end md:pt-0  z-50">
                <motion.div  className="w-full create rounded-tl-md rounded-tr-md bg-white shadow flex flex-col"
                key="category-modal"
                initial={{ maxHeight: 0, opacity: 0 }}
                animate={{ maxHeight: 530, opacity: 1 }}
                exit={{ maxHeight: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }} 
                >
                    <div className=" w-full bg-white dark:bg-[#191919] sticky  z-50 flex flex-col items-center justify-center gap-2 ">
                        <div className="w-10 h-1 bg-black rounded-full mt-7  dark:bg-white"></div>
                        <button onClick={handleClose} className="absolute top-16 left-3 text-cyan-500 text-[18px]" >Back</button>
                        <div className=" flex w-full justify-center mt-5 mb-3 px-2">
                            <p className=" text-[18px] ">Category</p>
                        </div>
                    </div>
                    <div className="w-full max-h-[430px] bg-gray-100 dark:bg-[#191919] overflow-auto  p-2  flex flex-col  items-center gap-2.5">
                        <button className="px-3 py-3 bg-white gap-2.5 rounded-md w-full border-none dark:text-white transition-colors duration-200  dark:bg-[#282828] flex items-center text-[18px] outline-none  shadow "
                        onClick={() => { setSelectedCategory("categoryImageAnimals");  setCategory(false); }}>
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/7968acd8-743b-44c8-aaff-e7f9896125e3_thumbnail.png" alt="button image"/>
                            {t("home.categoryImageAnimals")}
                        </button>
                        <button  className="px-3 py-3 gap-2.5 border-none rounded-md transition-colors duration-200 dark:text-white flex items-center  outline-none bg-white shadow  dark:bg-[#282828]  w-full text-[18px] "
                        onClick={() => { setSelectedCategory("categoryImageFood"); setCategory(false);  }} >
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/f8106745-1da2-4be8-a530-84082d194ca3_thumbnail.png" alt="button image" />
                            {t("home.categoryImageFood")}
                        </button>
                        <button  className="px-3 py-3 rounded-md w-full text-[18px] border-none transition-colors duration-200 dark:text-white flex items-center  outline-none bg-white shadow gap-2.5  dark:bg-[#282828] "
                        onClick={() => { setSelectedCategory("categoryImageClothing"); setCategory(false); }}  >
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/9d6a5ef0-522c-4616-9de0-c9d27f40eb3e_thumbnail.png" alt="button image"/>
                            {t("home.categoryImageClothing")}
                        </button>
                        <button  className="px-3 py-3 rounded-md w-full border-none transition-colors duration-200 dark:text-white flex items-center text-[18px] outline-none bg-white shadow  gap-2.5  dark:bg-[#282828]"
                        onClick={() => { setSelectedCategory("categoryImageJobs"); setCategory(false); }} >
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/0a43ce1b-08a5-4bd1-9b1c-3b93a5e6c520_thumbnail.png" alt="button image" />
                            {t("home.categoryImageJobs")}
                        </button>
                        <button  className="px-3 py-3 rounded-md border-none flex items-center text-[18px] outline-none bg-white shadow  gap-2.5 transition-colors duration-200 dark:text-white   w-full  dark:bg-[#282828]  "
                        onClick={() => { setSelectedCategory("categoryImageServices"); setCategory(false); }} >
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/f921fee2-ec04-4b29-9a02-308de408a493_thumbnail.png" alt="button image"/>
                            {t("home.categoryImageServices")}
                        </button>
                        <button  className="px-3 py-3 rounded-md border-none flex items-center text-[18px] outline-none bg-white shadow  w-full gap-2.5 transition-colors duration-200 dark:text-white   dark:bg-[#282828] "
                            onClick={() => { setSelectedCategory("categoryImageMachinery"); setCategory(false); }}>
                            <img className="w-4 h-4 rounded-full object-cover"src="https://ganjyab.s3.eu-north-1.amazonaws.com/50b9c231-2cec-4b3b-b551-86c1af9bf145_thumbnail.png" alt="button image"/>
                            {t("home.categoryImageMachinery")}
                        </button>
                        <button className="px-3 py-3 rounded-md border-none flex items-center text-[18px] outline-none bg-white shadow  w-full gap-2.5 transition-colors duration-200  dark:text-white  dark:bg-[#282828] "
                        onClick={() => {setSelectedCategory("categoryImageHomeAppliances"); setCategory(false);}}>
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/e802a9db-5d0c-4dbf-9424-ef7d26a02cb4_thumbnail.png" alt="button image"/>
                            {t("home.categoryImageHomeAppliances")}
                        </button>
                        <button  className="px-3 py-3 rounded-md border-none flex items-center text-[18px] outline-none bg-white w-full shadow  gap-2.5 transition-colors duration-200 dark:text-white  dark:bg-[#282828] "
                        onClick={() => {setSelectedCategory("categoryImageVehicles");  setCategory(false);}} >
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/f8fda21c-0070-4206-8a03-80f8dc354586_thumbnail.png" alt="button image" />
                            {t("home.categoryImageVehicles")}
                        </button>
                        <button className="px-3 py-3 rounded-md border-none flex items-center text-[18px] w-full outline-none bg-white shadow  gap-2.5 transition-colors duration-200 dark:text-white  dark:bg-[#282828] "
                            onClick={() => {  setSelectedCategory("categoryImageMobiles");setCategory(false); }}>
                            <img className="w-4 h-4 rounded-full object-cover"     alt="button image" src="https://ganjyab.s3.eu-north-1.amazonaws.com/06bbd819-43b0-4ded-8a71-98b01cd31763_thumbnail.png"/>
                            {t("home.categoryImageMobiles")}
                        </button>
                        <button className="px-3 py-3 rounded-md border-none flex items-center text-[18px] outline-none bg-white w-full shadow  gap-2.5 transition-colors duration-200 dark:text-white  dark:bg-[#282828] "
                        onClick={() => { setSelectedCategory("categoryImageRealEstate"); setCategory(false); }}>
                            <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/7510bd16-e538-42ff-a90a-ad96f33565f2_thumbnail.png" alt="button image"/>
                            {t("home.categoryImageRealEstate")}
                        </button>
                    </div>
                </motion.div>
            </div>
	    )} 
    </AnimatePresence>
  );
};

export default Category;
