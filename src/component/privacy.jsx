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
                <h1 className="text-4xl font-bold ">{t("privacy.title")}</h1>
                <p className="text-lg">{t("privacy.intro")}.</p>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article1.title")}</h1>
                    <div><p className="mb-4">{t("privacy.sections.article1.paragraph")}</p></div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article2.title")}</h1>
                    <div>
                        <div className="mb-4">{t("privacy.sections.article2.paragraphs", { returnObjects: true }).map((paragraph, index) => (  <p key={index} className="mb-4">{paragraph}</p>))} </div>
                    </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article3.title")}        </h1>
                    <div>
                        <div className="mb-4">{t("privacy.sections.article3.paragraphs", { returnObjects: true }).map((paragraph, index) => (  <p key={index} className="mb-4">{paragraph}</p>       ))} </div>
                    </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article4.title")}</h1>
                    <div>
                        <div className="mb-4"> {t("privacy.sections.article4.paragraphs", { returnObjects: true }).map((paragraph, index) => ( <p key={index} className="mb-4">{paragraph}</p>  ))} </div>
                     </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article5.title")}   </h1>
                    <div>
                        <div className="mb-4">{t("privacy.sections.article5.paragraphs", { returnObjects: true }).map((paragraph, index) => ( <p key={index} className="mb-4">{paragraph}</p>))}    </div>
                   </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article6.title")} </h1>
                    <div>
                        <div  className="mb-4">{t("privacy.sections.article6.paragraphs", { returnObjects: true }).map((paragraph, index) => ( <p key={index} className="mb-4">{paragraph}</p>))}    </div>
                    </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article7.title")}  </h1>
                    <div><div className="mb-4"> {t("privacy.sections.article7.paragraphs", { returnObjects: true }).map((paragraph, index) => (  <p key={index} className="mb-4">{paragraph}</p>))}  </div></div>
                    <div className="mt-6 rounded-lg bg-blue-50 p-4"><p className="font-medium text-blue-700">{t("privacy.sections.article7.tip")}</p></div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article8.title")}   </h1>
                    <div>
                        <div  className="mb-4">  {t("privacy.sections.article8.paragraphs", { returnObjects: true }).map((paragraph, index) => (  <p key={index} className="mb-4">{paragraph}</p>))}</div>
                    </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article9.title")}</h1>
                    <div>
                        <div className="mb-4">{t("privacy.sections.article9.paragraphs", { returnObjects: true }).map((paragraph, index) => (  <p key={index} className="mb-4">{paragraph}</p>))}</div>
                    </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article10.title")}</h1>
                    <div>
                        <div  className="mb-4">  {t("privacy.sections.article10.paragraphs", { returnObjects: true }).map((paragraph, index) => ( <p key={index} className="mb-4">{paragraph}</p>))}    </div>
                    </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article11.title")}</h1>
                    <div>
                        <div  className="mb-4"> {t("privacy.sections.article11.paragraphs", { returnObjects: true }).map((paragraph, index) => (  <p key={index} className="mb-4">{paragraph}</p>))}      </div>
                    </div>
                </section>
                <section className="border-b border-gray-200 pb-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.article12.title")}</h1>
                    <div>
                        <div  className="mb-4">{t("privacy.sections.article12.paragraphs", { returnObjects: true }).map((paragraph, index) => (  <p key={index} className="mb-4">{paragraph}</p>))} </div>
                    </div>
                </section>
                <section className="mt-8">
                    <h1 className="mt-4 mb-8 text-2xl font-semibold">{t("privacy.sections.contactUs.title")}</h1>
                    <div>
                        <p  className="mb-4">{t("privacy.sections.contactUs.description")}</p>
                        <ul className="space-y-2 mt-4 list-decimal">
                            <li><strong>{t("privacy.sections.contactUs.items.email")}:  </strong><a  href="mailto:gangyab.f@gmail.com" className="text-blue-500">azpag.af@gmail.com</a></li>
                            <li><strong>ٌ{t("privacy.sections.contactUs.items.website")}:     </strong><a href="/contact" target="_blank" className="text-blue-500">www.azpag.app/fa/contact</a></li>
                        </ul>
                    </div>
                    <p className="mt-8 text-gray-500 text-sm">{t("privacy.updated")}</p>
                </section>
            </div>
            <ScrollToTopButton />
        </main>
        </>
       
     );
}
 
export default Privacy;