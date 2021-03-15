const AdminMessages = require("../models/AdminMessages.js");

const ContactMessage = {
  AddMessage: async (req, res) => {
    try {
      let { name, phone, email, message } = req.body;
      const newMessage = new AdminMessages({
        name,
        phone,
        email,
        message,
      });

      await newMessage.save();
      res.send("Message Sent");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = ContactMessage;
