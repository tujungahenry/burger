var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  })
});

router.post("/burgers/create", function(req, res) {
  //
  // save new burger and redirect to '/'
  //
  console.log("\nREQUEST BODY", req.body, "\n")

  burger.create(["burger_name", "devoured"],
      [req.body.burger_name,
        false]
  , function(result) {
    // Send back the ID of the new burger
    // res.json({ id: result.insertId });
    res.redirect("/");

  });
});

router.put("/burgers/:id", function(req, res) {
  //
  // save modified burger and redirect to '/'
  // But res.redirect("/"); doesn't work so use
  // res.sendStatus(200);
  //
  var condition = "id = " + req.params.id;
  burger.update(condition, function(result) {
    console.log("RESULT", result)
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      // res.redirect("/");
      console.log("RES\n", res);
      res.sendStatus(200);
    }
  });
});

module.exports = router;