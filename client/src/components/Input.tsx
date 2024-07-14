"use client"

import { useSession } from "next-auth/react"
import { useRef, useState } from "react";
import { HiOutlinePhotograph } from 'react-icons/hi'

export default function Input() {
    const {data: session} = useSession();
    const [imageFileUrl, setImageFileUrl] = useState <string | null> (null)
    const [selectedFile, setSelectedFile] = useState <File | null> (null)
    const imagePickRef = useRef <HTMLInputElement | null> (null);
    const addImageToPost = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }

    if (!session) return null;
  return (
    <div className="w-full">
        <textarea 
            placeholder="пиши" 
            rows={2} 
            className=" bg-white text-black  w-full rounded-md outline-none indent-2"
        />
        {
            selectedFile && imageFileUrl && (
                <img src={imageFileUrl} alt="image" className="w-full max-h-[256px] object-cover cursor-pointer rounded-md" />
            )
        }
        <div className="flex flex-row justify-between items-center mt-2">
            <HiOutlinePhotograph 
                className="w-6 h-6 cursor-pointer hover:brightness-50 transition-all duration-300"
                onClick={() => imagePickRef.current?.click()}
            />
            <input 
                className=" hidden"
                type="file" 
                ref={imagePickRef} 
                accept="image/*" 
                onChange={addImageToPost}
            />
            <button className=" border border-zinc-800 p-2 rounded-md text-sm bg-zinc-900 hover:brightness-50 transition-all duration-300">
                Отправить
            </button>
        </div>
    </div>
  )
}
