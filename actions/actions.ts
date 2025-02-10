'use server'
import {uploadImageToCloudinary} from '@/lib/cloudinary.config'

export const getImageURL= async (file:File) =>{
    try {
        const uploadUrl = await uploadImageToCloudinary(file)
        console.log(uploadUrl)
        return {success: true, url: uploadUrl}
    } catch (error) {
        console.log(error)
    }
}