const User = require("../models/UserModel");
const Donation = require("../models/DonationModel");


const addDonation = async (req, res) => {
    try {
        let { recipientName, bloodType, location, hospital, unitsDonated } = req.body;

        if (!recipientName || !bloodType || !location || !hospital || !unitsDonated) {
            return res.status(400).json({ message: "All fields are required" });
        }

        unitsDonated = Number(unitsDonated);
        if (isNaN(unitsDonated) || unitsDonated <= 0) {
            return res.status(400).json({ message: "Invalid unitsDonated. Must be a positive number." });
        }

        if (req.user.role !== "donor") {
            return res.status(403).json({ message: "Access denied. Only donors can add donations." });
        }

        const newDonation = new Donation({
            donor: req.user.id,
            recipientName,
            bloodType,
            location,
            hospital,
            unitsDonated,
            date: new Date(),
        });

        await newDonation.save();

        const donor = await User.findByIdAndUpdate(
            req.user.id,
            { $inc: { totalUnitsDonated: unitsDonated } },
            { new: true }
        );

        res.status(201).json({
            message: "Donation recorded successfully!",
            donation: {
                donorName: req.user.name,
                bloodType,
                location,
                hospital,
                unitsDonated,
                donationDate: newDonation.date.toISOString().split("T")[0],
            },
            totalUnitsDonated: donor.totalUnitsDonated,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

const getAllDonations = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }

        const donations = await Donation.find().populate("donor", "name email bloodType location totalUnitsDonated");

        res.json(donations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching all donations", error });
    }
};

const getDonationHistory = async (req, res) => {
    try {
        if (req.user.role !== "donor") {
            return res.status(403).json({ message: "Access denied. Only donors can see their donation history." });
        }

        const donations = await Donation.find({ donor: req.user.id }).sort({ date: -1 });

        const donor = await User.findById(req.user.id);
        const totalUnitsDonated = donor?.totalUnitsDonated || 0;

        res.json({ donations, totalUnitsDonated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching donation history", error });
    }
};

module.exports = { addDonation, getAllDonations, getDonationHistory };
