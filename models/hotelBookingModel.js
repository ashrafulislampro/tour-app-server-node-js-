const dbClient = require("../db/dbClient");
const responseHelper = require("../utilities/responseHelper");

const hotelBookingsCollection = dbClient
  .db("travel-thirsty")
  .collection("hotel-bookings");

exports.getAllBookedHotelModel = async () => {
  const result = await hotelBookingsCollection.find({}).toArray();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};

exports.getUserBookedHotelModel = async (email) => {
  const result = await hotelBookingsCollection.find({ email }).toArray();
  return responseHelper.successResponse(
    result,
    "Successfully get all bookings"
  );
};

exports.postHotelBookingModel = async (data) => {
  const result = await hotelBookingsCollection.insertOne(data);
  if (!result.acknowledged) {
    return responseHelper.failedResponse(result, "Failed to post data");
  }
  return responseHelper.successResponse(result, "Successfully posted data");
};
