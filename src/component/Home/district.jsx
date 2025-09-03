import { useState, useEffect, useRef } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { useTranslation } from "react-i18next";
import locations from "./location";


const Districk = ({ selectedProvince , value, onChange }) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const  dropdownRef = useRef(null)
    const [hovered, setHovered] = useState("");
    const [search, setSearch] = useState("");
    if (!selectedProvince || !locations[selectedProvince]) return null;

    const selectedLocation = locations[selectedProvince];
    const allDistricts = selectedLocation.cityDistricts.concat(selectedLocation.ruralDistricts);
    const selected = value || ""; 
    
    const handleSelect = (location) => {
        setOpen(false);
        setHovered("");
        if (onChange) onChange(location);
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

       const filteredDistricts = allDistricts.filter(district =>
       district.toLowerCase().includes(search.toLowerCase())
    );

    const findDistrictType = (district) => {
        if (selectedLocation.cityDistricts.includes(district)) return "cityDistricts";
        if (selectedLocation.ruralDistricts.includes(district)) return "ruralDistricts";
        return "";
    };

    return ( 
        <div className="button relative w-[80%] md:w-[50%] lg:w-auto flex   dark:bg-[#282828]  ">
            <button onClick={(e) =>{e.preventDefault(); setOpen(!open)}}
            className=" w-full md:w-[200px] rounded-md   dark:bg-[#1a1a1a]  border border-cyan-200  dark:text-white dark:hover:bg-cyan-900  transition-colors duration-200  hover:text-cyan-700 dark:border-cyan-300 h-9 flex items-center justify-between px-4  hover:bg-cyan-100 ">
                <span><span>{selected || t("district.chooseDistrict")}</span></span>
                <MdOutlineExpandMore className="text-xl" />
            </button>
            {  open &&   (
                <div ref={dropdownRef}  className={`absolute  bottom-12 dark:border-cyan-300    dark:bg-[#1a1a1a]   transition-colors duration-200  w-[290px]  md:w-[300px] border border-cyan-200 rounded-md shadow-lg z-50 bg-white`}>
                    <input type="text"    placeholder="search" value={search}     onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-2 py-2 text-black  dark:text-white   dark:bg-[#1a1a1a]  dark:border-cyan-300 rounded-t-md placeholder-gray-500 outline-none border-b border-cyan-200"/>
                    <div className="max-h-[220px] overflow-y-auto dark:bg-[#1a1a1a] scroll-dark">
                        {filteredDistricts.length > 0 ? (
                            filteredDistricts.map((district, i) => (
                                <div key={i} onMouseEnter={() => setHovered(district)} onClick={() => handleSelect(district)}
                                className={`px-2 py-1 m-1 rounded-md cursor-pointer ${hovered === district ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-white"  : "dark:text-white"}`}>
                                    {t(`district.${selectedProvince}.${findDistrictType(district)}.${district}`, district)}
                                </div>
                            ))
                        ):
                        (
                            <div className="px-4 py-2 text-gray-400">No results</div>
                        )}
                    </div>
                </div>
                )
            }
        </div>
    );
}
 
export default Districk;



