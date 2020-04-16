const express = require("express");
const router = express.Router();
const formideble = require("formidable");
const detect = require("detect-file-type");
const { v1: uuidv1 } = require("uuid");
const fs = require("fs");
const path = require("path");
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
// router.post("/", auth, (req, res) => {
//   const newItem = new Item({
//     name: req.body.name,
//   });
//   newItem.save().then((item) => res.json(item));
// });

//@route DELETE api/items/:id  - delete an item
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ succsess: true })))
    .catch((err) => res.status(404).json({ succsess: false }));
});

//@router create new item with an image for item
router.post("/", (req, res) => {
  const form = new formideble.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) return res.send("Error in file");
    detect.fromFile(files.picture.path, (err, result) => {
      const allowedImageTypes = ["jpg", "jpeg", "png"];
      if (!allowedImageTypes.includes(result.ext))
        return res.send("image is not allowed");
      const pictureName = uuidv1() + "." + result.ext;
      const oldPath = files.picture.path;
      const newPath = path.join(__dirname, "..", "..", "images", pictureName);

      fs.rename(oldPath, newPath, (err) => {
        console.log(oldPath, newPath, err);
        if (err) {
          console.log("error with moving files");
          return;
        }

        const newItem = new Item({
          name: fields.name,
          picture: pictureName,
        });
        console.log(newItem);
        newItem.save().then((item) => res.json(item));
      });
    });
  });
});

//@router add image after item is added
// router.post("/add-image/:id", auth, (req,res)=>{

// })

module.exports = router;
