import { createContext, useState } from "react";
export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistricts, setSelectedDistricts] = useState([]);

    const areaText = selectedDistricts.length > 0 
       ? selectedDistricts.join(", ") 
        : selectedProvince ;
    return (
     <FilterContext.Provider
       value={{
        areaText,
        selectedCategory,
        setSelectedCategory,

        selectedProvince,
        setSelectedProvince,
        selectedDistricts,
        setSelectedDistricts,
        }}
    >
        {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider
