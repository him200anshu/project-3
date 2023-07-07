const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://adminn:adminn123@cluster0.7eucdjx.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userdata = mongoose.model("userdata", userSchema);
module.exports = {
    userdata: userdata,
  };