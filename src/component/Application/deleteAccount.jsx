import { IoArrowBack } from "react-icons/io5";

const DeleteAccount = ({ setOpenDeleteAccount }) => {

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("auth-token");

    try {
        const response = await fetch("http://localhost:3001/delete-account", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (data.success) {
        
            localStorage.removeItem("auth-token");
            localStorage.removeItem("auth-name");
            setOpenDeleteAccount(false);
            window.location.replace("/");
        } else {
            alert("Failed to delete account: " + data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Error deleting account");
    }
  };

  return (
    <div className="fixed top-0 left-0 bg-white w-full h-screen  flex items-start md:items-center justify-center z-[1000]">
      <div className="bg-gray-100  dark:border dark:border-[#282828] dark:bg-[#232323]  w-full h-screen shadow-lg relative">
        <div className="relative flex w-full justify-start h-20 px-3 bg-cyan-500 dark:bg-[#121212] dark:text-cyan-600">
            <button  className={`back text-[18px] absolute ${  document.documentElement.dir === "rtl" ? "right-3 rotate-180" : "left-2" } top-8`}
            onClick={() => setOpenDeleteAccount(false)}>
                <IoArrowBack size={25} />
            </button>
            <div className="flex items-center justify-center w-full">
                <p className="text-[20px] font-semibold tracking-wide">Delete Account</p>
            </div>
        </div>
        <div className="w-full p-6 flex flex-col items-center justify-center dark:bg-[#232323]">
            <h1 className="mt-5 px-3 text-center tracking-wide text-2xl font-semibold">  Are you sure you want to delete your account? </h1>
            <p className="my-5 px-3 text-gray-400 text-xl text-center tracking-wide">  Deleting your user account will cause the loss of all your data, including your profile, products, list of favorites and transaction records. This action is irreversible. </p>
            <button onClick={handleDeleteAccount} className="bg-red-600 py-3 mt-5 text-black w-full text-xl rounded-full text-center"> Delete Account</button>
            <button onClick={() => setOpenDeleteAccount(false)} className="border-2 text-xl border-gray-400 py-3 w-full rounded-full text-center mt-5" > Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
