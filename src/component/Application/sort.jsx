import {  useEffect, useRef} from "react";
const sorts = ["Ascending", "Descending"];

const Sort = ({ selectSort, setSelecSort, setSort }) => {
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setSort(false)
           }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

	return (
        <div className="fixed inset-0  bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div ref={dropdownRef} className="relative bg-white dark:bg-[#101010] dark:border dark:border-[#282828] px-6 py-5 rounded-3xl w-80 shadow-lg z-10">
                <h2 className="text-center text-xl font-semibold mb-4">Sort</h2>
                <div className="flex flex-col gap-3">
                    {sorts.map((option) => (
                        <button  className={`flex items-center gap-3 px-3 py-2 text-lg rounded-md `}   onClick={() =>{setSelecSort(option); setSort(false) }}
                        key={option} type="button">
                            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${ selectSort === option ? "border-cyan-600" : "border-gray-400"}`}  >
                                {selectSort === option && (<div className="w-3 h-3 rounded-full bg-cyan-600"></div>)}
                            </div>
                            {option}
                       </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default Sort;
