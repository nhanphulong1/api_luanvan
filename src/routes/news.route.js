const express = require('express');
const route = express.Router();

const NewsController = require('../controllers/news.controller');

//get News by id
route.get('/', NewsController.getAllNews);
route.get('/count/:title', NewsController.getCountNews);
route.get('/:id', NewsController.getNewsById);
route.get('/search/:title/:number', NewsController.searchNews);

//create News
route.post('/', NewsController.createNews);

//update
route.put('/:id', NewsController.updateNews);

//delete News
route.delete('/:id', NewsController.deleteNews);
module.exports = route;