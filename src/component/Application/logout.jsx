import { MdOutlineWarningAmber } from "react-icons/md";

const Logout = ({ setOpenLogout,  setUser}) => {

    const handleLogout = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user");
        setOpenLogout(false)
        setUser(false)
    };
    
    return ( 
    <div className="fixed inset-0 bg-black bg-opacity-60 h-screen flex  pt-10 md:pt-0 items-center justify-center z-[1000]">
        <div className="bg-white dark:bg-[#101010] border dark:border-gray-400   px-6 py-5 rounded-xl w-[450px] shadow-lg relative">
            <div  className="absolute -top-10 left-1/2  flex items-center justify-center text-white transform -translate-x-1/2  w-20 h-20 bg-red-600 rounded-full"><MdOutlineWarningAmber size={50}/></div>
            <h1 className="text-center text-2xl font-semibold mt-8">Logout</h1>
            <p className="text-center mt-3 tracking-wide text-lg">Are you sure you want to Log out ?</p>
            <div className="mt-7 flex items-center justify-center gap-5 mx-auto">
                <button  onClick={() =>  setOpenLogout(false)} className="py-3 border-2 rounded-full text-xl border-gray-400 w-full">No</button>
                <button  onClick={handleLogout} className="py-3 bg-red-600 rounded-full text-xl w-full">Yes</button>
           </div>
        </div>
    </div>
   );
}
 
export default Logout;