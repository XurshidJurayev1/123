const { Contact } = require('../models/models');
const ApiError = require('../error/ApiError');

class ContactControllers {
  async create(req, res, next) {
    try {
      let { name, surname, email, description } = req.body;
      const contact = await Contact.create({ name, surname, email, description });
      return res.json(contact);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }


  }

  async getAll(req, res, next) {
    try {
      const contact = await Contact.findAll();
      return res.json(contact);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async put(req, res, next) {
    try {
      const contact = req.body;
      Contact.update(req.body, {
        where: { id: contact.id },
      }).then(num => {
        if (num == 1) {
          res.send({
            message: 'Contact was updated successfully!',
          });
        } else {
          res.send({
            message: `Cannot update Contact with id=${contact.id}. Maybe Contact was not found or req.body empty.`,
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: 'Error updating Contact with id=' + contact.id,
        });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }

  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;
      Contact.destroy({
        where: { id: id },
      }).then(num => {
        if (num == 1) {
          res.send({
            message: 'Contact was deleted successfully!',
          });
        } else {
          res.send({
            message: `Cannot deleted Contact with id=${id}. Maybe Contact was not found or req.body empty.`,
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: 'Error deleted Contact with id=' + id,
        });
      });
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ContactControllers();
 