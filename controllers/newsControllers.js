const { News } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');


class NewsControllers {
  async create(req, res, next) {
    try {
      const { title, description1, description2, description3 } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const brand = await News.create({ title, description1, description2, description3, img: fileName });
      return res.json(brand);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }


  async getAll(req, res, next) {
    try {
      const news = await News.findAll();
      return res.json(news);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const news = req.body;
      News.update(req.body, {
        where: { id: news.id },
      }).then(num => {
        if (num == 1) {
          res.send({
            message: 'News was updated successfully!',
          });
        } else {
          res.send({
            message: `Cannot update News with id=${news.id}. Maybe News was not found or req.body empty.`,
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: 'Error updating News with id=' + news.id,
        });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      News.destroy({
        where: { id: id },
      }).then(num => {
        if (num == 1) {
          res.send({
            message: 'News was deleted successfully!',
          });
        } else {
          res.send({
            message: `Cannot deleted News with id=${id}. Maybe News was not found or req.body empty.`,
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: 'Error deleted News with id=' + id,
        });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new NewsControllers();
