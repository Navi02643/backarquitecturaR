const historymodel = require("../models/history");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  try {
    const history = await historymodel.find();
    if (history.length <= 0) {
      res.status(404).send({
        estatus: "404",
        err: true,
        msg: "No history were found in the database.",
      });
    } else {
      res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Information obtained correctly.",
        cont: {
          history,
        },
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error getting the history.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const history = new historymodel(req.body);
    let err = history.validateSync();
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Error to insert history.",
        cont: {
          err,
        },
      });
    }
    const historyfind = await historymodel.findOne({
      historyname: { $regex: `${history.historyname}$`, $options: "i" },
    });
    if (historyfind) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "The history you are trying to register already exists",
        cont: {
          historyname: historyfind.historyname,
        },
      });
    }
    const newhistory = await history.save();
    if (newhistory.length <= 0) {
      res.status(400).send({
        estatus: "400",
        err: true,
        msg: "Error: history could not be registered.",
        cont: {
          newhistory,
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
      msg: "Error: Error to insert history",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
