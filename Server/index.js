const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter= require('./routes/UserRoute');


const uri ="mongodb+srv://ali123:ali123@Garys.virq9.mongodb.net/Garys?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('successfully connected to database');
});
// app.get("/", (req, res) => res.send("Hello World!"));
app.use(express.json());

app.use('/api', userRouter);


const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
