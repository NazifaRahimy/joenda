import { FaTelegram } from "react-icons/fa6";
import { IoHeartOutline, IoEyeOutline, IoLinkOutline, IoShareSocialOutline, IoLogoInstagram, IoLogoWhatsapp } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { useParams } from 'react-router-dom';
import { FiTwitter, FiPhone,  FiUser , FiHeart } from "react-icons/fi";
import { MdOutlineExpandLess, MdOutlineMailOutline } from "react-icons/md";
import LoginModal from "../NavBar/Login";
import ContactModal from "./contactModal";
import Footer from "../footer";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import postProduct from "./postProduct";
import { GoArrowRight, GoArrowLeft } from "react-icons/go"

const Post = ({ addToFavorites }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const RefDropDown = useRef(null);
    const [postUrl, setPostUrl] = useState("");
    const { t } = useTranslation();
    const [product, setProduct] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [startIndex, setStartIndex] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [startDragX, setStartDragX] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);
    const [boxWidth, setBoxWidth] = useState(300);
    const [visibleBoxes, setVisibleBoxes] = useState(4);
    const boxRef = useRef(null);
    const isRTL = document.documentElement.dir === "rtl";
    const directionMultiplier = isRTL ? 1 : -1;

    useEffect(() => {
        const updateBoxWidth = () => {
            if (boxRef.current) setBoxWidth(boxRef.current.offsetWidth);
        };
        updateBoxWidth();
        window.addEventListener("resize", updateBoxWidth);
        return () => window.removeEventListener("resize", updateBoxWidth);
    }, []);


    useEffect(() => {
        const updateVisibleBoxes = () => {
            const width = window.innerWidth;
            if (width < 768) setVisibleBoxes(1);
            else if (width < 1024) setVisibleBoxes(2);
            else setVisibleBoxes(4);
        };
        updateVisibleBoxes();
        window.addEventListener("resize", updateVisibleBoxes);
        return () => window.removeEventListener("resize", updateVisibleBoxes);
    }, []);

    const maxTranslate = Math.max(0, (postProduct.length - visibleBoxes) * boxWidth);
    const maxIndex = Math.max(0, postProduct.length - visibleBoxes);

    const handleMouseDown = (e) => setStartDragX(e.clientX);
    const handleMouseMove = (e) => {
        if (startDragX === null) return;
        const delta = e.clientX - startDragX;
        setDragOffset(delta);
    };
    const handleMouseUp = () => {
        if (startDragX === null) return;
        const newTranslate = translateX - dragOffset;
        const snapped = Math.round(newTranslate / boxWidth) * boxWidth;
        const clamped = Math.max(0, Math.min(snapped, maxTranslate));
        setTranslateX(clamped);
        setStartDragX(null);
        setDragOffset(0);
    };
    const handleTouchStart = (e) => setStartDragX(e.touches[0].clientX);
    const handleTouchMove = (e) => {
        if (startDragX === null) return;
        const delta = e.touches[0].clientX - startDragX;
        setDragOffset(delta);
    };
    const handleTouchEnd = () => {
        if (startDragX === null) return;
        const newTranslate = translateX - dragOffset;
        const snapped = Math.round(newTranslate / boxWidth) * boxWidth;
        const clamped = Math.max(0, Math.min(snapped, maxTranslate));
        setTranslateX(clamped);
        setStartDragX(null);
        setDragOffset(0);
    };

    const handleNext = () => {
        if (startIndex < maxIndex) {
            const newIndex = startIndex + 1;
            setStartIndex(newIndex);
            setTranslateX(newIndex * boxWidth);
        }    
    };

    const handlePrev = () => {
    if (startIndex > 0) {
        const newIndex = startIndex - 1;
        setStartIndex(newIndex);
        setTranslateX(newIndex * boxWidth);
    }
    };

    useEffect(() => {
        const newIndex = Math.round(translateX / boxWidth);
        setStartIndex(newIndex);
    }, [translateX]);

    const isPrevDisabled = translateX === 0;
    const isNextDisabled = startIndex >= maxIndex;

    const handleAddToFavorites = (product) => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            setIsLoginOpen(true);
           return;
        }
        addToFavorites(product);
  };

    useEffect(() => {
        fetch(`http://localhost:3001/ads/${id}`)
          .then(res => res.json())
          .then(data => setProduct(data))
          .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        setPostUrl(window.location.href); 
    }, []);

    const telegramLink = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}`;
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(postUrl)}`;
    const emailLink = `mailto:?body=${encodeURIComponent(postUrl)}`;
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
     const instagramLink = "https://www.instagram.com/your_page_name"; // فقط باز می‌شود، اشتراک‌گذاری مستقیم ندارد

    const handleCopyLink = () => {
        navigator.clipboard.writeText(postUrl)
        .then(() => alert("لینک با موفقیت کپی شد ✅"))
        .catch(() => alert("کپی لینک ناموفق بود ❌"));
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (RefDropDown.current && !RefDropDown.current.contains(event.target)) {
                setOpen(false);
           }
        };
        document.addEventListener("mousedown", handleClickOutside);
       return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!product) return <div>Loading...</div>;

    const name = localStorage.getItem("auth-name");
    return (
        <div className="w-full relative pt-10">
            <button onClick={() => navigate(-1)} className='absolute top-0 right-5 px-4 text-sm font-medium py-1 rounded-lg dark:hover:bg-cyan-900 dark:hover:text-white m-10 flex justify-center items-center gap-1 hover:text-cyan-700 hover:bg-cyan-100 transition-colors duration-200'>
                <span>{t("post.back")}</span>
            </button>
            <div className="w-auto mx-10 h-auto flex flex-col md:flex-row mt-20 gap-8">
                <div className="w-full md:w-[65%] h-auto">
                    <div className="w-full h-auto bg-gray-100">
                        <div className="w-[65%] h-[460px] mx-auto">
                            <img className="w-full h-full" src={`https://joyenda-server.onrender.com${product.images[0].url || product.images[0]}`} />
                        </div>
                    </div>
                    <div className="flex justify-between mt-5">
                        <h2 className="text-2xl font-semibold">؋ {product.price}</h2>
                        <h2 className="text-2xl font-semibold">{product.product}</h2>
                    </div>
                    <p className="text-lg  items-center mt-4 flex gap-1"><CiCalendar /> <span>3 days ago</span>  <span className="text-sm mr-3"> {t("post.in")}</span> {product.region} <span> {product.district}</span> {product.province} </p>
                    <p className={`mt-5 text-xl `}> Product State: <span className="text-[16px]">like new</span></p>
         
                   <div className="my-5 border-b border-cyan-300 text-right">
                        <h4 className="mt-4 text-base mb-4">{product.description}</h4>
                   </div>
               </div>
               {/* بخش تماس و علاقه‌مندی‌ها */}
                <div className="w-full mt-6 md:mt-0 md:w-[35%] h-auto">
                    <div className="flex justify-center gap-3">
                        <button  onClick={() => setSelectedProduct(product)} 
                        className="w-[50%] h-9 bg-cyan-600 text-white flex items-center justify-center rounded-md gap-2.5 transition-colors duration-200 hover:bg-cyan-500 border-none outline-none">
                            <FiPhone size={20}/> <span>{t("post.contact")}</span>
                        </button>
                        <button onClick={() => handleAddToFavorites(product)} className="w-[50%] px-3 h-9 bg-cyan-600 text-white flex items-center justify-center rounded-md gap-2.5 text-sm font-medium transition-colors duration-200 hover:bg-cyan-500 border-none outline-none">
                            <IoHeartOutline size={20}/> <span>{t("post.add_to_favorite")}</span>
                        </button>  
                    </div>
                    {isLoginOpen && <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />}
                    {selectedProduct && (<ContactModal  isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)}
                    phone={selectedProduct.phoneNumber} whatsapp={selectedProduct.whatsappNumber}
                    region={selectedProduct.region} district= {selectedProduct.district} province={selectedProduct.province} /> )}
                    <div className="flex justify-between mt-5">
                        <p>{t("post.total_views")} :</p> 
                        <span className="inline-flex items-center gap-2.5">123 <IoEyeOutline /></span>
                    </div>
                    <div className="flex justify-between mt-5">
                        <p>{t("post.posted_by")} :</p> 
                        {/* <span className="inline-flex items-center gap-2.5 transition-colors duration-200 hover:text-cyan-600">{product.seller} <IoLinkOutline /></span> */}
                        <span className="inline-flex items-center gap-2.5 transition-colors duration-200 hover:text-cyan-600">{name} <IoLinkOutline /></span>
                    </div>
                    <div className="flex justify-between mt-5">
                        <p>{t("post.categories")}:</p> 
                        <span className="inline-flex items-center gap-2.5 text-gray-300"><MdOutlineExpandLess size={22} /></span>
                    </div>
                    <div className="flex gap-2 mt-4">
                        <div className="bg-[#282828] hover:bg-[#393939] rounded-md px-3 h-9 text-white inline-flex items-center">{t(`create.${product.category}`)}</div>
                        <div className="bg-[#282828] hover:bg-[#393939] text-white rounded-md px-3 h-9 inline-flex items-center">Food items</div>
                    </div>
                    <hr className="my-7"/>
                    {/* بخش اشتراک گذاری */}
                   <div ref={RefDropDown}>
                        <button onClick={() => setOpen(!open)} className="inline-flex items-center outline-none gap-2.5 border border-cyan-200 dark:border-cyan-300 dark:hover:bg-cyan-800 rounded-full px-4 shadow py-1.5 hover:text-cyan-700 hover:bg-cyan-100 transition-colors duration-200 dark:text-white">
                            <IoShareSocialOutline />{t("post.share")}
                        </button>
                        {open &&  
                            <div className="w-[300px] border border-cyan-200 rounded-md mt-1 h-[80px] flex justify-center items-center gap-2 dark:border-cyan-300">
                                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-cyan-700 hover:bg-cyan-100 cursor-pointer rounded-md"><IoLogoInstagram /></a>
                                <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-cyan-700 hover:bg-cyan-100 cursor-pointer rounded-md"><FiTwitter /></a>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-cyan-700 hover:bg-cyan-100 cursor-pointer rounded-md"><IoLogoWhatsapp /></a>
                                <a href={telegramLink} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-cyan-700 hover:bg-cyan-100 cursor-pointer rounded-md"><FaTelegram /></a>
                                <a href={emailLink} className="p-3 hover:text-cyan-700 hover:bg-cyan-100 cursor-pointer rounded-md"><MdOutlineMailOutline /></a>
                                <span onClick={handleCopyLink} className="p-3 hover:text-cyan-700 hover:bg-cyan-100 cursor-pointer rounded-md"><IoLinkOutline /></span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            {/* اسلایدر پست‌های مرتبط */}
           <div className="hidden md:block w-full px-8 md:px-10 mt-10">
                <h1 className="my-4 text-2xl font-semibold">{t("post.relevant_posts")}</h1>
                <div className="flex overflow-hidden">
                    <div className="overflow-hidden w-full relative">
                        <div className="flex transition-transform duration-300 ease-out"
                         style={{ transform: `translateX(${(translateX - dragOffset) * directionMultiplier}px)` }}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        >
                            {postProduct.map((product, index) => (
                                <div key={index} ref={index === 0 ? boxRef : null} className="shrink-0 w-full md:w-1/2 lg:w-1/4 px-2">
                                    <div className="bg-white border border-cyan-200 dark:border-300 shadow-md rounded-md dark:bg-[#282828] h-[360px]">
                                        <button className="hidden mb-2 md:flex justify-center font-medium text-xs items-center px-3 h-8 gap-2 ml-3 mt-2 hover:bg-cyan-100 transition-colors outline-none dark:hover:bg-cyan-900 dark:hover:text-white rounded-full duration-200 hover:text-cyan-700">
                                            <FiUser className="text-md" /> {product.seller}
                                        </button>
                                        <img src={product.image} alt={product.cat} className="w-full h-[150px] object-cover rounded-md" />
                                        <div className="info flex-1 p-4">
                                            <h4 className="text-right">{product.cat}</h4>
                                            <p className="text-xs mt-2">{product.location}</p>
                                            <p className="text-xs mt-2">Product State: {product.type}</p>
                                        </div>
                                        <div className="contact flex justify-between px-4 mb-2">
                                            <span className="text-lg font-bold">{product.price}  ؋</span>
                                            <div className="hidden md:flex items-center gap-2">
                                                <button className="text-sm font-medium hover:bg-cyan-100 transition-colors outline-none rounded-full duration-200 hover:text-cyan-700 h-9 dark:hover:bg-cyan-900 dark:hover:text-white"><FiPhone size={20} /></button>
                                                <button  className="text-sm font-medium hover:bg-cyan-100 transition-colors outline-none rounded-full duration-200 dark:hover:bg-cyan-900 dark:hover:text-white h-9"><FiHeart size={20} /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* دکمه‌های اسلایدر */}
                <div dir="ltr" className="md:flex items-center hidden mt-1 gap-1">
                    <button  className={`text-xl p-2 rounded-full border transition-colors duration-200 ${ isPrevDisabled ? "text-gray-400 cursor-not-allowed" : "hover:text-cyan-700 hover:bg-cyan-100" }`}
                    onClick={handlePrev} disabled={isPrevDisabled}>
                        <GoArrowLeft />
                    </button>
                    <button  className={`text-xl p-2 rounded-full border transition-colors duration-200 ${isNextDisabled ? "text-gray-400 cursor-not-allowed" : "hover:text-cyan-700 hover:bg-cyan-100" }`}
                     onClick={handleNext}  disabled={isNextDisabled}>
                        <GoArrowRight />
                    </button>
                </div>
            </div>
           <Footer />
       </div>
    );
};

export default Post;
