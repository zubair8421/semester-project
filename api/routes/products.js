const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling Get requests!"
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling Post requests!"
  });
});

router.get("/:productsId", (req, res, next) => {
  const ID = req.params.productsId;
  if (ID === "kind") {
    res.status(200).json({
      message: "here is the kind ID",
      ID: ID
    });
  } else {
    res.status(200).json({
      message: "WOW u entered an ID"
    });
  }
});

router.patch("/:productsId", (req, res, next) => {
  res.status(200).json({
    message: "Updated the product"
  });
});
router.delete("/:productsId", (req, res, next) => {
  res.status(200).json({
    message: "Deleted the product"
  });
});
module.exports = router;
