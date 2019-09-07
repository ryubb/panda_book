const mongoose = require("mongoose");
const User = require("../schema/User");

const dbConfig = () => {
  return mongoose.connect("mongodb://localhost:27017/chatapp", err => {
    if (err) {
      console.log(err);
    } else {
      // ここにMockユーザーを入れれそう
      const newUser = new User({
        username: "ryubb",
        password: "ryubb"
      });
      newUser.save(err => {
        if (err) throw err;
      });
      console.log("successfully connected to MongoDB.");
    }
  });
};

export default dbConfig;
