const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item Model
const Item = require("../../models/Item");

//@route GET api/items  -  gets all items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route POST api/items  - creates an item
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

//@route DELETE api/items/:id  - delete an item
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ succsess: true })))
    .catch((err) => res.status(404).json({ succsess: false }));
});

module.exports = router;
