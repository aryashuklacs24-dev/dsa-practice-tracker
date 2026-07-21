const mongoose = require("mongoose");

const userSettingsSchema = new mongoose.Schema({

    codeforcesHandle:{

        type:String,
        default:""

    }

});

module.exports = mongoose.model(
    "UserSettings",
    userSettingsSchema
);