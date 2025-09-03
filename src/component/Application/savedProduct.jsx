import { useNavigate } from "react-router-dom";
import {  IoArrowBack } from "react-icons/io5";
const SavedProduct = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed top-0 left-0 bg-white w-full h-screen flex items-start  md:items-center justify-center z-[1000]">
            <div className="bg-gray-100     dark:bg-[#232323] dark:text-cyan-600     w-full h-screen shadow-lg relative">
                <div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500 dark:bg-[#121212]">
                    <button onClick={() => navigate(-1)} className={`back text-[18px] absolute ${document.documentElement.dir === "rtl"? "right-3 rotate-180" : "left-2"} top-8 `}>
                        <IoArrowBack size={25} />
                    </button>
                    <div className="flex items-center justify-center w-full">
                        <p className="text-[20px] font-semibold tracking-wide">Saved Products</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SavedProduct;