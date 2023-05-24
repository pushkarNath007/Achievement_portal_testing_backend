const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = require("../userMulter");

router.route("/userLogin").post((req, res, next) => {
  try {
    const fileupload = multer({ storage: upload }).single(req.file.fieldname);
    fileupload(req, res, function (err) {
      if (!req.file) {
        return res.sendStatus(404);
      } else if (err instanceof multer.MulterError) {
        return res.sendStatus(500);
      } else if (err) {
        return res.sendStatus(403);
      }
    });
  } catch (err) {
    return res.sendStatus(404);
  }
  if (!req.body) res.sendStatus(401);
});
