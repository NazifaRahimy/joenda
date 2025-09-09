import { HiOutlinePhotograph } from "react-icons/hi";
import { FiUser, FiPhone, FiHeart } from "react-icons/fi";
import React, { useState, useEffect, useContext } from 'react';
import PageTitle from "../pagetitle";
import ScrollToTopButton from "../bottomToTob";
import ProvinceDropdown from "./ProvinceDropdown";
import ContactModal from "./contactModal";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LoginModal from "../NavBar/Login";
import { LuBadgeCheck } from "react-icons/lu";
import ModifyAccount from "./modifyAccount";
import getCurrencySymbol from "./currencyUtils";
import { AiOutlineAppstore , AiOutlineClose } from "react-icons/ai";
import SelecProvince from "../Application/selectProvince";
import { FilterContext } from "./filterContaxt";
import Category from "../Application/category";
import Filters from "../Application/filter";

function HomePage({ addToFavorites, IsLoggedIn, setIsLoggedIn }) {
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState(false);
    const [area, setArea] = useState(false);
    const [category, setCategory] = useState(false);
    const [modifyAccount, setModifyAccount] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
	const { t } = useTranslation();
    const [tick, setTick] = useState(0); 

    const timeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);
        const diff = now - past;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (seconds < 60) return t('home.time.justNow');
        if (minutes < 60) return t('home.time.minutesAgo', { count: minutes });
        if (hours < 24) return t('home.time.hoursAgo', { count: hours });
        return t('time.daysAgo', { count: days });
    };


    useEffect(() => {
        const interval = setInterval(() => {
            setTick(prev => prev + 1); 
        }, 60000); 
        return () => clearInterval(interval);
    }, []);

    const {
        areaText,
        selectedCategory,
        setSelectedCategory,
        selectedProvince,
        setSelectedProvince,
        selectedDistricts,
        setSelectedDistricts,
    } = useContext(FilterContext);

	useEffect(() => {
        // fetch("http://localhost:3001/ads")
        fetch("https://joyenda-server.onrender.com/ads")
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            setAds(data.ads);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching ads:", err);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const filteredProducts = ads.filter(product => {
        const matchesProvince = selectedProvince  ? product.province?.toLowerCase() === selectedProvince.toLowerCase() : true;
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
 
        const matchesSearch = search
        ? product.product?.toLowerCase().includes(search.toLowerCase()) ||
        t(`create.${product.category}`).toLowerCase().includes(search.toLowerCase()) ||
        product.province?.toLowerCase().includes(search.toLowerCase())
        : true;
        return matchesProvince && matchesCategory && matchesSearch;
    });

    const handleAddToFavorites = (product) => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            setIsLoginOpen(true);
            return;
        }
        addToFavorites(product);
    };
    const token = localStorage.getItem("auth-token");
    const name = localStorage.getItem("auth-name");

    const loggedIn = !!token;
 
    return (
        <div className="md:px-2 bg-gray-50 md:bg-transparent">
            <PageTitle title="pages.home" />
            {loggedIn && (
                <div className="hidden md:block w-full h-auto bg-yellow-100 border border-cyan-700 rounded-md my-10 px-4 py-2 dark:border-cyan-300">
                    <p className="text-cyan-700 text-xl ">{t('home.user')} {name}</p>
                    <div className="flex justify-between text-cyan-700 text-lg">
                        <p>{t("home.pagharaph")}</p>
                        <button onClick={() => setModifyAccount(!modifyAccount)} className="click outline-none border-none flex items-center gap-5 bg-cyan-600 hover:bg-cyan-500 text-white px-12 py-1 rounded-md">
                            <span><LuBadgeCheck /></span> Click to Complate
                        </button>
                    </div>
                </div>
            )}
            {modifyAccount && <ModifyAccount isOpen={modifyAccount} onClose={() => setModifyAccount(false)} />}
            {/* for DesTop */}
            <div className={`hidden md:block w-full max-w-[100%] md:py-2 bg-white dark:bg-[#1a1a1a] ${isScrolled ? 'fixed right-0 top-0 left-0 mt-0 z-40' : 'relative mt-0 md:mt-1'}`}>
                <div className="div1 bg-white relative w-full md:border  dark:bg-[#1a1a1a] md:border-cyan-200 h-auto rounded-md dark:border-cyan-300">
                    <div className="w-full md:h-auto md:bg-transparent flex flex-col md:flex-row justify-between p-2 gap-2">
                        <div className="w-full md:w-[70%] px-3 md:px-0">
                            <input type="text" value={search} name="search" onChange={(e) => setSearch(e.target.value)}
                            className="w-full dark:bg-[#282828] h-9 px-3 py-2 md:py-1 rounded-full md:rounded-md outline-none shadow-[0px_0px_3px_rgba(0,0,0,0.1)] text-sm focus:ring-1 focus:ring-cyan-500 md:mt-0 border border-gray-400 md:border-none" placeholder={t("home.search_placeholder")}/>
                        </div>
                        <div className="w-full md:w-[30%] md:flex gap-2">
                            <div className="flex md:hidden"></div>
                            <ProvinceDropdown   onSelectProvince={(province) => setSelectedProvince(province)} />
						</div>
                    </div>
                    <div className="button mt-2.5 flex flex-wrap items-center gap-2.5 pb-2 px-2">
                        <button onClick={()=> setSelectedCategory("categoryImageAnimals")} className="px-3 gap-2.5 rounded-full border dark:text-white transition-colors duration-200 hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 flex items-center text-xs outline-none h-8 shadow-md"><img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/7968acd8-743b-44c8-aaff-e7f9896125e3_thumbnail.png" alt="button image" />{t("home.categoryImageAnimals")}</button>
                        <button onClick={()=> setSelectedCategory("categoryImageFood")} className="px-3 gap-2.5 border rounded-full transition-colors duration-200 dark:text-white flex items-center text-xs outline-none h-8 shadow-md hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "> <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/f8106745-1da2-4be8-a530-84082d194ca3_thumbnail.png" alt="button image" /> {t("home.categoryImageFood")}</button>
                        <button onClick={()=> setSelectedCategory("categoryImageClothing")} className="px-3 py-2 rounded-full border transition-colors duration-200 dark:text-white flex items-center text-xs outline-none h-8 shadow-md gap-2.5 hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "> <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/9d6a5ef0-522c-4616-9de0-c9d27f40eb3e_thumbnail.png" alt="button image" />  {t("home.categoryImageClothing")}</button>
                        <button onClick={()=> setSelectedCategory("categoryImageServices")} className="px-3 py-2 rounded-full border transition-colors duration-200 dark:text-white flex items-center text-xs outline-none h-8 shadow-md gap-2.5 hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "> <img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/0a43ce1b-08a5-4bd1-9b1c-3b93a5e6c520_thumbnail.png" alt="button image" />{t("home.categoryImageServices")}</button>
                        <button onClick={()=> setSelectedCategory("categoryImageMachinery")} className="px-3 py-2 rounded-full border flex items-center text-xs outline-none h-8 shadow-md gap-2.5 transition-colors duration-200 dark:text-white hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "><img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/f921fee2-ec04-4b29-9a02-308de408a493_thumbnail.png" alt="button image" /> {t("home.categoryImageMachinery")}</button> 
                        <button onClick={()=> setSelectedCategory("categoryImageHomeAppliances")} className="px-3 py-2 rounded-full border flex items-center text-xs outline-none h-8 shadow-md gap-2.5 transition-colors duration-200 dark:text-white hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "><img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/50b9c231-2cec-4b3b-b551-86c1af9bf145_thumbnail.png" alt="button image" /> {t("home.categoryImageHomeAppliances")}</button> 
                        <button onClick={()=> setSelectedCategory("categoryImageVehicles")} className="px-3 py-2 rounded-full border flex items-center text-xs outline-none h-8 shadow-md gap-2.5 transition-colors duration-200 ] dark:text-white hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "><img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/e802a9db-5d0c-4dbf-9424-ef7d26a02cb4_thumbnail.png" alt="button image" />{t("home.categoryImageVehicles")}</button> 
                        <button onClick={()=> setSelectedCategory("categoryImageMobiles")} className="px-3 py-2 rounded-full border flex items-center text-xs outline-none h-8 shadow-md gap-2.5 transition-colors duration-200 dark:text-white hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "><img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/f8fda21c-0070-4206-8a03-80f8dc354586_thumbnail.png" alt="button image" />{t("home.categoryImageMobiles")}</button> 
                        <button onClick={()=> setSelectedCategory("categoryImageJobs")} className="px-3 py-2 rounded-full border flex items-center text-xs outline-none h-8 shadow-md gap-2.5 transition-colors duration-200 dark:text-white hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "><img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/06bbd819-43b0-4ded-8a71-98b01cd31763_thumbnail.png" alt="button image" />{t("home.categoryImageJobs")}</button>
                        <button onClick={()=> setSelectedCategory("categoryImageRealEstate")} className="px-3 py-2 rounded-full border flex items-center text-xs outline-none h-8 shadow-md gap-2.5 transition-colors duration-200 dark:text-white hover:text-cyan-700 dark:border-cyan-300 border-cyan-200 hover:bg-cyan-100 dark:hover:bg-cyan-900 "><img className="w-4 h-4 rounded-full object-cover" src="https://ganjyab.s3.eu-north-1.amazonaws.com/7510bd16-e538-42ff-a90a-ad96f33565f2_thumbnail.png" alt="button image" />{t("home.categoryImageRealEstate")}</button>
                    </div>
                </div>
            </div>

           {/* for Mobile */}
            <div className={`w-full md:hidden max-w-[100%]  bg-white dark:bg-[#1a1a1a] relative`}>
                <div className="  relative w-full  dark:bg-[#1a1a1a] h-[184px] bg-white rounded-md dark:border-cyan-300">
                    <div className="div1 fixed top-0 left-0 w-full dark:bg-[#282828] z-50 flex flex-col md:flex-row justify-between gap-2 shadow bg-white ">
                        <div className="w-full  px-3   bg-cyan-600 dark:bg-[#121212] pt-8 pb-2">
                            <input   placeholder={t("home.search_placeholder")}  type="text"  value={search}  name="search" onChange={(e) => setSearch(e.target.value)}
                            className="w-full dark:bg-gray-600 h-9 px-3 py-2 md:py-1 rounded-full md:rounded-md outline-none shadow-[0px_0px_3px_rgba(0,0,0,0.1)] text-sm focus:ring-1 focus:ring-cyan-500 md:mt-0 border border-gray-400 md:border-none"/>
                        </div>
                        <div className="w-full h-[100px] bg-white dark:bg-[#282828]">
                            <div className="flex space-x-3 pl-4"> 
                            <button type="button" onClick={()=> setFilter(!filter)} className={`px-4 py-1 border border-gray-400 rounded-md outline-none flex items-center justify-between ${selectedProvince || selectedDistricts.length >0 || selectedCategory ?"bg-cyan-500": ""} `}>
								Filters
                               {(selectedProvince || selectedDistricts.length > 0 || selectedCategory ) && (
                                <span onClick={(e) => { e.stopPropagation(); setSelectedProvince(""); setSelectedDistricts([]); setSelectedCategory(""); }}
                                className="ml-2 text-orange-600 cursor-pointer"><AiOutlineClose  size={20}/></span> )} 
                            </button>
                            <button type="button" onClick={()=>{setArea(!area)}} className={`px-4 py-1 border border-gray-400 rounded-md outline-none flex justify-between items-center ${selectedProvince || selectedDistricts.length >0 ?"bg-cyan-500": ""}`}>{areaText ||"Area"}   {(selectedProvince || selectedDistricts.length > 0) && (
                                <span onClick={(e) => {e.stopPropagation(); setSelectedProvince(""); setSelectedDistricts([]);}}
                                className="ml-2 text-orange-600 cursor-pointer"><AiOutlineClose  size={20}/></span>   )}
                            </button>
                            <button type="button" onClick={()=>setCategory(!category) } className={`px-4 py-1 border border-gray-400 rounded-md outline-none flex items-center justify-between ${  selectedCategory ? "bg-cyan-500" : ""}`}>      {selectedCategory ? t(`home.${selectedCategory}`) :"Category"}
                                {selectedCategory && (
                                    <span onClick={(e) => { e.stopPropagation(); setSelectedCategory(""); }} className="ml-2 text-orange-600 cursor-pointer" >
                                        <AiOutlineClose size={20} />
                                    </span>
								 )}
							</button>
                           </div>
                           <p className="AllProduct p-4  mt-4 flex w-full items-center justify-between">{t("home.allProducts")}   {filteredProducts.length}  <span className="text-cyan-600 mr-5">< AiOutlineAppstore size={25}/></span></p>
                       </div>
                    </div>
                    { filter && (<Filters filter={filter}  setFilter={setFilter}/>)}
                    { area  && (<SelecProvince  onClose={()=> setArea(false)}   showClass="flex" />)}
                    {category && <Category isOpen={category} setCategory={setCategory}  setSelectedCategory={ setSelectedCategory} />}
				</div>
            </div>
            <div className='relative bg-gray-50 md:bg-transparent  py-4 px-2 md:px-0 w-full dark:bg-[#1a1a1a]'>
                {filteredProducts.length > 0 ? (
                    <div className="products relative grid   md:mb-12 md:mt-0 grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className='bg-white w-full md:max-w-[300px] border dark:border-cyan-300 dark:bg-[#282828] border-cyan-200 rounded-md h-auto md:h-[400px]'>
                                 <button className="hidden md:flex justify-center font-medium text-xs items-center px-3 h-8 gap-2 ml-3 mt-2 hover:bg-cyan-100 transition-colors outline-none dark:hover:bg-cyan-900 dark:hover:text-white rounded-full duration-200 hover:text-cyan-700">
                                    <FiUser className="text-md" /> {product.seller}
                                </button>
                                {/* <button className="hidden md:flex justify-center font-medium text-xs items-center px-3 h-8 gap-2 ml-3 mt-2 hover:bg-cyan-100 transition-colors outline-none dark:hover:bg-cyan-900 dark:hover:text-white rounded-full duration-200 hover:text-cyan-700">
                                    <FiUser className="text-md" /> {name}
                                </button> */}
                                <div className="flex md:flex-col flex-row-reverse">
                                    <Link to={`/post/${product.id}`}>
                                        {/* src={`http://localhost:3001${product.images[0].url}`} */}
                                        <img   src={`https://joyenda-server.onrender.com${product.images[0].url}`}  className={`w-[200px] md:w-full h-[150px] object-cover md:mt-5 md:rounded-md ${document.documentElement.dir === "rtl" ? "rounded-tl-md rounded-bl-md" : "rounded-tr-md rounded-br-md"}`} alt={product.cat} />
                                    </Link>
                                    <div className="w-full">
                                       <div className="info flex-1 p-4">
                                           <h4 className="md:text-right">{product.product}</h4>
                                           <p className="text-xs gap-2.5 flex items-center">{product.province} <span className="text-sm mr-3">in</span> <span>{product.district}</span> {product.region}</p>
                                           <p className="category2 text-xs mt-1">Product State: new</p>
                                           <p className="hidden md:block category2 text-xs mt-1">Category : {t(`create.${product.category}`)}</p>
                                           {/* <p className="category2 text-xs mt-1">1 aweaks ago</p> */}
                                           <p className="category2 text-xs mt-1">{timeAgo(product.createdAt)}</p>

                                       </div>
                                        <div className="contact flex justify-between px-4 py m">
                                            <span className="text-lg font-bold">{product.price} {getCurrencySymbol(product.currency)}</span>
                                            <div className="hidden md:flex items-center gap-2">
                                                <button   onClick={() => setSelectedProduct(product)}  className="text-sm font-medium hover:bg-cyan-100 transition-colors outline-none rounded-full duration-200 hover:text-cyan-700 h-9 dark:hover:bg-cyan-900 dark:hover:text-white"><FiPhone size={20} /></button>
                                                <button onClick={() => handleAddToFavorites(product)} className="text-sm font-medium hover:bg-cyan-100 transition-colors outline-none rounded-full duration-200 dark:hover:bg-cyan-900 dark:hover:text-white h-9"><FiHeart size={20} /></button>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
						))}
                    </div>
                    ) : (
                    <div className="w-full min-h-[105vh] flex items-center justify-center">
                        <div className="h-auto flex flex-col items-center shadow-lg bg-white dark:bg-[#282828] p-6 rounded-md mx-auto">
                            <div className="mb-4 text-gray-400 dark:text-gray-500"> <HiOutlinePhotograph size={50} /></div>
                            <p className="text-gray-700 dark:text-gray-300 font-semibold text-xl mb-2">No items found.</p>
                            <p className="text-center text-gray-500 dark:text-gray-400">The item you are looking for does not exist.</p>
                        </div>
                    </div>
                   )}
               {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
                {selectedProduct && (<ContactModal 
                 isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} phone={selectedProduct.phoneNumber} 
                 whatsapp={selectedProduct.whatsappNumber} region={selectedProduct.region} district= {selectedProduct.district}
                  province={selectedProduct.province} /> )}
			</div>
            <span className="hidden md:inline">    <ScrollToTopButton /></span>
        </div>
    );
}

export default HomePage;
