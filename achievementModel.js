const mongoose = require("mongoose");
const achievementModelsch = new mongoose.Schema(
  {
    achievementType: String,
    numberOfAchievements: Number,
    NumberOfUsers: Number,
    averageLikes: Number,
  },
  {
    timestamps: true,
  }
);
const achievementModel = new mongoose.model(
  "achievementModel",
  achievementModelsch
);

//-Type - Likes - AchieverName - DocProof;

const achievementMeta = new mongoose.Schema(
  {
    achType: String,
    Likes: Number,
    achieverName: { type: String, trim: true, sparse: true },
    docProof:Boolean,
    docs:{
        data:buffer,
        content:String
    }
  },
  {
    timestamps: true,
  }
);
const achievementMetaModel = new mongoose.model(
  "achievementMetaModel",
  achievementMeta
);
module.exports = { achievementMetaModel, achievementModel };