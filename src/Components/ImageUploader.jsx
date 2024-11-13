import { useRef, useState } from "react"
import defaultImage from "../assets/avatarSampleImage.avif"
import editIcon from "../assets/edit.png"

function ImageUploader(){
    const [avatarURL, setAvatarURL] = useState(defaultImage);
    const [loading, setLoading] = useState(true);
    const fileUploadRef = useRef();

    function handleImageUpload(e){
        e.preventDefault();
        fileUploadRef.current.click();
    }
    async function uploadImage(){
        setLoading(true)
        const uploadFile = fileUploadRef.current.files[0];
        const formData = new FormData();
        formData.append("file", uploadFile)
        try{
            const response = await fetch("https://api.escuelajs.co/api/v1/files/upload",{
                method:"post",
                body:formData
            })

            if(response.status === 201){
                console.log(response.status)
                const data = await response.json();
                setLoading(false)
                setAvatarURL(data?.location)
                console.log(data?.location)
            }
        }catch(error){
            console.error(error.message);
            setAvatarURL(defaultImage)
        }
        
        // const cachedURL = URL.createObjectURL(uploadFile);
        // console.log(cachedURL);
        // setAvatarURL(cachedURL);
    }
  return (
    <>
    <section className="relative h-56 aspect-square bg-transparent rounded-full mx-auto">
        {
            loading ? <div className="loader relative top-1/3 left-1/3 border-t-[2px] rounded-full border-gray-500 animate-spin
            aspect-square w-20 flex justify-center items-center text-yellow-700"></div> :
            <img src={avatarURL} alt="Avatar" className="h-56 aspect-square object-cover object-center rounded-full peer"/>}
        <form action="" className="">
        <button type="submit"
        onClick={handleImageUpload} 
        className="bottom-10 left-10 absolute">
        <img src={editIcon} alt="editIcon" className="h-5 bg-white/45 transition-opacity duration-500 aspect-square rounded-full" />
        </button>
        <input 
        ref={fileUploadRef}
        onChange={uploadImage} 
        type="file" 
        name="file" 
        id="file" 
        className="hidden"/>
        </form>
    </section>
    </>
  )
}

export default ImageUploader