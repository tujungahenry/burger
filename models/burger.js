var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    //
    // return all burgers
    //
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  create: function(name, vals, cb) {
    //
    // create burger
    //
    console.log("INSIDE MODEL: VALS", vals)
    orm.create("burgers", name, vals, function(res) {
      cb(res);
    });
  },
  update: function(condition, cb) {
    //
    // modify burger
    //
    console.log(condition, cb)

    // an example of objColVals would be {name: panther, devoured: true}
    orm.update("burgers", condition, cb, function(res) {
      cb(res);
    })
  }
};

module.exports = burger;