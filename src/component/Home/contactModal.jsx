
import { FiX, } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect } from "react";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
export default function ContactModal({ isOpen, onClose, phone, whatsapp, province,  district, region }) {
  if (!isOpen) return null;

    useEffect(() => {
        if (isOpen) {
            // وقتی مودال باز است
            document.body.style.overflow = "hidden";
            return () => {
            // وقتی مودال بسته میشه (unmount)
                document.body.style.overflow = "auto";
             };
      }
    }, [isOpen]);

  return (
    <>
       <div className="fixed inset-0 bg-black bg-opacity-60 flex items-start pt-10 md:pt-0 md:items-center justify-center z-50">
            <div className="bg-white dark:bg-[#1a1a1a] dark:text-white w-[400px] sm:rounded-lg shadow-lg p-5 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 dark:text-gray-300" > <FiX size={20} /> </button>
                <h2 className="text-lg font-bold mb-4 dark:text-white">Contact</h2>
                <div className="flex items-center gap-2 mb-2">
                    < LiaPhoneVolumeSolid  size={20}/> :
                    <p className=" text-blue-600">{phone}</p>        
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <FaWhatsapp  size={20}/> : <p className=" text-blue-600">{whatsapp}</p>
                </div>
                <hr className="border-gray-400 mt-6 h-[3px] dark:text-white" />
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-4 text-sm">
                    <span className="mb-2">{region} {district} {province}</span> 
                </div>
            </div>
        </div>
    </>
);
}