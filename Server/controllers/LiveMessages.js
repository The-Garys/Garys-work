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
    try {
      console.log("req.body ==> ", req.body);
      const newMessageSent = new messagesModel(req.body);
      await newMessageSent.save();
      res.send({ message: "Message sent!" });
    } catch (err) {
      console.log("error sent from sending private message ==>", err);
      res.send(err);
    }
  },
};
module.exports = liveMessages;
