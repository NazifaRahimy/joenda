import { useEffect, useState } from "react";
import LoginModal from "./NavBar/Login";
import PageTitle from "./pagetitle";
import { Link } from "react-router-dom";
import { FiPhone, FiUser } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import Footer from "./footer";
import ScrollToTopButton from "./bottomToTob";
import ModifyAccount from "./Home/modifyAccount";
import { LuBadgeCheck } from "react-icons/lu";

function FavoritePage({ cart }) {
    const { t } = useTranslation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false); // ✅
    const [modifyAccount, setModifyAccount] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem("auth-token");
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false); 
                setIsLoginModalOpen(true);
            }
           setHasCheckedAuth(true); // ✅ بررسی تمام شد
    }, []);

    const token = localStorage.getItem("auth-token");
    const name = localStorage.getItem("auth-name");

    const loggedIn = !!token;

    if (!isLoggedIn) {
        if (!hasCheckedAuth) return null;
        return (
        <>
        <PageTitle title="pages.favorites" />
        <main className="mx-auto max-w-7xl hidden md:inline">
           <div className="min-h-screen flex  items-center flex-col">
                <h1 className="my-10 text-3xl font-bold">{t("favorites.title")} </h1>
                <div className="bg-white dark:bg-[#292929] p-8 rounded-2xl max-w-lg text-center shadow-lg">
                    <h1 className="text-2xl font-semibold text-red-600 mb-4">{t("favorites.access_denied")} !</h1>
                    <p className="mb-6 text-gray-600 dark:text-white">{t("favorites.access_message")}.</p>
                    <div className="space-x-2.5">
                        <a href="/" className="px-4 py-2 text-sm font-semibold rounded-md hover:underline">{t("favorites.back_home")}</a>
                        <button onClick={() => setIsLoginModalOpen(true)}className="bg-cyan-600 hover:bg-cyan-400 py-2 px-4 rounded-md text-sm font-semibold text-white">  {t("favorites.login_btn")} </button>
                    </div>
                </div>
                <LoginModal isOpen={isLoginModalOpen}  initialForm="login"
                onClose={() => setIsLoginModalOpen(false)} // وقتی مودال بسته شد، خطا نمایش داده میشه
                 />
            </div>
        </main>
       </>
     );
    }else{
    return (
    <div className=" w-full py-4 px-2 hidden md:flex flex-col">
     
        {loggedIn && (
            <div className=" w-full h-auto bg-yellow-100 border border-cyan-700 rounded-md my-10 px-4 py-2 dark:border-cyan-300">
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
        <h1 className="text-3xl font-bold text-center pb-4 mb-6">{t("favorites.title")} </h1>
        <div className="grid grid-cols-4 gap-6">
            {cart.map((product) => (
                <div key={product.id} className="max-w-[300px] border dark:border-cyan-300 dark:bg-[#282828] border-cyan-200 rounded-md h-[400px]">
                    <button className="flex justify-center font-medium text-xs items-center px-3 h-8 gap-2 ml-3 mt-2 hover:bg-cyan-100 transition-colors outline-none dark:hover:bg-cyan-900 dark:hover:text-white rounded-full duration-200 hover:text-cyan-700">  <FiUser className="text-md" /> {name} </button>
                    <Link to={`/post/${product.id}`}><img src={`http://localhost:3001${product.images[0].url}`} className="w-full h-[150px] object-cover mt-5 rounded-md" alt='' /></Link>
                    <div className="info flex-1 p-4">
                        <h4 className="text-right">{product.product}</h4>
                        <div className="mt-4">
                            <p className="text-xs gap-2.5 flex items-center"> 3 days ago <span className="text-sm mr-3">in</span> <span>{product.province}</span></p>
                            <p className="text-xs mt-1">Product State: New</p>
                        </div>
                    </div>
                    <div className="contact flex justify-between px-4 py-2 mt-4">
                        <span className="text-lg font-bold">{product.price} ؋</span>
                        <div className="flex items-center gap-2">
                            <button className="text-sm font-medium hover:bg-cyan-100 transition-colors outline-none rounded-full duration-200 hover:text-cyan-700 h-9 dark:hover:bg-cyan-900 dark:hover:text-white"><FiPhone size={20} /> </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <ScrollToTopButton/>
        <div className="mt-8"> <Footer /></div>
    </div>
  );
}
}

export default FavoritePage;
