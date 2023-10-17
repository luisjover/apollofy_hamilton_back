import { v2 as cloudinary } from 'cloudinary'
import config from '../config/config'

cloudinary.config({
    cloud_name: config.cloudinary.cloud,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true
})

export const uploadTrack = async (path: string) => {
    return await cloudinary.uploader.upload(path, {
        folder: 'tracks',
        resource_type: "video"
    })
}

export const uploadAudioBase64 = async (audio: string) => {
    return await cloudinary.uploader.upload(`data:video;base64,${audio}`, {
        resource_type: 'video',
        folder: 'tracks',
        overwrite: true
    })
}

export const uploadCover = async (path: any) => {
    return await cloudinary.uploader.upload(path, {
        folder: 'covers',
        transformation: [{ height: 260, width: 260, crop: "fill" }]
    })
}


export const uploadImageBase64 = async (image: string) => {
    return await cloudinary.uploader.upload(`data:image/png;base64,${image}`, {
        resource_type: 'image',
        folder: 'covers',
        overwrite: true,
        transformation: [{ height: 260, width: 260, crop: "fill" }]
    })
}


export const deleteAudioMedia = async (publicId: any) => {

    const result = await cloudinary.uploader.destroy(publicId, {

        resource_type: "video"
    });

    return result;


}

export const deleteImageMedia = async (publicId: any) => {

    const result = await cloudinary.uploader.destroy(publicId);
    return result;

}
