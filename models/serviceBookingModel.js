const dbClient = require("../db/dbClient");
const responseHelper = require("../utilities/responseHelper");

const serviceBookingsCollection = dbClient
  .db("travel-thirsty")
  .collection("service-bookings");

exports.getAllBookedServiceModel = async () => {
  const result = await serviceBookingsCollection.find({}).toArray();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};

exports.getUserBookedServiceModel = async (email) => {
  const result = await serviceBookingsCollection.find({ email }).toArray();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};

exports.postServiceBookingModel = async (data) => {
  const result = await serviceBookingsCollection.insertOne(data);
  if (!result.acknowledged) {
    return responseHelper.failedResponse(result, "Failed to post data");
  }
  return responseHelper.successResponse(result, "Successfully posted data");
};
