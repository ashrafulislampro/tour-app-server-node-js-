const serviceBookingModel = require("../models/serviceBookingModel");

exports.getAllBookedServices = async (req, res) => {
  const response = await serviceBookingModel.getAllBookedServiceModel();
  res.send(response);
};

exports.getUserBookedServices = async (req, res) => {
  const userEmail = req.query.email;
  const response = await serviceBookingModel.getUserBookedServiceModel(
    userEmail
  );
  res.send(response);
};

exports.getSingleBookedService = async (req, res) => {
  const id = req.query.id;
  const response = await serviceBookingModel.getSingleBookedServiceModel(id);
  res.send(response);
};

exports.postServiceBookings = async (req, res) => {
  const bookedService = req.body;
  const response = await serviceBookingModel.postServiceBookingModel(
    bookedService
  );
  res.send(response);
};

exports.deleteServiceBookings = async (req, res) => {
  const id = req.query.id;
  const response = await serviceBookingModel.deleteServiceBookingModel(id);
  res.send(response);
};

exports.updateBookedTourPaymentInfo = async (req, res) => {
  const id = req.query.id;
  const transactionID = req.body.transactionID;
  const response = await serviceBookingModel.updateBookedTourPaymentModel(
    id,
    transactionID
  );
  res.send(response);
};
