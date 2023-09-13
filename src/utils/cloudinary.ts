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
        folder: 'tracks'
    })
}
export const uploadCover = async (path: string) => {
    return await cloudinary.uploader.upload(path, {
        folder: 'covers'
    })
}
export const deleteMedia = async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId)
}
