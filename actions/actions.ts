'use server'
import {uploadImageToCloudinary} from '@/lib/cloudinary.config'
import { db } from "@/lib/db.config";
import { revalidatePath } from "next/cache";


export const getImageURL= async (file:File) =>{
    try {
        const uploadUrl = await uploadImageToCloudinary(file)
        console.log(uploadUrl)
        return {success: true, url: uploadUrl}
    } catch (error) {
        console.log(error)
    }
}



export async function deleteProduct(id:string) {
  try {
    await db.product.delete({
      where: { id },
    });
    
    revalidatePath('/products');
    
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: (error as Error).message };
  }
}