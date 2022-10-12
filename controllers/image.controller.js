const Images = require('../models/image');

const getAllImages = async (req, res) => {
    
    try {
        const images = await Images.find();

        if (images.length > 0) {
            return res.status(200).send(images);
        } else {
            return res.status(404).send(`No images found`);
        }
    } catch (err) {
        return res.status(500).send(`Internal server error : ${err}`);
    }

}

const getAnImage = async (req, res) => {
    const { params: { id } } = req;

    try {
        const image = await Images.findOne({ id: id });

        if (image) {
            return res.status(200).send(image);
        } else {
            return res.status(404).send(`No image with id ${id} found`);
        }
    } catch (err) {
        return res.status(500).send(`Internal server error : ${err}`);
    }

}

const uploadAnImage = async (req, res) => {
    const { name, data } = req.files.image;
    try {
        if (name && data) {
            await Images.create({
            image_name: name,
            image: data
            });

            return res.status(201).send(`Image created : ${data}`);
        } else {
            return res.status(400).send(`Bad request,  name or data is not being passed in request`);
        }
        
    } catch (err) {
        return re.status(500).send(`Internal server error : ${err}`);
    }
}

module.exports = {
    getAllImages,
    getAnImage,
    uploadAnImage
}