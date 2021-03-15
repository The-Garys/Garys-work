const Reviews = require("../models/review");

const review = {
    addReview: async (req, res) => {
        try {
            console.log("review====>", req.body)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = review;