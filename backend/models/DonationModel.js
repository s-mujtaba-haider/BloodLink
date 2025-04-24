const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
    {
        donor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        recipientName: {
            type: String,
            required: true,
        },
        bloodType: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        hospital: {
            type: String,
            required: true,
        },
        unitsDonated: { 
            type: Number,
            required: true,
            min: 1,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
