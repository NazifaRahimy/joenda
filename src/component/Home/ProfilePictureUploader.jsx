import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
function ProfilePictureUploader({ onFileSelect }) {
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            if (onFileSelect) onFileSelect(file);
        }
    };

    return (
    <div className="relative w-48 h-48 mx-auto mt-5">
        <div className="w-40 h-40 rounded-full overflow-hidden border border-gray-300 dark:bg-cyan-600 dark:border-2 dark:border-gray-500 flex items-center justify-center bg-gray-100">
            {preview ? (
                <img src={preview} alt="Profile" className="w-full h-full object-cover" />
            ) : (
                <span className="text-gray-400">+</span>
            )}
        </div>
        <label htmlFor="profileUpload" className="absolute bottom-10 right-12 bg-gray-500 text-white rounded-full p-3 cursor-pointer hover:bg-[#282828]">
            <FiEdit size={25}/>
        </label>
       <input type="file"  id="profileUpload"  className="hidden" accept="image/*"  onChange={handleFileChange}/>
    </div>
  );
}

export default ProfilePictureUploader;
