import useMobile from "./useMobile";
import {useEffect, useState, useRef} from "react";
import LoginModal from "./NavBar/Login";
import Login from "./Application/login";
import PageTitle from "./pagetitle";
import ImageUploader from "./imageUplodar";
import {LuListPlus, LuQuote, LuRedo, LuUndo} from "react-icons/lu";
import {IoCloseSharp} from "react-icons/io5";
import {CiCircleInfo} from "react-icons/ci";
import {FaBold, FaItalic, FaCheck} from "react-icons/fa6";
import {RiListOrdered2} from "react-icons/ri";
import {RiExpandUpDownLine} from "react-icons/ri";
import {GrLanguage} from "react-icons/gr";
import {IoIosAdd} from "react-icons/io";
import ProvinceDropdown from "./Home/ProvinceDropdown";
import {useTranslation} from "react-i18next";
import Districk from "./Home/district";
import {useNavigate} from "react-router-dom";

function CreateAd() {
    const {t} = useTranslation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [openCreateAd, setOpenCreateAd] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const options = ["currencyUSD", "currencyAFN"];
    const [selectedProvince, setSelectedProvince] = useState("");
    const navigate = useNavigate();
    const isMobile = useMobile();
    const categories = [
        "categoryImageAnimals",
        "categoryImageFood",
        "categoryImageClothing",
        "categoryImageJobs",
        "categoryImageServices",
        "categoryImageMachinery",
        "categoryImageHomeAppliances",
        "categoryImageVehicles",
        "categoryImageMobiles",
        "categoryImageRealEstate",
    ];


    const dropdownRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [adData, setAdData] = useState({
        product: "",
        description: "",
        category: "",
        price: "",
        phoneNumber: "",
        whatsappNumber: "",
        province: "",
        district: "",
        region: "",
        images: [],
        currency: localStorage.getItem("selected-currency") || "currencyAFN",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAdData((prevData) => ({
          ...prevData, [name]: value,}));
    };


    useEffect(() => {
        localStorage.setItem("selected-currency", adData.currency);
     }, [adData.currency]);

     // بستن باکس با کلیک بیرونی
    useEffect(() => {
        const handleCilckOutSide = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleCilckOutSide);
        return () => {
            document.removeEventListener("mousedown", handleCilckOutSide);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("auth-token");
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoginModalOpen(true);
        }
        setHasCheckedAuth(true);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
          const formData = new FormData();
        try {
            formData.append("product", adData.product);
            formData.append("description", adData.description);
            formData.append("category", adData.category);
            formData.append("price", adData.price);
            formData.append("phoneNumber", adData.phoneNumber);
            formData.append("whatsappNumber", adData.whatsappNumber);
            formData.append("province", adData.province);
            formData.append("district", adData.district);
            formData.append("region", adData.region);
            formData.append("currency", adData.currency);
             // اضافه کردن عکس‌ها (اینجا باید فقط فایل‌ها را بفرستی)
            adData.images.forEach((imageObj) => {
                formData.append("images", imageObj.file);
            });
            // const response = await fetch("http://localhost:3001/ads", {
            const response = await fetch("https://joyenda-server.onrender.com/ads", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                alert(t("create.adSavedSuccess"));
                setAdData({
                    product: "",
                    description: "",
                    category: "",
                    price: "",
                    phoneNumber: "",
                    whatsappNumber: "",
                    province: "",
                    district: "",
                    region: "",
                    images: [],
                    currency: localStorage.getItem("selected-currency") || "currencyAFN",
                });
                navigate("/")
                console.log("successful");
            } else {
                 console.log("please try again");
            }
        } catch (error) {
            console.error("Error submitting ad:", error);
            alert(t("create.Error"));
        }
    };

    if (!isLoggedIn) {
        if (!hasCheckedAuth) return null;
        // فقط مودال لاگین را نمایش بده
        return (
        <>
            <PageTitle title="pages.favorites" />
            {isMobile ? ( <Login />): ( <LoginModal isOpen={isLoginModalOpen} onClose={() => { setIsLoginModalOpen(false); navigate("/");}}  initialForm="login"/>)}
            
        </>
        );
    }
     
	// اگر لاگین بود:
    return (
    <>
        <PageTitle title="pages.favorites" />
        {openCreateAd && (
            <div className="fixed inset-0 flex items-start justify-start  bg-black bg-opacity-60 z-50">
                <div className="w-[600px] max-h-[100vh] relative mx-auto dark:bg-[#121212] dark:text-white bg-white rounded-md p-5  overflow-y-auto">
                <button onClick={() => { setOpenCreateAd(!openCreateAd);  navigate("/"); }}
                className={`text-xl border-none outline-none absolute top-4   ${ document.documentElement.dir === "rtl" ? "left-3" : "right-3" } text-gray-300 hover:text-black transition-all duration-300`}>
                    <IoCloseSharp />
                </button>
                <div className="flex flex-col">
                    <h2 className="text-xl mb-1 font-bold">{t("create.createAd")}</h2>
                    <p className="text-gray-400">{t("create.createAdSubtitle")}</p>
                    <ImageUploader images={adData.images}
                        onChange={(newImages) =>
                            setAdData((prev) => ({...prev, images: newImages}))
                        } />
                        <form onSubmit={handleSubmit} className="flex flex-col mt-3">
                            <div className="title flex flex-col w-full">
                                <label className={` dark:text-white ${ adData.product.length > 0 && adData.product.length < 5  ? "text-red-600"  : "text-black"  }`}>      {t("create.adTitle")} * </label>
                                <input className="placeholder:text-sm dark:bg-[#282828]  focus:ring-1 focus:ring-cyan-500 rounded mt-4 px-4 py-2 shadow focus:outline-none"
                                    type="text"
                                    name="product"
                                    placeholder={t("create.adTitlePlaceholder")}
                                    value={adData.product}
                                    onChange={handleChange}
                                />
                                {adData.product.length > 0 && adData.product.length < 5 && (<p className="mt-2 text-red-600 text-[14px]"> {t("create.adTitleNote")} </p> )}
                            </div>
                            <div className="description flex flex-col w-full ">
                                <label  className="my-2">  {t("create.adDescription")} </label>
                                <div className="w-full h-atuo border border-cyan-200 px-2 dark:bg-[#121212]">
                                    <div className="icon flex gap-2 flex-wrap   pt-2 ">
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-2  px-3 rounded-md "><FaBold /></button>
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-1  px-3 rounded-md "> <FaItalic /> </button>
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-1  px-3 rounded-md ">  <LuListPlus /></button>
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-1  px-3 rounded-md "> <RiListOrdered2 /> </button>
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-1  px-3 rounded-md "> <LuQuote /> </button>
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-1  px-3 rounded-md ">   - </button>
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-1  px-3 rounded-md "> <LuUndo /></button>
                                        <button className="hover:bg-cyan-200 hover:text-cyan-700  py-1  px-3 rounded-md ">  <LuRedo /></button>
                                    </div>
                                    <textarea name="description" value={adData.description} 
                                     onChange={handleChange}rows={5}  type="text"
					                className="w-full p-3 resize-none dark:bg-[#121212]" ></textarea>
                                </div>
                            </div>
                            <p className="category_title my-3">  {t("create.categoriesLabel")}*</p>
                            <div className=" category w-full h-auto border border-cyan-200 p-3">
                                <div className="flex items-center gap-4 w-full">
                                    <div className="flex-1 border-t "></div>
                                    <p className="text-center text-gray-500 whitespace-nowrap"> {t("create.categoriesHint")} </p>
                                    <div className="flex-1 border-t "></div>
                                </div>
                                <div className="flex flex-wrap gap-3 pt-2">
                                {categories.map((category, index) => (
                                    <button  className="bg-cyan-600 px-5 py-1.5 transition-all duration-300 hover:bg-cyan-500 text-[14px] text-white rounded-full outline-none border-none"
									key={index}
                                    onClick={(e) => {
                                        e.preventDefault(); 
                                        setAdData((prev) => {
                                            const newAdData = {
                                                ...prev,category: categories[index],
                                            };
                                            return newAdData;
                                        });
                                    }}
                                    > {t(`create.${category}`)}</button>
                                ))}
                                </div>
                            </div>
                            <div className=" flex flex-col md:flex-row mt-3 gap-2 w-full">
                                <div className="price flex flex-col w-[100%]">
                                    <label> {t("create.priceLabel")}<span className="text-red-300">*</span></label>
                                    <input type="text" placeholder="0.00"  className="w-full focus:ring-1 focus:ring-cyan-500 dark:bg-[#282828] mt-2 shadow rounded px-3 py-1 outline-none"
									    onChange={handleChange}
                                        value={adData.price}
                                        name="price"
                                    />
                                </div>
                                <div  ref={dropdownRef}  className="currency flex flex-col w-[100%]">
                                    <label>{t("create.currencyLabel")}</label>
                                    <button onClick={(e) => { e.preventDefault(); setOpen(!open);  }} className="w-full dark:bg-[#282828] button my-2 px-5 py-1 shadow rounded flex justify-between items-center" >
                                        <p> {t(`create.${adData.currency}`)}</p> 
										<span className="text-gray-400"> <RiExpandUpDownLine /> </span>
                                    </button>
                                    {open && (
                                        <div className="border dark:bg-[#282828] border-cyan-200 flex flex-col p-1 rounded-md ">
                                        {options.map((option) => (
                                            <button  className="hover:bg-cyan-200  dark:hover:bg-cyan-700 dark:hover:text-white hover:text-cyan-700 transition-all duration-300 w-full px-2 py-1 cursor-pointer rounded-md mb-1 justify-between flex items-center"
                                                key={option}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setAdData((prev) => ({ ...prev,  currency: option,})); // فقط کلید ذخیره میشه
                                                    localStorage.setItem( "selected-currency", option  );
                                                }}
                                            >    
											    <span>{t(`create.${option}`)}</span>
                                                {adData.currency === option && <FaCheck />}
                                            </button>
                                        ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className=" flex flex-col">
                                <div className="flex items-center gap-4 w-full my-6">
                                    <div className="flex-1 border-t "></div>
                                    <p className="text-center text-gray-500 whitespace-nowrap">{t("create.moreDetailsLabel")}</p>
                                    <div className="flex-1 border-t "></div>
                                </div>
                                <div className="flex gap-2 flex-col md:flex-row">
                                    <div className=" flex flex-col w-full relative gap-1">
                                        <label className="text-[12px] md:text-[16px]">{t("create.phoneNumberLabel")}</label>
                                        <div className="relative">
                                            <span  className={`absolute top-2.5  ${ document.documentElement.dir === "rtl"  ? "right-2" :  "left-2"  } `}>
                                                <GrLanguage />
                                            </span>
                                            <input type="text"
											    className="h-9 w-full rounded-md shadow border px-8 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-none dark:bg-[#282828]"
                                                name="phoneNumber"
                                                value={adData.phoneNumber}
                                                onChange={handleChange}
                                                placeholder="07******"
											/>
                                                {adData.phoneNumber.length > 0 &&  adData.phoneNumber.length < 5 && ( <p className="text-red-500 text-xs mt-1 ml-2">  {t("create.phoneNumberInvalid")} </p>  )}
                                        </div>
                                    </div>
                                    <div className=" flex flex-col w-full relative gap-1">
                                        <label className="flex justify-between mt-2 md:mt-0 text-[12px] md:text-[16px] ">
                                            {t("create.whatsappNumberLabel")}
                                            {adData.phoneNumber.length > 0 && (
                                                <span className="text-[12px] text-red-400 hover:underline flex gap-1  items-center">
                                                    <span>{t("create.sameAsPhone")} </span>
                                                    <span>  <CiCircleInfo /> </span>
                                            </span>
                                            )}
                                        </label>
                                        <div className="relative">
                                            <span className={`absolute  top-2.5  ${ document.documentElement.dir === "rtl" ? "right-2" : "left-2" }`} ><GrLanguage /></span>
                                            <input
                                            onChange={handleChange}
                                            type="text"
                                            value={adData.whatsappNumber}
                                            name="whatsappNumber"
                                            placeholder="07******"
                                            className="h-9 w-full rounded-md shadow border px-8 py-1 outline-none focus:ring-1 focus:ring-cyan-500 dark:border-none dark:bg-[#282828]"
                                            />                    
                                            {adData.whatsappNumber.length > 0 &&  adData.whatsappNumber.length < 5 &&
											    (<p className="text-red-500 text-xs mt-1 ml-2">  {t("create.phoneNumberInvalid")} </p> )}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full border-b pb-3 border-cyan-200 gap-1 flex-col md:flex-row ">
                                    <div className="province mt-3 flex flex-col w-full  md:w-1/3   ">
                                        <label className="mb-3"> {t("create.provinceLabel")} <span className="text-red-500 ">*</span></label>
                                        <ProvinceDropdown
                                            value={adData.province}
                                            onChange={(val) =>
                                                setAdData((prev) => ({...prev, province: val}))
                                            }
                                            positionClass="bottom-11"
                                            onSelectProvince={(province) =>
                                                setSelectedProvince(province)
                                            }
                                        />
                                    </div>
                                    {selectedProvince && (
                                       <div className=" flex flex-col w-full md:w-1/3 ">
                                            <label className="my-3 text-[12px] md:text-[16px]">  {t("district.title")}  </label>
                                            <Districk  value={adData.district}
                                            selectedProvince={selectedProvince}
                                            onChange={(district) =>
                                                setAdData((prev) => ({...prev, district}))
                                             }
                                            />
                                       </div>
                                    )}
                                    <div className="flex flex-col w-full md:w-1/3 ">
                                        <label  className="my-3 "> {t("create.regionLabel")} </label>
                                        <input  className="shadow py-1 px-3 rounded outline-none focus:ring-1 focus:ring-cyan-300 w-auto dark:bg-[#282828] "
                                         type="text"
                                         value={adData.region}
                                         name="region"
                                         onChange={handleChange}
                                         placeholder={t("create.regionPlaceholder")}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="my-6 flex justify-end  w-full ">
                                <button type="submit" className="px-3 py-2 w-full flex justify-center items-center gap-2 rounded-md outline-none border-none bg-cyan-600 text-white md:w-[150px]">
                                    <span> <IoIosAdd size={20} /> </span>
                                    <span>{t("create.submitButton")}</span>
                                </button>
                            </div>
                        </form>
               </div>
            </div>
        </div>
      )}
    </>
  );
}

export default CreateAd;
