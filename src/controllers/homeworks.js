const homeworkmodel = require("../models/homeworks");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  try {
    const homework = await homeworkmodel.find();
    if (homework.length <= 0) {
      res.status(404).send({
        estatus: "404",
        err: true,
        msg: "No homeworks were found in the database.",
      });
    } else {
      res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Information obtained correctly.",
        cont: {
          homework,
        },
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error getting the homeworks.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const homework = new homeworkmodel(req.body);
    let err = homework.validateSync();
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Error to insert homework.",
        cont: {
          err,
        },
      });
    }
    const homeworkfind = await homeworkmodel.findOne({
      homeworkname: { $regex: `${homework.homeworkname}$`, $options: "i" },
    });
    if (homeworkfind) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "The homework you are trying to register already exists",
        cont: {
          homeworkname: homeworkfind.homeworkname,
        },
      });
    }
    const newhomework = await homework.save();
    if (newhomework.length <= 0) {
      res.status(400).send({
        estatus: "400",
        err: true,
        msg: "Error: homework could not be registered.",
        cont: {
          newhomework,
        },
      });
    } else {
      res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Success: Information inserted correctly.",
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error: Error to insert homework",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.put("/", async (req, res) => {
  try {
    const idhomework = req.query.idhomework;
    if (req.query.idhomework == "") {
      return res.status(400).send({
        estatus: "400",
        err: true,
        msg: "Error: A valid id was not sent.",
        cont: 0,
      });
    }

    req.body._id = idhomework;

    const homeworkfind = await homeworkmodel.findById(idhomework);

    if (!homeworkfind) {
      return res.status(404).send({
        estatus: "404",
        err: true,
        msg: "Error: The homework was not found in the database.",
      });
    }
    const newhomework = new homeworkmodel(req.body);
    let err = newhomework.validateSync();

    if (err) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Error inserting homework.",
        cont: {
          err,
        },
      });
    }
    const homeworkupdate = await homeworkmodel.findByIdAndUpdate(
      idhomework,
      { $set: newhomework },
      { new: true }
    );
    if (!homeworkupdate) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Trying to update the homework.",
        cont: 0,
      });
    } else {
      return res.status(200).json({
        ok: true,
        resp: 200,
        msg: "Success: The homework was updated successfully.",
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error: Error updating homework.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.delete("/", async (req, res) => {
  try {
    if (req.query.idhomework == "") {
      return res.status.send({
        estatus: "400",
        err: true,
        msg: "Error: A valid id was not sent.",
        cont: 0,
      });
    }
    idhomework = req.query.idhomework;
    const homeworkfind = await homeworkmodel.findById(idhomework);
    if (!homeworkfind) {
      return res.status(404).send({
        estatus: "404",
        err: true,
        msg: "Error: The homework was not found in the database.",
        cont: homeworkfind,
      });
    }
    const homeworkdelete = await homeworkmodel.findOneAndUpdate(
      { _id: homeworkfind },
      { $set: { homeworkstatus: "Cancell" } }
    );
    if (!homeworkdelete) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: When trying to delete the homework.",
        cont: 0,
      });
    } else {
      return res.status(200).json({
        ok: true,
        resp: 200,
        msg: `Success: the homework has been successfully removed.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error: Failed to delete homework.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
