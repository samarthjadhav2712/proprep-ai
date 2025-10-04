import React, { useRef, useState } from 'react';
// Replaced react-icons with lucide-react
import { User, Upload, Trash2 } from 'lucide-react';

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);

            const filePreview = URL.createObjectURL(file);
            if (setPreview) {
                setPreview(filePreview);
            }
            setPreviewUrl(filePreview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if (setPreview) {
            setPreview(null);
        }
        // Also clear the file input value
        if(inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className='flex justify-center mb-6'>
            <input 
                type="file" 
                accept='image/*' 
                ref={inputRef} 
                onChange={handleImageChange} 
                className='hidden'
            />

            {!image ? (
                <div className='w-24 h-24 flex items-center justify-center bg-amber-100 rounded-full relative cursor-pointer group'>
                    <User className="w-12 h-12 text-amber-500 group-hover:scale-105 transition-transform" />
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-md hover:scale-110 transition-transform'
                        onClick={onChooseFile}
                    >
                        <Upload className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img src={preview || previewUrl} alt="profile photo" className='w-24 h-24 rounded-full object-cover shadow-lg' />
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer shadow-md hover:scale-110 transition-transform'
                        onClick={handleRemoveImage}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;
