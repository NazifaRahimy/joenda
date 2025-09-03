import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.pageYOffset > 300);
        };

        window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    isVisible && (
        <button onClick={scrollToTop} className="fixed bottom-20 md:bottom-6 right-8 p-3 rounded-full bg-cyan-600 text-white shadow-sm hover:bg-cyan-700 transition duration-300 z-50 text-sm">
            <FaArrowUp />
       </button>
    )
  );
}