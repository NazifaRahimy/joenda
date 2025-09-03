import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import SelecProvince from "./selectProvince";
import Category from "./category";
import Sort from "./sort";
import { useTranslation } from "react-i18next";
import { AiOutlineClose } from "react-icons/ai";
import { useContext } from "react";
import { FilterContext } from "../Home/filterContaxt";

const Filters = ({setFilter})=> {
    const [area, setArea] = useState(false);
    const [category, setCategory] = useState(false);
    const [selectSort, setSelecSort] = useState("Descending");
    const [sort, setSort] = useState(false);
    const { t } = useTranslation();
    const {
        areaText,
        selectedCategory,
        setSelectedCategory,
        selectedProvince,
        setSelectedProvince,
        selectedDistricts,
        setSelectedDistricts,
    } = useContext(FilterContext);

    const [localFilters, setLocalFilters] = useState({
        category: selectedCategory || "",
        province: selectedProvince || "",
        districts: selectedDistricts || [],
        minPrice: "",
        maxPrice: "",
        sort: selectSort || "Descending"
    });

    const handleApply = () => {
        setSelectedCategory(localFilters.category);
        setSelectedProvince(localFilters.province);
        setSelectedDistricts(localFilters.districts);
        setSelecSort(localFilters.sort);
        setFilter(false); 
    };

    const handleReset = () => {
        setLocalFilters({
            category: "",
            province: "",
            districts: [],
            sort: "Descending" 
        });
        setSelectedProvince("");
        setSelectedDistricts([]);
    };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-[#191919] dark:border dark:border-[#282828] px-6 py-5 rounded-xl w-full max-w-md shadow-lg relative">
            <div className="relative border-b border-b-gray-300 pb-5">
                <p className="text-[22px] font-semibold text-center w-full">Filters</p>
            </div>
            <button onClick={() => setFilter(false)}  className="absolute top-6 right-8 text-red-500 "><IoCloseSharp size={30} /></button>
            <div className="flex flex-col w-full mt-5">
                <label className="text-xl font-normal">Sort</label>
                <button type="button" onClick={() => setSort(true)} className="rounded-md border border-gray-400 mt-1 text-left px-3 py-3" >{localFilters.sort} </button>
            </div>
            <form className="flex flex-col w-full mt-5">
                <div className="flex flex-col w-full mt-4">
                    <label className="text-xl font-normal">Area</label>
                    <button  type="button" onClick={() => setArea(!area)}  className="rounded-md border border-gray-400 mt-1 text-left px-3 h-12 outline-none flex items-center justify-between">
                    {areaText || ""}
                    {areaText && (
                        <span   className="ml-2 text-orange-600 cursor-pointer"
                            onClick={(e) => {
                            e.stopPropagation();
                            setLocalFilters((prev) => ({ ...prev, province: "", districts: []}));
                            setSelectedProvince("");   
                            setSelectedDistricts([]);  
                            }} 
                        >
                            <AiOutlineClose size={20} />
                        </span>
                    )}
                    </button>
                </div>
                <div className="flex flex-col w-full mt-4">
                    <label className="text-xl font-normal">Category</label>
                    <button  className="category rounded-md border border-gray-400 mt-1 text-left px-3 h-12 outline-none flex items-center justify-between"
                    type="button" onClick={() => setCategory(!category)} >
                        {localFilters.category ? t(`home.${localFilters.category}`) : ""}
                        {localFilters.category && (
                        <span  className="ml-2 text-orange-600 cursor-pointer"
                         onClick={(e) => {
                            e.stopPropagation();
                            setLocalFilters((prev) => ({ ...prev, category: "" }));
                        }}
                        >
                            <AiOutlineClose size={20} />
                        </span>
                       )}
                    </button>
                </div>
                <div className="flex flex-col w-full mt-4">
                    <label className="text-xl font-normal">Minimum price</label>
                    <input    className="rounded-md dark:bg-[#191919] border border-gray-400 mt-1 text-left px-3 h-12 outline-none flex items-center"
                    type="text" placeholder="50 AFN" value={localFilters.minPrice}
                    onChange={(e) => setLocalFilters((prev) => ({ ...prev, minPrice: e.target.value })) }
                    />
                </div>
                <div className="flex flex-col w-full mt-4">
                    <label className="text-xl font-normal">Maximum price</label>
                    <input type="text" placeholder="99,000" value={localFilters.maxPrice} onChange={(e) => setLocalFilters((prev) => ({ ...prev, maxPrice: e.target.value })) }
                    className="rounded-md border dark:bg-[#191919] border-gray-400 mt-1 text-left px-3 h-12 outline-none flex items-center"/>
                </div>
                <div className="w-full flex items-center justify-center mt-4 gap-6">
                    <button type="button" onClick={handleReset} className="px-8 py-3 bg-cyan-600 text-white outline-none border-none rounded-md text-xl"> Reset</button>
                    <button type="button" onClick={handleApply} className="px-8 py-3 bg-cyan-600 text-white outline-none border-none rounded-md text-xl">  Apply</button>
                </div>
            </form>
            {sort && ( <Sort setSort={setSort} selectSort={localFilters.sort}  setSelecSort={(val) => setLocalFilters((prev) => ({ ...prev, sort: val }))  } />  )}
            {area && (
                <SelecProvince area={area}
                onClose={()=>setArea(!area)}
                selectedProvince={localFilters.province}
                setSelectedProvince={(val) =>
                    setLocalFilters((prev) => ({ ...prev, province: val }))
                }
                selectedDistricts={localFilters.districts}
                setSelectedDistricts={(val) =>
                setLocalFilters((prev) => ({ ...prev, districts: val }))
            }
//  setSelectedProvinceLocal={(val) => setLocalFilters(prev => ({ ...prev, province: val }))}
//   setSelectedDistrictsLocal={(val) => setLocalFilters(prev => ({ ...prev, districts: val }))}
            />
            )}
            
            {category && ( <Category isOpen={category} setSelectedCategory={(val) => setLocalFilters((prev) => ({ ...prev, category: val })) } setCategory={setCategory}  /> )}
    </div>
    </div>
  );
};

export default Filters;
