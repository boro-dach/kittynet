"use client"

import { app } from "@/firebase";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from 'react-icons/hi'

export default function Input() {
    const {data: session} = useSession();
    const [imageFileUrl, setImageFileUrl] = useState <string | null> (null)
    const [selectedFile, setSelectedFile] = useState <File | null> (null)
    const [imageFileUploading, setImageFileUploading] = useState <boolean> (false)
    const [text, setText] = useState <string> ('')
    const [postLoading, setPostLoading] = useState <boolean> (false)
    const imagePickRef = useRef <HTMLInputElement | null> (null);
    const db = getFirestore(app);
    const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImageFileUrl(URL.createObjectURL(file));
        }
    };;

    useEffect(() => {
        if(selectedFile) {
            uploadImageToStorage();
        }
    }, [selectedFile])

    const uploadImageToStorage = () => {
        if (!selectedFile) return

        setImageFileUploading(true);
        const storage = getStorage(app)
        const fileName = new Date().getTime() + '-' + selectedFile?.name
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.log(error);
                setImageFileUploading(false);
                setImageFileUrl(null)
                setSelectedFile(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setImageFileUploading(false)
                });
            }
        )
    };

    const handleSubmit = async () => {
        setPostLoading(true);
        const docRef = await addDoc(collection(db, 'posts'), {
            uid: session?.user.uid,
            username: session?.user.username,
            text,
            Timestamp: serverTimestamp()
        });
        setPostLoading(false);
        setText('');
        setImageFileUrl(null);
        setSelectedFile(null);
        location.reload();
    }

    if (!session) return null;
  return (
    <div className="w-full">
        <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="пиши" 
            rows={2} 
            className=" bg-white text-black  w-full rounded-md outline-none indent-2"
        />
        {
            selectedFile && imageFileUrl && (
                <img
                    src={imageFileUrl} 
                    alt="image" 
                    className={`w-full max-h-[256px] object-cover cursor-pointer rounded-md ${imageFileUploading ? 'animate-pulse' : ''}`} />
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
            <button
                disabled={text.trim() === '' || postLoading || imageFileUploading} 
                onClick={handleSubmit}
                className=" border border-zinc-800 p-2 rounded-md text-sm bg-zinc-900 hover:brightness-50 transition-all duration-300"
                >
                Отправить
            </button>
        </div>
    </div>
  )
}