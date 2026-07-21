const express = require("express");

const router = express.Router();

const {

    createProblem,
    getProblems,
    deleteProblem,
    updateProblem,
    previewCodeforces,
    importSelected,
    syncCodeforces,
    deleteSelected,
    deleteHandle

} = require("../controllers/problemController");

router.post(
    "/import",
    importSelected
);

router.post(
    "/delete-selected",
    deleteSelected
);

router.post(
    "/sync/:handle",
    syncCodeforces
);

router.get(
    "/preview/:handle",
    previewCodeforces
);

router.delete(
    "/handle/:handle",
    deleteHandle
);

router.post(
    "/",
    createProblem
);

router.get(
    "/",
    getProblems
);

router.delete(
    "/:id",
    deleteProblem
);

router.put(
    "/:id",
    updateProblem
);

module.exports = router;