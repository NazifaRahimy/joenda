import { useState, useEffect, useRef } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { useTranslation } from "react-i18next";
    const provinces = [
        "Kabul", "Herat", "Kandahar", "Balkh", "Nangarhar", "Bamyan", "Badakhshan",
        "Ghazni", "Paktia", "Paktika", "Khost", "Farah", "Faryab", "Jawzjan",
        "Takhar", "Kunduz", "Daykundi", "Oruzgan", "Maidan Wardak", "Logar",
        "Laghman", "Nuristan", "Kunar", "Kapisa", "Samangan", "Sar-e Pol",
        "Ghor", "Nimroz", "Zabul", "Helmand", "Badghis", "Baghlan", "Panjshir", "Parwan"
    ];

    export default function ProvinceDropdown({ value, onChange, positionClass,  onSelectProvince }) {
        const [open, setOpen] = useState(false);
        const [search, setSearch] = useState("");
        const dropdownRef = useRef(null);
        const [hovered, setHovered] = useState("");
        const { t } = useTranslation();
        const selected = value || "";

        const filteredProvinces = provinces.filter(province =>
            t(`home.provinceDropdown.${province}`).toLowerCase().includes(search.toLowerCase())
            // province.toLowerCase().includes(search.toLowerCase())
        );

        const handleSelect = (province) => {
            setOpen(false);
            setSearch("");
            setHovered("");
            if (onChange) {
                onChange(province);  
            }
            if (onSelectProvince) {
                onSelectProvince(province); 
           }
        };

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                     setOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        useEffect(() => {
        if (!open) {
            setHovered(""); 
        }
        }, [open]);

        return (
        <div ref={dropdownRef} className="button relative w-[80%] md:w-[50%] lg:w-auto flex   dark:bg-[#282828]  ">
            <button onClick={(e) =>{e.preventDefault(); setOpen(!open)}}
            className=" w-full md:w-[200px] rounded-md   dark:bg-[#1a1a1a]  border border-cyan-200  dark:text-white dark:hover:bg-cyan-900  transition-colors duration-200  hover:text-cyan-700 dark:border-cyan-300 h-9 flex items-center justify-between px-4  hover:bg-cyan-100 ">
                <span>{selected ? t(`home.provinceDropdown.${selected}`) : t("home.provinceDropdown.select")}</span>
                <MdOutlineExpandMore className="text-xl" />
            </button>
            {open && (
                <div className={`absolute ${positionClass} dark:border-cyan-300    dark:bg-[#1a1a1a]   transition-colors duration-200  w-[290px]  md:w-[300px] border border-cyan-200 rounded-md shadow-lg z-50 bg-white`}>
                    <input type="text"    value={search}     onChange={(e) => setSearch(e.target.value)} placeholder={t("home.provinceDropdown.search_placeholder")}
                    className="w-full px-2 py-2 text-black  dark:text-white   dark:bg-[#1a1a1a]  dark:border-cyan-300 rounded-t-md placeholder-gray-500 outline-none border-b border-cyan-200"/>
                    <div className="max-h-[220px] overflow-y-auto dark:bg-[#1a1a1a] scroll-dark">
                        {filteredProvinces.length > 0 ? (
                            filteredProvinces.map((province, index) => (
                                <div key={index} onMouseEnter={() => setHovered(province)} onClick={() => handleSelect(province)}
                                className={` px-2 py-1 m-1 rounded-md cursor-pointer ${hovered === province  ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-white"  : "dark:text-white"} `} >
                                    {t(`home.provinceDropdown.${province}`)}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-400">{t("home.provinceDropdown.no_results")}</div>
                        )}
                    </div>
                </div>
            )}
		</div>
    );
}