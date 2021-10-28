const { Vacancy, Contact } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class VacancyControllers {
  async create(req, res, next) {
    try {
      const { title, price, description } = req.body;
      const { file } = req.files;
      let fileName = uuid.v4() + '.pdf';
      file.mv(path.resolve(__dirname, '..', 'static', fileName));
      const vacancy = await Vacancy.create({ title, price, description, file: fileName });
      return res.json(vacancy);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const vacancy = await Vacancy.findAll();
      return res.json(vacancy);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async update(req, res, next) {
    try {
      const vacancy = req.body;
      Vacancy.update(req.body, {
        where: { id: vacancy.id },
      }).then(num => {
        if (num == 1) {
          res.send({
            message: 'Vacancy was updated successfully!',
          });
        } else {
          res.send({
            message: `Cannot update Vacancy with id=${vacancy.id}. Maybe Vacancy was not found or req.body empty.`,
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: 'Error updating Vacancy with id=' + vacancy.id,
        });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      Vacancy.destroy({
        where: { id: id },
      }).then(num => {
        if (num == 1) {
          res.send({
            message: 'Vacancy was deleted successfully!',
          });
        } else {
          res.send({
            message: `Cannot deleted Vacancy with id=${id}. Maybe Vacancy was not found or req.body empty.`,
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: 'Error deleted Vacancy with id=' + id,
        });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new VacancyControllers();
 