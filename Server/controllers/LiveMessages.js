const messagesModel = require("../models/LiveMessages.js");

const liveMessages = {
  getAllMessages: async (req, res) => {
    try {
      let messages = await messagesModel.find({});
      console.log(messages);
      res.send(messages);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },
  sendMessage: async (req, res) => {
    console.log(req.body);
  },
};
module.exports = liveMessages;
