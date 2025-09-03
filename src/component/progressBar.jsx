// components/ProgressBar.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ProgressBar() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("0%");
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isRefresh = performance
    .getEntriesByType("navigation")
    ?.[0]?.type === "reload"
    
    useEffect(() => {
        if (isHome || isRefresh) return; 
        setLoading(true);
        setProgress("0%");
        document.body.style.overflow = "auto";
        const startTimer = setTimeout(() => {
            setProgress("100%");
        }, 100);
        const endTimer = setTimeout(() => {
            setLoading(false);
                document.body.style.overflow = "auto"; 
        }, 1600); 

        return () => {
            clearTimeout(startTimer);
            clearTimeout(endTimer);
        };
    }, [location.key]);

  return (
    loading && (
       <div className="hidden md:block  fixed top-0 left-0 w-full h-1 z-[9999] bg-transparent">
            <div className="h-[3px] bg-cyan-600 transition-all duration-[1500ms]" style={{ width: progress }}/>
       </div>
    )
  );
}


