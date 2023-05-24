const { parse } = require("dotenv");
const mongoose = require("mongoose");
const format = require("date-and-time");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//user info
const userSch = new mongoose.Schema(
  {
    userID: {
      Type: String,
      trim: true,
      required: true,
      sparse: true,
    },
    userFname: {
      type: String,
      trim: true,
      required: true,
    },
    userLname: {
      type: String,
      trim: true,
      required: true,
    },
    userEmail: {
      type: String,
      trim: true,
      required: true,
    },
    userPassword: {
      type: String,
      trim: true,
      parse: true,
      required: true,
    },
    userPic: {
      data: Buffer,
      content: String,
    },
    userPhone: {
      type: Number,
      trim: true,
      required: true,
    },
    userGender: {
      type: String,
      enum: ["male", "female"],
    },
  },
  {
    timestamps: true,
  }
);
userSch.pre("save", function (next) {
  if (this.isModified("userPassword")) {
    this.userPassword = bcrypt.hashSync(
      this.userPassword,
      this.userPassword.toString().length
    );
  }
  next();
});
const userInfo = new mongoose.model("userInfo", userSch);
// userFeedBack
const userFeedsch = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "userInfo" },
    IDCard: { data: Buffer, content: String },
  },
  {
    timestamps: true,
  }
);

const userFeed = new mongoose.model("userFeed", userFeedsch);

//User Feedback
const userFeedbackSch = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "userInfo" },
    Content: { type: String },
  },
  {
    timestamps: true,
  }
);
const userFeedback = new mongoose.model("userFeedback", userFeedbackSch);

const userAchievementSch = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "userInfo" },
    achievementTitle: { type: String, trim: true, required: true },
    imageAchievement: {
      data: Buffer,
      content: String,
    },
    Description: { String },
    institute: { type: string, trim: true },
    Date: { type: Date, default: format(new Date(), "YYYY/MM/DD HH:mm:ss") },
  },
  {
    timestamps: true,
  }
);
const userAchievement = new mongoose.model(
  "userAchievement",
  userAchievementSch
);
//user Aunthentication

const userAuthSch = new mongoose.Schema(
  {
    uid: { type: mongoose.Types.ObjectId, ref: "userInfo" },
    tokens: [{ token: { type: String, required: true } }],
  },
  { timestamps: true }
);

// storing tokens in model
userAuthSch.methods.Authtoken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  this.tokens = this.tokens.concat({ token });
  this.save((err) => {
    if (err) throw err;
  });
  return token;
};

const userAuthentication = new mongoose.model(
  "userAuthentication",
  userAuthSch
);
module.exports = {
  userInfo,
  userAchievement,
  userFeedback,
  userFeed,
  userAuthentication,
};
