import { GrLanguage } from "react-icons/gr";
import { useState, useEffect, useRef } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { useTranslation } from "react-i18next";
const Languages = () => {
    const [openBox, setOpenBox] = useState(false);
    const { i18n } = useTranslation();
    const dropdownRef = useRef(null);
    const languageMap = {
        en: "English",
        fa: "فارسی",
        ps: "پشتو"
    };
    const [selectedLang, setSelectedLang] = useState(languageMap[i18n.language] || "English");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenBox(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setSelectedLang(languageMap[i18n.language] || "English");
    }, [i18n.language]);

    const handleLanguageChange = (lang) => {
        setSelectedLang(lang);
        setOpenBox(false);
        if (lang === "English") {
            i18n.changeLanguage("en");
        } else if (lang === "فارسی") {
            i18n.changeLanguage("fa");
        } else if (lang === "پشتو") {
            i18n.changeLanguage("ps");
        };
    }
    return (
    <div ref={dropdownRef} className="languages relative flex justify-center">
        <button  className="flex items-center px-3 py-1 dark:border  dark:text-white border rounded   border-cyan-200 dark:border-cyan-300 hover:bg-cyan-100 hover:text-cyan-700  dark:hover:bg-cyan-900 gap-1"
        onClick={() => setOpenBox(!openBox)}>
            <GrLanguage />
            <span className="ml-3">{selectedLang}</span>
        </button>

        {openBox && (
        <div className="absolute bottom-12  md:top-12 h-[115px] w-32 bg-white z-[1000] border  border-cyan-200 rounded shadow p-1  dark:border-cyan-300  dark:bg-[#232323] dark:text-white ">
            {Object.values(languageMap).map((lang) => (
                <div key={lang} onClick={() => handleLanguageChange(lang)}
                className="px-2 py-1 cursor-pointer mt-1  rounded-md flex justify-between items-center   hover:bg-cyan-100 hover:text-cyan-700  dark:hover:bg-cyan-900">
                    <span>{lang}</span>
                    {selectedLang === lang && <IoMdCheckmark />}
                </div>
            ))}
        </div>
       )}
    </div>
  );
};


export default Languages;
