import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, useEffect} from "react"; // این خط مهم است
import NavBar from "./component/NavBar/navbar";
import HomePage from "./component/Home/home";
import FavoritesPage from "./component/favorites";
import AboutPage from "./component/about";
import ContactPage from "./component/contact";
import Privacy from "./component/privacy";
import ProgressBar from "./component/progressBar";
import CreateAd from "./component/createanAd";
import {useTranslation} from "react-i18next";
import MyProfile from "./component/Application/myProfile";
import Registration from "./component/Application/registration";
import Login from "./component/Application/login";
import SavedProduct from "./component/Application/savedProduct";
import MyProduct from "./component/Application/myProducts";
import Post from "./component/Home/post";

// function App() {
// 	const {i18n} = useTranslation();
//     const [cart, setCart] = useState([]);
//     const [isLoggedIn, setIsLoggedIn] = useState( !!localStorage.getItem("auth-token"));

//      useEffect(() => {
//         localStorage.setItem("favorites", JSON.stringify(cart));
//     }, [cart]);

//     useEffect(() => {
//         const storedFavorites = localStorage.getItem("favorites");
//         if (storedFavorites) {
//             setCart(JSON.parse(storedFavorites));
//         }
//     }, []);

//     // Add To Favorite
//     const addToFavorites = (product) => {
//         const exists = cart.find((x) => x.id === product.id);
//         if (exists) {
//             alert("This product is already added in cart");
//         } else {
//             setCart([...cart, {...product}]);
//             alert("Add To Favorites");
//             // localStorage(cart)
//         }
//     };

//     useEffect(() => {
//         const lang = i18n.language;
//         document.documentElement.dir =lang === "fa" || lang === "ps" ? "rtl" : "ltr";
//     }, [i18n.language]);

//   return (
//     <div className="w-full max-w-full min-h-screen md:w-full lg:w-full xl:w-full 2xl:w-[1366px] mx-auto relative overflow-x-hidden dark:bg-[#232323] text-black dark:text-white"  >
//         <BrowserRouter>
//             <ProgressBar />
//             <NavBar setIsLoggedIn={setIsLoggedIn} />
//             <Routes>
//                 <Route path="/" element={ <HomePage addToFavorites={addToFavorites} IsLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />  }/>
//                 <Route path="/post/:id" element={<Post  addToFavorites={addToFavorites} />} />
//                 <Route path="/favorites" element={<FavoritesPage cart={cart} />} />
//                 <Route path="/about" element={<AboutPage />} />
//                 <Route path="/contact" element={<ContactPage />} />
//                 <Route path="/privacy" element={<Privacy />} />
//                 <Route path="/createanAd" element={<CreateAd />} />
//                 <Route path="/myprofile"  element={<MyProfile setIsLoggedIn={setIsLoggedIn} />} />
//                 <Route path="/registration" element={<Registration />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/savedProduct" element={<SavedProduct />} />
//                 <Route path="/myProducts" element={<MyProduct />} />
//             </Routes>
//         </BrowserRouter>
//     </div>
//   );
// }

function App() {
  const {i18n} = useTranslation();
  const [cart, setCart] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("auth-token")
  );

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(cart));
  }, [cart]);

  // const addToFavorites = (product) => {
  //     const exists = cart.find((x) => x.id === product.id);
  //     if (exists) {
  //         alert("This product is already added in Favorites");
  //     } else {
  //         setCart([...cart, { ...product }]);
  //         alert("Added to Favorites");
  //     }
  // };
  const addToFavorites = (product) => {
    const exists = cart.find((x) => x.id === product.id);
    if (exists) {
      alert("This product is already added in Favorites");
    } else {
      // اضافه کردن prefix کامل به URL تصاویر
      const productWithFullImage = {
        ...product,
        images: product.images.map((img) => ({
          ...img,
          url: `https://joyenda-server.onrender.com${img.url}`,
        })),
      };
      setCart([...cart, productWithFullImage]);
      alert("Added to Favorites");
    }
  };

  useEffect(() => {
    const lang = i18n.language;
    document.documentElement.dir =
      lang === "fa" || lang === "ps" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <div className="w-full max-w-full min-h-screen md:w-full lg:w-full xl:w-full 2xl:w-[1366px] mx-auto relative overflow-x-hidden dark:bg-[#232323] text-black dark:text-white">
      <BrowserRouter>
        <ProgressBar />
        <NavBar setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                addToFavorites={addToFavorites}
                IsLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/post/:id"
            element={<Post addToFavorites={addToFavorites} />}
          />
          <Route path="/favorites" element={<FavoritesPage cart={cart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/createanAd" element={<CreateAd />} />
          <Route
            path="/myprofile"
            element={<MyProfile setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/savedProduct" element={<SavedProduct />} />
          <Route path="/myProducts" element={<MyProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
