import {useEffect, useState} from "react";
import LoginModal from "./NavBar/Login";
import PageTitle from "./pagetitle";
import {Link} from "react-router-dom";
import {FiPhone, FiUser} from "react-icons/fi";
import {useTranslation} from "react-i18next";
import Footer from "./footer";
import ScrollToTopButton from "./bottomToTob";
import ModifyAccount from "./Home/modifyAccount";
import {LuBadgeCheck} from "react-icons/lu";
import {useNavigate} from "react-router-dom";
import {IoArrowBack} from "react-icons/io5";

function FavoritePage({cart}) {
  const {t} = useTranslation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false); // ✅
  const [modifyAccount, setModifyAccount] = useState(false);
  const navigate = useNavigate();
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
        <main className="mx-auto max-w-7xl hidden md:block">
          <div className="min-h-screen flex  items-center flex-col">
            <h1 className="my-10 text-3xl font-bold">
              {t("favorites.title")}{" "}
            </h1>
            <div className="bg-white dark:bg-[#292929] p-8 rounded-2xl max-w-lg text-center shadow-lg">
              <h1 className="text-2xl font-semibold text-red-600 mb-4">
                {t("favorites.access_denied")} !
              </h1>
              <p className="mb-6 text-gray-600 dark:text-white">
                {t("favorites.access_message")}.
              </p>
              <div className="space-x-2.5">
                <a
                  href="/"
                  className="px-4 py-2 text-sm font-semibold rounded-md hover:underline"
                >
                  {t("favorites.back_home")}
                </a>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-cyan-600 hover:bg-cyan-400 py-2 px-4 rounded-md text-sm font-semibold text-white"
                >
                  {" "}
                  {t("favorites.login_btn")}{" "}
                </button>
              </div>
            </div>
            <LoginModal
              isOpen={isLoginModalOpen}
              initialForm="login"
              onClose={() => setIsLoginModalOpen(false)} // وقتی مودال بسته شد، خطا نمایش داده میشه
            />
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <div className="fixed top-0 left-0 flex md:hidden w-full justify-start h-20 px-3 bg-cyan-500 dark:bg-[#121212]">
          <button
            onClick={() => navigate(-1)}
            className={`back text-[18px] absolute ${
              document.documentElement.dir === "rtl"
                ? "right-3 rotate-180"
                : "left-2"
            } top-8 `}
          >
            <IoArrowBack size={25} />
          </button>
          <div className="flex items-center justify-center w-full">
            <p className="text-[20px] font-semibold tracking-wide">
              Saved Products
            </p>
          </div>
        </div>
        <div className=" w-full py-4 px-2 flex flex-col">
          {loggedIn && (
            <div className="hidden md:block w-full h-auto bg-yellow-100 border border-cyan-700 rounded-md my-10 px-4 py-2 dark:border-cyan-300">
              <p className="text-cyan-700 text-xl ">
                {t("home.user")} {name}
              </p>
              <div className="flex justify-between text-cyan-700 text-lg">
                <p>{t("home.pagharaph")}</p>
                <button
                  onClick={() => setModifyAccount(!modifyAccount)}
                  className="click outline-none border-none flex items-center gap-5 bg-cyan-600 hover:bg-cyan-500 text-white px-12 py-1 rounded-md"
                >
                  <span>
                    <LuBadgeCheck />
                  </span>{" "}
                  Click to Complate
                </button>
              </div>
            </div>
          )}
          {modifyAccount && (
            <ModifyAccount
              isOpen={modifyAccount}
              onClose={() => setModifyAccount(false)}
            />
          )}
          <h1 className="hidden md:block text-3xl font-bold text-center pb-4 mb-6">
            {t("favorites.title")}{" "}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-20 md:mt-0">
            {cart.map((product) => (
              <div
                key={product.id}
                className="w-full md:max-w-[300px] border dark:border-cyan-300 dark:bg-[#282828] border-cyan-200 rounded-md h-auto md:h-[400px]"
              >
                <button className="hidden md:flex justify-center font-medium text-xs items-center px-3 h-8 gap-2 ml-3 mt-2 hover:bg-cyan-100 transition-colors outline-none dark:hover:bg-cyan-900 dark:hover:text-white rounded-full duration-200 hover:text-cyan-700">
                  {" "}
                  <FiUser className="text-md" /> {name}{" "}
                </button>
                <div className="flex md:flex-col flex-row-reverse">
                  <Link to={`/post/${product.id}`}>
                    <img
                      src={product.images[0].url}
                      alt={product.product}
                      // src={`http://localhost:3001${product.images[0].url}`}
                      className={`w-[200px] md:w-full h-[150px] object-cover md:mt-5 md:rounded-md  ${
                        document.documentElement.dir === "rtl"
                          ? "rounded-tl-md rounded-bl-md"
                          : "rounded-tr-md rounded-br-md"
                      }`}
                    />
                  </Link>
                  <div className="w-full ">
                    <div className="info flex-1 p-4">
                      <h4 className="md:text-right">{product.product}</h4>
                      <div className="mt-4">
                        <p className="text-xs gap-2.5 flex items-center">
                          {" "}
                          3 days ago <span className="text-sm mr-3">
                            in
                          </span>{" "}
                          <span>{product.province}</span>
                        </p>
                        <p className="text-xs mt-1">Product State: New</p>
                      </div>
                    </div>
                    <div className="contact flex justify-between px-4 md:py-2 md:mt-4">
                      <span className="text-lg font-bold">
                        {product.price} ؋
                      </span>
                      <div className="flex items-center gap-2">
                        <button className="text-sm hidden md:inline font-medium hover:bg-cyan-100 transition-colors outline-none rounded-full duration-200 hover:text-cyan-700 h-9 dark:hover:bg-cyan-900 dark:hover:text-white">
                          <FiPhone size={20} />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ScrollToTopButton />
          <div className="mt-8 hidden md:block">
            {" "}
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

export default FavoritePage;
