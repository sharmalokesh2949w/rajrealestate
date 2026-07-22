const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        const params = new URLSearchParams();
        params.append("sheet", "Inquiries");
        params.append("name", name);
        params.append("phone", phone);
        params.append("email", email);
        params.append("message", message);

        const response = await axios.post(
            process.env.GOOGLE_SCRIPT_URL,
            params
        );

        res.json({
            success: true,
            response: response.data
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;