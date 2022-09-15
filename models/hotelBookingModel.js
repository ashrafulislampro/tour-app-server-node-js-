const { ObjectId } = require("mongodb");
const dbClient = require("../db/dbClient");
const responseHelper = require("../utilities/responseHelper");

const hotelBookingsCollection = dbClient
  .db("travel-thirsty")
  .collection("hotel-bookings");

exports.getAllBookedHotelModel = async () => {
  const result = (await hotelBookingsCollection.find({}).toArray()).reverse();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};

exports.getUserBookedHotelModel = async (email) => {
  const result = (
    await hotelBookingsCollection.find({ email }).toArray()
  ).reverse();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};
exports.getUserBookedSingleHotelModel = async (id) => {
  const result = await hotelBookingsCollection.findOne({ _id: ObjectId(id) });
  return responseHelper.successResponse(
    result,
    "Successfully get Single bookings"
  );
};

exports.postHotelBookingModel = async (data) => {
  const result = await hotelBookingsCollection.insertOne(data);
  if (!result.acknowledged) {
    return responseHelper.failedResponse(result, "Failed to post data");
  }
  return responseHelper.successResponse(result, "Successfully posted data");
};

exports.deleteHotelBookingModel = async (id) => {
  const filter = { _id: ObjectId(id) };
  const result = await hotelBookingsCollection.deleteOne(filter);
  if (result.deletedCount > 0) {
    return responseHelper.successResponse(result, "Successfully Delete data");
  }
  return responseHelper.failedResponse(result, "Failed to delete data");
};

exports.updateBookedHotelPaymentModel = async (id, transactionID) => {
  const filter = { _id: ObjectId(id) };
  const updatedData = {
    $set: {
      transactionID,
      paid: true,
    },
  };
  const result = await hotelBookingsCollection.updateOne(filter, updatedData);
  return responseHelper.successResponse(result, "Successfully updated");
};
