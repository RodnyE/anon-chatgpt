
const axios = require("axios");
const { askAI } = require("../logic/ask");
const { Router } = require("express");

const router = Router();

router.post("/api/chat", async (req, res) => {
    let body = req.body;
    
    // get response of ask
    let askResponseText = await askAI(body);
    
    // send response
    res.send({
        status: true,
        data: {
            answer: askResponseText,
        }
    })
});

module.exports = router;