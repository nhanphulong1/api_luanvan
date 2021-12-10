var dbConn = require('../../config/db.config');

var News = function(news) {
    this.n_title = news.n_title;
    this.n_summary = news.n_summary;
    this.n_image = news.n_image;
    this.n_content = news.n_content;
    this.n_status = news.n_status;
    this.cla_id = news.cla_id;
    this.created_at = new Date();
    this.updated_at = new Date();
}

//get All News
News.getAllNews = (result) => {
    dbConn.query(`Select * From News ORDER BY n_id DESC`, (err, res) => {
        if (err) {
            console.log('Error while fetching News', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get All News
News.getCountNews = (title, result) => {
    dbConn.query(`Select COUNT(*) AS n_page From News Where n_title LIKE ? AND n_status != 1`, title, (err, res) => {
        if (err) {
            console.log('Error while fetching News', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get Search News
News.getNewsByName = (title, page, result) => {
    dbConn.query(`Select * From News WHERE n_title LIKE ? AND n_status != 1 ORDER BY n_id DESC Limit ?,3`, [title, page], (err, res) => {
        if (err) {
            console.log('Error while fetching News', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//get News by ID
News.getNewsByID = (id, result) => {
    dbConn.query(`Select * From News WHERE n_id = ?`, id, (err, res) => {
        if (err) {
            console.log('Error while fetching News', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//create News
News.createNews = (NewsReq, result) => {
    dbConn.query(`INSERT INTO News SET ?`, NewsReq, (err, res) => {
        if (err) {
            console.log('Error while fetching News', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

//create News
News.updateNews = (id, NewsReq, result) => {
    dbConn.query(`UPDATE News SET n_title=?,n_summary=?,n_image=?,n_content=?,n_status=?,cla_id=?,updated_at=? WHERE n_id = ?`, [NewsReq.n_title, NewsReq.n_summary, NewsReq.n_image, NewsReq.n_content, NewsReq.n_status, NewsReq.cla_id, NewsReq.updated_at, id],
        (err, res) => {
            if (err) {
                console.log('Error while fetching News', err);
                result(err, null);
            } else {
                result(null, res);
            }
        }
    )
}

//Delete News
News.deleteNews = (id, result) => {
    dbConn.query(`Delete from News Where n_id = ?`, id, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

module.exports = News;