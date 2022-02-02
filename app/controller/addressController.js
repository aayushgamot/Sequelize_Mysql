const db = require("../models/sequelize");
const Address = db.address;
const { GeneralError } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const config = require("../utils/config");
const logger = require("../logger/logger");

exports.multiAddAddress = async (req, res, next) => {
  try {
    const { error } = addressValid(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const data = [req.body];
      for (var i in data) {
        await Address.bulkCreate(data[i]);
      }
      next(new GeneralError("All Data Added", data, config.HTTP_ACCEPTED));
      res.send("data add");
    }
  } catch (err) {
    logger.error(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.findAddress = async (req, res, next) => {
  try {
    const data = await Address.findAll();
    if (data) {
      await next(
        new GeneralResponse("User Details", data, config.HTTP_SUCCESS)
      );
    } else {
      next(
        new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED)
      );
    }
  } catch (err) {
    logger.log(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.findAddressById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Address.findByPk(id);
    if (data) {
      await next(
        new GeneralResponse("User Details", data, config.HTTP_SUCCESS)
      );
    } else {
      next(new GeneralError("Id not Found", undefined, config.HTTP_NOT_FOUND));
    }
  } catch (err) {
    logger.log(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { error } = addressUpdate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const data = {
        title: req.body.title,
        address1: req.body.address1,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
      };

      const updateData = await Address.update(data, {
        where: { id: req.params.id },
      });
      if (updateData) {
        await next(
          new GeneralResponse("Data Updated", updateData, config.HTTP_SUCCESS)
        );
      } else {
        logger.error(err);
        next(
          new GeneralError("Data not Updated", undefined, config.HTTP_ACCEPTED)
        );
      }
    }
  } catch (err) {
    logger.error(err);
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Address.findByPk(id);
    if (data) {
      data.destroy(id);
      await next(new GeneralResponse("Data Deleted...'", config.HTTP_SUCCESS));
    } else {
      next(new GeneralError("Id not Found", undefined, config.HTTP_NOT_FOUND));
    }
  } catch (err) {
    next(new GeneralError("Something Wrong", undefined, config.HTTP_ACCEPTED));
  }
};
