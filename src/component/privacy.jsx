import PageTitle from "./pagetitle";
import { useTranslation } from "react-i18next";
import {  IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ScrollToTopButton from "./bottomToTob";
const Privacy = () => {
    const { t } = useTranslation();
      const navigate = useNavigate();
    return ( 
        <>      
        <PageTitle title="pages.privacy" />
         <main className="w-full mx-auto max-w-7xl  ">
            <div className="w-full bg-white fixed top-0 left-0 z-50 flex flex-col items-center justify-center md:hidden ">
                <div className="relative flex w-full justify-start h-20 px-3  bg-cyan-500 dark:bg-[#121212] dark:text-cyan-500 ">
                    <button onClick={() => navigate(-1)} className="text-[18px] absolute top-8 left-2"  >
                        <IoArrowBack size={25} />
                    </button>
                    <div className="flex items-center justify-center w-full">
                        <p className="text-[20px] font-semibold">Privacy Policy</p>
                    </div>
                </div>
            </div>
            <div className="relative mt-20 w-full dark:text-black dark:md:text-white dark:md:bg-[#232323] bg-white py-12 mx-auto max-w-4xl  space-y-8 px-6">
                <h1 className="text-4xl font-bold ">Privacy Policy Demo</h1>
                <p className="text-lg">این یک نسخه نمایشی از صفحه قوانین سایت است.</p>
                {Array.from({ length: 5 }).map((_, i) => (
                    <section key={i} className="border-b border-gray-200 pb-8">
                        <h2 className="mt-4 mb-4 text-2xl font-semibold">مقاله {i + 1}</h2>
                        <p className="mb-4">اینجا متن نمونه برای مقاله {i + 1} قرار می‌گیرد. می‌توانید بعداً متن واقعی قوانین را جایگزین کنید. </p>
                    </section>
                ))}
                {/* <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article1.title")}</h1>
                    <div><p className="mb-4">{t("privacy.sections.article1.paragraph")}</p></div>
                </section> */}
                <section className="mt-8">
                <h2 className="mt-4 mb-4 text-2xl font-semibold">تماس با ما</h2>
                <p className="mb-4">برای اطلاعات بیشتر، می‌توانید با ما تماس بگیرید:</p>
                <ul className="list-decimal space-y-2 mt-4">
                    <li><strong>Email:</strong> <a href="mailto:demo@example.com" className="text-blue-500">demo@example.com</a></li>
                    <li><strong>Website:</strong> <a href="/" target="_blank" className="text-blue-500">www.demo.com/contact</a> </li>
                </ul>
           </section>
             
            </div>
            <ScrollToTopButton />
        </main>
        </>
       
     );
}
 
export default Privacy;