const express = require('express');
const router = express.Router();

const comicController = require("../controllers/comicController")

router.get("/", comicController.getAllComics)

