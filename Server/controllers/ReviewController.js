const Reviews = require("../models/review");
const Users = require("../models/User");

const review = {
  addReview: async (req, res) => {
    try {
      console.log("review====>", req.body);
      const {
        serviceProviderEmail,
        userName,
        userId,
        reviewTitle,
        reviewBody,
        rate,
      } = req.body;
      const newReview = new Reviews({
        serviceProviderEmail,
        userName,
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
  deleteReview: async (req, res) => {
    try {
      console.log("id from front end ====>", req.params.id);
      const deleteRev = await Reviews.findOneAndDelete({
        _id: req.params.id,
      });
      res.send(deleteRev);
    } catch (err) {
      console.log("deleting review error ==>", err);
    }
  },

  reportReview: async (req, res) => {
    try {
      let reported = await Users.findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        { $inc: { reports: 1 } }
      ).exec();
      res.send({ ok: reported });
    } catch (err) {
      console.log("review err=======>", err);
    }
  },
};

module.exports = review;
