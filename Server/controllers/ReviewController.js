const Reviews = require("../models/review");

const review = {
    addReview: async (req, res) => {
        try {
            console.log("review====>", req.body)
            const {serviceProviderName, userName, review}= req.body
            const newReview = new Reviews({
                serviceProviderName,
                userName,
                review
            })
            await newReview.save()
            res.send({success: "review sent successfully"})
        } catch (error) {
            console.log(error)
        }
    },
    allReviews: async (req, res) => {
        try {
            const reviews = await Reviews.find();
            console.log(reviews);
            res.send(reviews);
          } catch (error) {
            console.log(error);
          }
    },
    oneReview: async (req, res) => {
        try {

            const reviews= await Reviews.find({serviceProviderName: "halim"})
            console.log(reviews)
            res.send(reviews)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = review;