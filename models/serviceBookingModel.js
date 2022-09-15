const { ObjectId } = require("mongodb");
const dbClient = require("../db/dbClient");
const responseHelper = require("../utilities/responseHelper");

const serviceBookingsCollection = dbClient
  .db("travel-thirsty")
  .collection("service-bookings");

exports.getAllBookedServiceModel = async () => {
  const result = (await serviceBookingsCollection.find({}).toArray()).reverse();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};

exports.getUserBookedServiceModel = async (email) => {
  const result = (
    await serviceBookingsCollection.find({ email }).toArray()
  ).reverse();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};

exports.getSingleBookedServiceModel = async (id) => {
  const result = await serviceBookingsCollection.findOne({ _id: ObjectId(id) });
  return responseHelper.successResponse(
    result,
    "Successfully get Single bookings"
  );
};

exports.postServiceBookingModel = async (data) => {
  const result = await serviceBookingsCollection.insertOne(data);

  if (!result.acknowledged) {
    return responseHelper.failedResponse(result, "Failed to post data");
  }
  return responseHelper.successResponse(result, "Successfully posted data");
};

exports.deleteServiceBookingModel = async (id) => {
  const filter = { _id: id };

  const result = await serviceBookingsCollection.deleteOne(filter);
  if (result.deletedCount > 0) {
    return responseHelper.successResponse(result, "Successfully Delete data");
  }
  return responseHelper.failedResponse(result, "Failed to delete data");
};

exports.updateBookedTourPaymentModel = async (id, transactionID) => {
  const filter = { _id: ObjectId(id) };

  const updatedData = {
    $set: {
      transactionID,
      paid: true,
    },
  };
  const result = await serviceBookingsCollection.updateOne(filter, updatedData);
  return responseHelper.successResponse(result, "Successfully updated");
};
