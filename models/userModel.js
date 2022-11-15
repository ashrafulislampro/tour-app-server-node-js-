const { ObjectId } = require("mongodb");
const dbClient = require("../db/dbClient");
const responseHelper = require("../utilities/responseHelper");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const userCollection = dbClient.db("travel-thirsty").collection("user");
const reviewCollection = dbClient.db("travel-thirsty".collection("reviews"));

exports.getOneUserModel = async (email) => {
  const filter = { email };

  const result = await userCollection.findOne(filter);

  return responseHelper.successResponse(result, "Successfully get user");
};

exports.getAllUserModel = async () => {
  const result = (await userCollection.find({}).toArray()).reverse();
  return responseHelper.successResponse(
    result,
    "Successfully get all users",
    result
  );
};

exports.updateUserModel = async (email, data) => {
  const filter = { email };
  const existsUser = await userCollection.findOne(filter);
  const updatedUser = {
    displayName: data.displayName || existsUser.displayName,
    phone: data.phone || existsUser.phone,
    birthday: data.birthday || existsUser.birthday,
    gender: data.gender || existsUser.gender,
    address: data.address || existsUser.address,
  };
  const updatedDoc = {
    $set: updatedUser,
  };
  const result = await userCollection.updateOne(filter, updatedDoc);
  if (!result.acknowledged) {
    return responseHelper.failedResponse(result, "Failed to update user");
  }
  return responseHelper.successResponse(result, "Successfully updated user");
};

exports.updateUserAvatarModel = async (email, img) => {
  if (!img) {
    return responseHelper.failedResponse("Failed to update data");
  }
  const filter = { email };
  const updatedDoc = {
    $set: {
      image: img,
    },
  };
  const result = await userCollection.updateOne(filter, updatedDoc);
  return responseHelper.successResponse(result, "Successfully Update avatar");
};

exports.createUserModel = async (data) => {
  const insertedUserEmail = data.email;
  const exists = await userCollection.findOne({ email: insertedUserEmail });
  if (!exists) {
    const result = await userCollection.insertOne(data);
    return responseHelper.successResponse(
      result,
      "Successfully created a user"
    );
  }
  return responseHelper.failedResponse(exists, "User already exists");
};

exports.makeAdminModel = async (email) => {
  const filter = { email };
  const user = await userCollection.findOne(filter);
  const { _id, ...rest } = user;
  const updatedUser = { ...rest, role: "admin" };
  const updatedDoc = {
    $set: updatedUser,
  };
  const result = await userCollection.updateOne(filter, updatedDoc);
  if (!result.acknowledged) {
    return responseHelper.failedResponse(result, "Failed to make user admin");
  }
  return responseHelper.successResponse(result, "Successfully made user admin");
};

exports.removeAdminModel = async (email) => {
  const filter = { email };
  const user = await userCollection.findOne(filter);
  const { _id, ...rest } = user;
  const updatedUser = { ...rest, role: "not-admin" };
  const updatedDoc = {
    $set: updatedUser,
  };
  const result = await userCollection.updateOne(filter, updatedDoc);
  if (!result.acknowledged) {
    return responseHelper.failedResponse(result, "Failed to remove admin");
  }
  return responseHelper.successResponse(result, "Successfully remove admin");
};

exports.deleteUserModel = async (email) => {
  const result = await userCollection.deleteOne({ email });
  return responseHelper.successResponse(result, "Successfully delete user");
};

exports.getAdmin = async (email) => {
  const user = await userCollection.findOne({ email });
  if (user && user.role === "admin") {
    return { success: true, isAdmin: true };
  }
  return { success: false, isAdmin: false };
};

exports.createPaymentIntendModel = async (price) => {
  if (!price || !process.env.STRIPE_SECRET_KEY) {
    return;
  }
  const nettPrice = parseFloat(price) * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: nettPrice,
    currency: "usd",
  });
  return { success: true, clientSecret: paymentIntent.client_secret };
};

exports.addNewReview = async (review) => {
  if (!review) return;
  const result = await reviewCollection.insertOne(review);
  return { success: true, result };
};

exports.getAllReviews = async () => {
  const reviews = await reviewCollection.find({}.toArray()).reverse();
  return { success: true, reviews };
};
