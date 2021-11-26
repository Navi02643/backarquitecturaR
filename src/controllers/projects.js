const projectmodel = require("../models/project");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  try {
    const project = await projectmodel.find();
    if (project.length <= 0) {
      res.status(404).send({
        estatus: "404",
        err: true,
        msg: "No projects were found in the database.",
      });
    } else {
      res.status(200).send({
        estatus: "200",
        err: false,
        msg: "Information obtained correctly.",
        cont: {
          project,
        },
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error getting the projects.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const project = new projectmodel(req.body);
    let err = project.validateSync();
    if (err) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Error to insert project.",
        cont: {
          err,
        },
      });
    }
    const projectfind = await projectmodel.findOne({
      projectname: { $regex: `${project.projectname}$`, $options: "i" },
    });
    if (projectfind) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "The project you are trying to register already exists",
        cont: {
          projectname: projectfind.projectname,
        },
      });
    }
    const newproject = await project.save();
    if (newproject.length <= 0) {
      res.status(400).send({
        estatus: "400",
        err: true,
        msg: "Error: project could not be registered.",
        cont: {
          newproject,
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
      msg: "Error: Error to insert project",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.put("/", async (req, res) => {
  try {
    const idProject = req.query.idProject;
    if (req.query.idProject == "") {
      return res.status(400).send({
        estatus: "400",
        err: true,
        msg: "Error: A valid id was not sent.",
        cont: 0,
      });
    }

    req.body._id = idProject;

    const Projectfind = await projectmodel.findById(idProject);

    if (!Projectfind) {
      return res.status(404).send({
        estatus: "404",
        err: true,
        msg: "Error: The project was not found in the database.",
      });
    }
    const newproject = new projectmodel(req.body);
    let err = newproject.validateSync();

    if (err) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Error inserting project.",
        cont: {
          err,
        },
      });
    }
    const Projectupdate = await projectmodel.findByIdAndUpdate(
      idProject,
      { $set: newproject },
      { new: true }
    );
    if (!Projectupdate) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: Trying to update the project.",
        cont: 0,
      });
    } else {
      return res.status(200).json({
        ok: true,
        resp: 200,
        msg: "Success: The project was updated successfully.",
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error: Error updating project.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

app.delete("/", async (req, res) => {
  try {
    if (req.query.idProject == "") {
      return res.status.send({
        estatus: "400",
        err: true,
        msg: "Error: A valid id was not sent.",
        cont: 0,
      });
    }
    idProject = req.query.idProject;
    const Projectfind = await projectmodel.findById(idProject);
    if (!Projectfind) {
      return res.status(404).send({
        estatus: "404",
        err: true,
        msg: "Error: The project was not found in the database.",
        cont: Projectfind,
      });
    }
    const projectdelete = await projectmodel.findOneAndUpdate(
      { _id: Projectfind },
      { $set: { projectstatus: "Cancell" } }
    );
    if (!projectdelete) {
      return res.status(400).json({
        ok: false,
        resp: 400,
        msg: "Error: When trying to delete the project.",
        cont: 0,
      });
    } else {
      return res.status(200).json({
        ok: true,
        resp: 200,
        msg: `Success: the project has been successfully removed.`,
      });
    }
  } catch (err) {
    res.status(500).send({
      estatus: "500",
      err: true,
      msg: "Error: Failed to delete project.",
      cont: {
        err: Object.keys(err).length === 0 ? err.message : err,
      },
    });
  }
});

module.exports = app;
