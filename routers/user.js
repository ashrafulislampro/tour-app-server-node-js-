const express = require("express");
const userController = require("../controller/userController");
const hotelBookingController = require("../controller/hotelBookingController");
const serviceBookingController = require("../controller/serviceBookingController");

const router = express.Router();

router.get("/single-user", userController.getSingleUser);
router.post("/add-user", userController.createUser);
router.patch("/update-single-user", userController.updateUser);
router.patch("/update-user-avatar", userController.updateUserAvatar);

// bookings
router.get("/get-user-bookedHotel", hotelBookingController.getUserBookedHotel);
router.get(
  "/get-user-bookedService",
  serviceBookingController.getUserBookedServices
);
router.get(
  "/get-singlehotel-booking",
  hotelBookingController.getSingleBookHotel
);
router.get(
  "/get-singletour-booking",
  serviceBookingController.getSingleBookedService
);
router.post("/post-hotel-booking", hotelBookingController.postHotelBookings);
router.post(
  "/post-service-booking",
  serviceBookingController.postServiceBookings
);

router.delete(
  "/delete-service-booking",
  serviceBookingController.deleteServiceBookings
);
router.delete(
  "/delete-hotel-booking",
  hotelBookingController.deleteHotelBookings
);

router.post("/create-payment-intend", userController.createPaymentIntend);
router.patch(
  "/update-hotelBookingPayment-info",
  hotelBookingController.updateBookedHotelPaymentInfo
);
router.patch(
  "/update-tourBookingPayment-info",
  serviceBookingController.updateBookedTourPaymentInfo
);

router.post("/add-review", userController.createReview);
router.get("get-reviews", userController.getReviews);

module.exports = router;

// /api/v1/user/add-review
// /api/v1/user/get-reviews
