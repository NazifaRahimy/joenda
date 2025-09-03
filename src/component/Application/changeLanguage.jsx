import Flag from 'react-world-flags';
import {  IoArrowBack } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useState , useEffect} from 'react';
const ChangeLanguage = ({ setOpenLanguage , onSelectLanguage}) => {
    const { i18n } = useTranslation();
    const languageMap = [ { label: "دری", code: "AF", lng: "fa" },{ label: "English", code: "US", lng: "en" }, { label: "پشتو", code: "AF", lng: "ps" },];
    const [selectedLang, setSelectedLang] = useState( languageMap.find(lang => lang.lng === i18n.language) || languageMap[1]);

    useEffect(() => {
        const lang = languageMap.find(lang => lang.lng === i18n.language);
        if (lang) setSelectedLang(lang);
    }, [i18n.language]);

    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        i18n.changeLanguage(lang.lng);
        if (onSelectLanguage) onSelectLanguage(lang.label);
    };

   return (
    <div className="fixed inset-0 flex md:pt-0 z-50">
        <div className="w-full h-screen create bg-white shadow overflow-hidden flex flex-col">
            <div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500 dark:bg-[#121212] dark:text-cyan-600">
                <button onClick={() => setOpenLanguage(false)} className={`text-[18px] absolute ${document.documentElement.dir === "rtl"? "right-3 rotate-180" : "left-2"} top-8 `}>
                    <IoArrowBack size={25} />
                </button>
                <div className="flex items-center justify-center w-full">
                    <p className="text-[20px] font-semibold tracking-wide">Change Language</p>
                </div>
            </div>
            <div className="w-full bg-gray-100 h-screen p-2 flex flex-col items-center gap-2.5  dark:bg-[#232323]">
               {languageMap.map((lang) => (
                   <button  className={`px-4 h-auto py-3 mt-3 bg-white dark:bg-[#191919] rounded-md w-full text-xl flex justify-between items-center shadow ${selectedLang?.lng === lang.lng ? "text-blue-600" : "black"} `}
			        key={lang.label}onClick={() => handleLanguageChange(lang)} >
                        <div className="flex items-center gap-4">
                            <Flag code={lang.code} style={{ width: 28, height: 24 }} />
                            <span>{lang.label}</span>
                        </div>
                        {selectedLang?.lng === lang.lng && ( <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white"> < IoMdCheckmark  size={20}/> </span>)}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );
};

export default ChangeLanguage;
