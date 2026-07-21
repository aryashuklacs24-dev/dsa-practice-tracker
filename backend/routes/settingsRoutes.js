const express = require("express");

const router = express.Router();

const {

saveHandle

}

= require(
"../controllers/settingsController"
);

router.post("/handle",saveHandle);

module.exports = router;