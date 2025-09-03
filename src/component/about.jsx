import PageTitle from "./pagetitle";
import { useState } from "react";
import {  IoArrowBack } from "react-icons/io5";
import { IoMdCheckmark, IoIosAdd } from "react-icons/io";
import LoginModal from "./NavBar/Login";
import ScrollToTopButton from "./bottomToTob";
import Footer from "./footer";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function AboutPage() {
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const { t } = useTranslation();
	const navigate = useNavigate();
  return (
   <>
    <PageTitle title="pages.about" />
   < main className="mx-auto w-full max-w-7xl  p-2 mb-6">
        <div className="w-full bg-white fixed top-0 left-0 z-50 flex flex-col items-center justify-center md:hidden ">
			<div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500 dark:bg-[#121212] dark:text-cyan-500 ">
				<button onClick={() => navigate(-1)} className="text-[18px] absolute top-8 left-2" > <IoArrowBack size={25} /> </button>
				<div className="flex items-center justify-center w-full">
					<p className="text-[20px] font-semibold">About Us</p>
				</div>
			</div>
		</div>
        <div className="min-h-screen py-13 mx-auto container px-8 mt-28 ">
            <div className="text-center mb-16 mt-7">
		        <h1 className="text-5xl mb-2  font-semibold mt-7">{t("about.title")}</h1>
                <p className="text-xl  text-gray-500 mt-5 mx-auto max-w-xl ">{t("about.subtitle")}	 </p>
	        </div>
            <div className="p-8 rounded-lg mb-12 shadow-xl dark:bg-[#282828]">
		        <section className="mb-12"> 
		            <p>{t("about.intro1")}.</p>
	                <p className="mt-4">{t("about.intro2")}.</p>
		        </section>
		        <section className="mb-12">  
			        <h2 className="text-xl font-bold mb-6">{t("about.whatWeDo")}</h2>
			        <p className="text-lg mb-8">{t("about.whatWeDoDesc")}.</p>
		            <h3 className="text-2xl font-semibold mb-4">{t("about.services.title")}</h3>
			        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-cyan-200 shadow hover:shadow-md dark:bg-[#1f1f1e]">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="font-semibold tracking-tight leading-none flex items-center gap-2">
							        <p className="text-indigo-600"><IoMdCheckmark/></p>
							        <span>{t("about.services.postAds")}</span>
						        </h1>
					        </div>
				        </div>
				        <div className="rounded-xl border border-cyan-200 shadow hover:shadow-md dark:bg-[#1f1f1e]">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="font-semibold tracking-tight leading-none flex items-center gap-2">
						            <p className="text-indigo-600"><IoMdCheckmark/></p>
							        <span>{t("about.services.manage")}</span>
						        </h1>
					        </div>
				        </div>
				        <div className="rounded-xl border border-cyan-200 shadow hover:shadow-md dark:bg-[#1f1f1e] ">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="font-semibold tracking-tight leading-none flex items-center gap-2">
							        <p className="text-indigo-600"><IoMdCheckmark/></p>
							        <span>{t("about.services.visibility")}</span>
						        </h1>
					        </div>
				        </div>
				        <div className="rounded-xl border border-cyan-200 shadow hover:shadow-md dark:bg-[#1f1f1e] ">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="font-semibold tracking-tight leading-none flex items-center gap-2">
							        <p className="text-indigo-600"><IoMdCheckmark/></p>
							        <span>{t("about.services.categories")}</span>
						        </h1>
					        </div>
				        </div>
				        <div className="rounded-xl border border-cyan-200 shadow hover:shadow-md dark:bg-[#1f1f1e]">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="font-semibold tracking-tight leading-none flex items-center gap-2">
							        <p className="text-indigo-600"><IoMdCheckmark/></p>
							        <span>{t("about.services.search")}</span>
						        </h1>
					        </div>
				        </div> 
						<div className="rounded-xl border border-cyan-200 shadow hover:shadow-md dark:bg-[#1f1f1e]">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="font-semibold tracking-tight leading-none flex items-center gap-2">
							        <p className="text-indigo-600"><IoMdCheckmark/></p>
							        <span>{t("about.services.direct")}</span>
						        </h1>
					        </div>
				        </div>
						<div className="rounded-xl border border-cyan-200 shadow hover:shadow-md dark:bg-[#1f1f1e]">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h1 className="font-semibold tracking-tight leading-none flex items-center gap-2">
							        <p className="text-indigo-600"><IoMdCheckmark/></p>
							        <span>{t("about.services.guide")}</span>
						        </h1>
					        </div>
				        </div>
			        </div>
		        </section>
		        <section className="mb-12 rounded-lg bg-barkground p-6 dark:bg-[#1a1a1a]">
			        <h1 className="mb-6 text-3xl font-bold">{t("about.why.title")}</h1>
			        <div className="space-y-4 ">
                        <div className="flex gap-2">
                            <div className="bg-indigo-600 text-white flex justify-center items-center w-[25px] h-[25px] rounded-full">1</div>
				            <p className="ml-3">{t("about.why.points.easyFree")}</p>
				        </div>
				        <div className="flex gap-2">
                            <div className="bg-indigo-600 text-white flex justify-center items-center w-[25px] h-[25px] rounded-full">2</div>
				            <p className="ml-3">{t("about.why.points.afghanistan")}</p>
				        </div>
				        <div className="flex  gap-2">
                            <div className="bg-indigo-600 text-white flex justify-center items-center w-[25px] h-[25px] rounded-full">3</div>
				            <p className="ml-3">{t("about.why.points.fast")}.</p>
				        </div>
				        <div className="flex gap-2">
                            <div className="bg-indigo-600 text-white flex justify-center items-center w-[25px] h-[25px] rounded-full">4</div>
				            <p className="ml-3">{t("about.why.points.reliable")}					s.</p>
				        </div>
				        <div className="flex gap-2	">
                            <div className="bg-indigo-600 text-white flex justify-center items-center w-[25px] h-[25px] rounded-full">5</div>
				            <p className="ml-3">{t("about.why.points.nationwide")}.</p>
				        </div>
			        </div>
		        </section>
		        <section className="mb-12">
			        <h2 className="text-3xl font-bold mb-4">{t("about.vision")}
					</h2>
			        <p className="border-l-4 border-cyan-200 dark:border-cyan-900 py-2 pl-4 italic ">{t("about.visionText")}.</p>
		        </section>
		        <section >
			        <h2 className="text-3xl font-bold mb-6">{t("about.values.title")}</h2>
		            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border shadow border-indigo-100  hover:border-indigo-300 transtion-colors dark:bg-[#1f1f1e]">
				             <div className="p-4 flex items-center gap-3">
                                <div className="flex items-center justify-center rounded-full size-8">
							        <span className="font-medium">1</span>
						        </div>
						        <span className="font-medium">{t("about.values.honesty")} </span>
				             </div>
			            </div>
			            <div className="rounded-xl border shadow border-indigo-100  hover:border-indigo-300 transtion-colors dark:bg-[#1f1f1e]">
				            <div className="p-4 flex items-center gap-3 mb-3">
                                <div className="flex items-center justify-center rounded-full size-8">
							        <span className="font-medium">2</span>
						        </div>
						         <span className="font-medium ">{t("about.values.trust")}</span>
				             </div>
			            </div>
			            <div className="rounded-xl border shadow border-indigo-100  hover:border-indigo-300 transtion-colors dark:bg-[#1f1f1e]">
				             <div className="p-4 flex items-center gap-3 mb-3">
                                <div className="flex items-center justify-center rounded-full size-8">
							        <span className="font-medium">3</span>
						        </div>
						        <span className="font-medium">{t("about.values.satisfaction")}</span>
				             </div>
			            </div>
			            <div className="rounded-xl border shadow border-indigo-100  hover:border-indigo-300 transtion-colors dark:bg-[#1f1f1e]">
				            <div className="p-4 flex items-center gap-3 mb-3">
                                <div className="flex items-center justify-center rounded-full size-8">
							        <span className="font-medium">4</span>
						        </div>
						        <span className="font-medium">{t("about.values.innovation")}</span>
				            </div>
			            </div>
			            <div className="rounded-xl border shadow border-indigo-100  hover:border-indigo-300 transtion-colors dark:bg-[#1f1f1e]">
				            <div className="p-4 flex items-center gap-3 mb-3">
                                <div className="flex items-center justify-center rounded-full size-8">
							        <span className="font-medium">5</span>
						        </div>
						        <span className="font-medium">{t("about.values.quality")}</span>
				            </div>
			            </div>
			            <div className="rounded-xl border shadow border-indigo-100  hover:border-indigo-300 transtion-colors dark:bg-[#1f1f1e]">
				            <div className="p-4 flex items-center gap-3 mb-3">
                                <div className="flex items-center justify-center rounded-full size-8">
							        <span className="font-medium">6</span>
						        </div>
						        <span className="font-medium">{t("about.values.efficiency")}</span>
				            </div>
			            </div>
			        </div>
		        </section>
	        </div>
            <div className="text-center">
		        <p className="mb-6 text-xl  ">{t("about.join")}</p>
		        <button onClick={()=> setIsLoginModalOpen(!isLoginModalOpen)} className="bg-cyan-600 hover:bg-cyan-400     dark:hover:bg-cyan-700 text-white px-4 py-2 rounded flex items-center gap-1 mx-auto"> < IoIosAdd size={25}/>  <span>{t("about.createAd")}</span></button>
		        {isLoginModalOpen && <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} initialForm="login" />}
	        </div>
        </div>
	    <ScrollToTopButton />
    </main>
	<Footer />
  </>
 
  );
}


export default AboutPage;
