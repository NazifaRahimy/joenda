import { useState, useRef, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import { MdOutlineNightlight, MdMonitor } from "react-icons/md";

const ThemeSelector = () => {
    const [openBox, setOpenBox] = useState(false);// وضعیت باز یا بسته بودن منوی تم
    const [theme, setTheme] = useState("day");// تم انتخاب‌شده فعلی
    const dropdownRef = useRef(null) // رفرنس برای تشخیص کلیک بیرون از باکس
    
    // تعریف تم‌ها همراه با آیکون و برچسب
    const themes = {
        day: {
            label: "روز",
            icon: <WiDaySunny className="ml-2 mt-1 text-2xl font-bold" />,
        },
        night: {
            label: "شب",
            icon: <MdOutlineNightlight className="ml-2 text-2xl" />,
        },
        system: {
            label: "سیستم",
            icon: <MdMonitor className="ml-2 mt-1 text-2xl" />,
        },
    };

     // بستن باکس با کلیک بیرونی
    useEffect(()=> {
        const handleCilckOutSide =(e)=> {
            if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
                setOpenBox(false)
           }
        }
		document.addEventListener("mousedown", handleCilckOutSide);
        return ()=> {
            document.removeEventListener("mousedown", handleCilckOutSide)
        }
   },[])

    
      // خواندن تم از localStorage هنگام mount شدن
    useEffect(()=> {
        const savedItem = localStorage.getItem("theme");
            if(savedItem === "day" || savedItem === "night" || savedItem === "system") {
                setTheme(savedItem);
            } else {
                setTheme("day"); // حالت پیش‌فرض
            }
        }, [])

    // / اعمال تم روی <html> و ذخیره در localStorage
    useEffect(()=>{
        localStorage.setItem("theme", theme)
        if(theme === "night" || theme === "system"){
            document.documentElement.classList.add("dark");
        }else(
            document.documentElement.classList.remove("dark")
        )
    },[theme])
   

  return (
    <div ref={dropdownRef} className="relative flex justify-center">
        <button onClick={() => setOpenBox(!openBox)} className="pr-2 dark:text-white py-1  rounded-md text-3xl font-bold  md:hover:bg-cyan-100 hover:text-cyan-700  dark:hover:bg-cyan-900  ">  {themes[theme]?.icon || themes.day.icon}</button>
        {openBox && (
        <div className="absolute bottom-12 md:top-12 h-[115px] w-32 bg-white border   rounded shadow p-1 z-[1000]  border-cyan-200 dark:border-cyan-300  dark:bg-[#232323] dark:text-white">
            {Object.entries(themes).map(([key, value]) => (
              <div className={` px- py-1  dark:text-white cursor-pointer rounded flex items-center hover:bg-cyan-100 hover:text-cyan-700  dark:hover:bg-cyan-900 gap-1`}
                key={key}onClick={() => { if(themes[key]) setTheme(key); setOpenBox(false) }}>
                    {value.icon}
                    {value.label}
                </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;