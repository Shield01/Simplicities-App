const express = require(`express`);
const authorizeRequest = require('../Middlewares/authoriztion');
const { getAllImages, getAnImage, uploadAnImage } = require("../controllers/image.controller");

const router = express.Router();

router.get(`/all_images`, authorizeRequest, getAllImages);

router.get(`/image/:id`, authorizeRequest, getAnImage);

router.post(`/image`, authorizeRequest, uploadAnImage);

module.exports = router;