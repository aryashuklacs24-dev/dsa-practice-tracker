const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({

    questionName: {

        type: String,
        required: true

    },

    topic: {

        type: String,
        default: "General"

    },

    difficulty: {

        type: String,

        enum: [

            "Easy",
            "Medium",
            "Hard",
            "Unknown"

        ],

        default: "Unknown"

    },

    platform: {

        type: String,
        default: "Unknown"

    },

    notes: {

        type: String,
        default: ""

    },

    solvedDate: {

        type: Date,
        default: Date.now

    },
    cfHandle: {

        type: String,

        default: ""

    },

    link: {

        type: String,
        default: ""

    }

});

module.exports =
    mongoose.model(
        "Problem",
        problemSchema
    );