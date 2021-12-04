const NewsModel = require('../models/news.model');

//get all news
exports.getAllNews = (req, res) => {
    NewsModel.getAllNews((err, News) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'News Selected Successfully!', data: News });
    })
}

//search news
exports.searchNews = (req, res) => {
    NewsModel.getNewsByName(req.params.title, (err, News) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'News Selected Successfully!', data: News });
    })
}


//get News by ID
exports.getNewsById = (req, res) => {
    NewsModel.getNewsByID(req.params.id, (err, News) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'News Selected Successfully!', data: News });
    })
}

//create new News
exports.createNews = (req, res) => {
    const NewsReqData = new NewsModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        NewsModel.createNews(NewsReqData, (err, News) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'News Created Successfully!', data: News });
        });
    }
}

//create new News
exports.updateNews = (req, res) => {
    const NewsReqData = new NewsModel(req.body);
    // check null
    if (req.body.contructor === Object && Object.keys(req.body).length === 0) {
        return req.send(400).send({ status: 0, message: 'Please fill all fields' });
    } else {
        NewsModel.updateNews(req.params.id, NewsReqData, (err, News) => {
            if (err) {
                return res.json({ status: 0, message: err });
            }
            return res.json({ status: 1, message: 'News Updated Successfully!', data: News });
        });
    }
}

//delete News
exports.deleteNews = (req, res) => {
    NewsModel.deleteNews(req.params.id, (err, News) => {
        if (err) {
            return res.json({ status: 0, message: err });
        }
        return res.json({ status: 1, message: 'News Deleted Successfully!' });
    })
}