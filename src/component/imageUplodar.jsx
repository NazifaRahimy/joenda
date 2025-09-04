import { useRef} from "react";
import { LuTrash2 } from "react-icons/lu";// آیکون سطل زباله
import { useTranslation } from "react-i18next";



function ImageUploader({ images, onChange }) {
    const fileInputRef = useRef(null);
    const { t } = useTranslation();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file)
        }));

        // به جای setImages، با onChange به والد اطلاع می‌دهیم
        onChange([...images, ...newImages]);
        fileInputRef.current.value = "";
    };

    const handleRemove = (urlToRemove) => {
        const filtered = images.filter((img) => img.url !== urlToRemove);
        onChange(filtered);
    };

  return (
    <div className="flex flex-col gap-2">
       <label className="text-gray-700">{t("create.adImages")}</label>
        <div className="flex gap-2 flex-wrap">
            {images.map((img, index) => (
            <div key={index} className="relative w-[135px] h-[135px] border rounded overflow-hidden">
                <img src={img.url} alt={`uploaded-${index}`} className="w-full h-full object-cover" />
                <button onClick={() => handleRemove(img.url)}
                className="absolute top-1 right-1 bg-red-600 text-white p-2 rounded hover:bg-red-700" title="Remove" >
                    <LuTrash2 className="w-4 h-4" />
                </button>
            </div>
            ))}

            <button onClick={handleClick} type="button" 
            className="w-[135px] h-[135px] flex flex-col items-center justify-center border-2 border-dashed border-cyan-200 rounded-md cursor-pointer hover:bg-gray-100 px-3">
                <span className="text-2xl text-gray-400">+</span>
                <span className="text-gray-400 text-xs">JPEG, JPG, PNG (Max: 20MB)</span>
            </button>
        </div>
        <input type="file" name="images"  accept=".jpg,.jpeg,.png" multiple ref={fileInputRef}  onChange={handleFileChange} className="hidden"/>
    </div>
  );
}

export default ImageUploader;
