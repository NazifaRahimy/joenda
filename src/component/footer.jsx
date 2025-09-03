import { Link } from "react-router-dom";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaInstagram} from "react-icons/fa";
import { TbBrandFacebook } from "react-icons/tb";
import { FiTwitter } from "react-icons/fi";
import { IoLogoApple  } from "react-icons/io";
import { useTranslation } from "react-i18next";

const Footer = () => {
	const { t } = useTranslation();

    return (
    <footer className="mx-auto w-full max-w-7xl  px-6 mt-9 md:mt-2 mb-20 md:mb-0">
        <div className="flex flex-col md:flex-row justify-end items-center  gap-2">
            <p className="text-sm font-semibold">{t("footer.download")}</p>
			<div className="flex gap-3 text-white mt-2 md:mt-0">
				<a href="#" target="_blank" className="flex items-center justify-center gap-1 bg-[#1D1D1F] px-3 py-2 rounded-lg transition-all hover:bg-[#2C2C2E]">
					<IoLogoApple  />
					<span className="text-sm font-semibold text-white">App Store</span>
				</a>
				<a href="#" target="_blank" className="flex items-center justify-center gap-1 bg-[#0F9D58] px-3 py-2 rounded-lg transition-all hover:bg-[#1AA260]">
					< IoLogoGooglePlaystore   />
					<span className="text-sm font-semibold text-white">Google Play</span>
				</a>
			</div>
		</div>
		<div className="container flex flex-col md:flex-row justify-between items-center px-5 py-7 md:mt-8 ">
           <div className=" flex flex-col md:flex-row justify-center  items-center gap-5">
              <span> <a href="/">Joyenda </a>| {t("footer.rights")}.</span>
			   <Link to='/privacy' className="ml-10 text-cyan-500 text-xl">{t("footer.privacy")}</Link>
		   </div>
		   <div className="flex gap-5 text-2xl mt-3 md:mt-0">
                <p>< TbBrandFacebook /></p>
				<p><FaInstagram /></p>
				<p>< FiTwitter  /></p>
		   </div>
		</div>
	</footer>
    );
}
 
export default Footer;