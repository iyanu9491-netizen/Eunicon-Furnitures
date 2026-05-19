const cloudinary = require('cloudinary').v2;

// console.log(process.env.API_CLOUDNAME, process.env.API_KEY, process.env.API_SECRET)

cloudinary.config({
    cloud_name: process.env.API_CLOUDNAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

module.exports = cloudinary