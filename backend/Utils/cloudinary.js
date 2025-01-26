const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'abhaydixitdev',
    api_key: '171657697537369',
    api_secret: 'icrJp08fmSDfdBW1I5nJ-ErQnZg',
});

module.exports = cloudinary;