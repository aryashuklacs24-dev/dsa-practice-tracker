const express =
require("express");

const router =
express.Router();

const {

syncCodeforces

}

= require(

"../controllers/codeforcesController"

);

router.post(
"/sync",
syncCodeforces
);

module.exports =
router;