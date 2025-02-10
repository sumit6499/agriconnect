import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadImageToCloudinary = async (file:File) => {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const res= await new Promise<string>((res,rej) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "marketplace"
                },
                (error,result) => {
                    if(error) rej(error);
                    else res(result?.secure_url as string);
                }
            )
            uploadStream.end(buffer);
        })

        return res;
    } catch (error) {
        return error
    }
    
}