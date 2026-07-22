const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const {
            name,
            phone,
            email,
            address,
            qualification,
            experience,
            appliedPosition,
            coverLetter
        } = req.body;

        const params = new URLSearchParams();

        params.append("sheet", "Careers");
        params.append("name", name);
        params.append("phone", phone);
        params.append("email", email);
        params.append("address", address);
        params.append("qualification", qualification);
        params.append("experience", experience);
        params.append("position", appliedPosition);
        console.log("GOOGLE_SCRIPT_URL =", process.env.GOOGLE_SCRIPT_URL);
        const response = await axios.post(
            process.env.GOOGLE_SCRIPT_URL,
            params
        );

        res.json({
            success: true,
            response: response.data
        });

    } catch (err) {
        console.error("Career Route Error:");
        console.error(err.response?.data || err.message);

        res.status(500).json({
            success: false,
            error: err.response?.data || err.message
        });
    }
});

module.exports = router;