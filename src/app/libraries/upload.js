import fs from 'fs'
import streamifier from 'streamifier'
import cloudinary from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default class Upload {

	static imageFromFile(file) {
		return new Promise((resolve, reject) => {
			return cloudinary.uploader.upload(file, (err, res) => {
				if (err)
					reject(err)
				else {
					resolve(res)
				}
			})

		})

	}

	static image(file) {

		return new Promise((resolve, reject) => {
			const stream = cloudinary.v2.uploader.upload_stream({resource_type: 'image'}, (err, res) => {
				if (err) {
					reject(err)
				}
				else {
					resolve(res)
				}
			});

			stream.end(file.data)

		})

	}

}
