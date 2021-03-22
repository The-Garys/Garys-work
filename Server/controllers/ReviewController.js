const Reviews = require("../models/review");

const review = {
  addReview: async (req, res) => {
    try {
      console.log("review====>", req.body);
      const {
        serviceProviderEmail,
        userId,
        reviewTitle,
        reviewBody,
        rate,
      } = req.body;
      const newReview = new Reviews({
        serviceProviderEmail,
        userId,
        reviewTitle,
        reviewBody,
        rate,
      });
      await newReview.save();
      res.send(newReview);
    } catch (error) {
      console.log("weird error tho ==> ", error);
    }
  },
  allReviews: async (req, res) => {
    try {
      const reviews = await Reviews.find({
        serviceProviderEmail: req.params.spMail,
      });
      console.log("ti ahawa l email", req.params.spMail);
      console.log("brabiiii give me my reviews ==========>", reviews);
      res.send(reviews);
    } catch (error) {
      console.log(error);
    }
  },
  oneReview: async (req, res) => {
    try {
      const reviews = await Reviews.find({ serviceProviderName: "halim" });
      console.log(reviews);
      res.send(reviews);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = review;
