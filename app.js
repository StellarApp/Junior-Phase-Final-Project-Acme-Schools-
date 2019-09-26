const express = require("express");
const app = express();
const path = require("path");
const { School, Student } = require("./db").models;

app.use(express.json());
app.use("/build", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/schools", (req, res, next) => {
  School.findAll({
    include: [
      {
        model: Student
      }
    ]
  })
    .then(data => res.send(data))
    .catch(next);
});

app.get("/api/students", (req, res, next) => {
  Student.findAll()
    .then(data => res.send(data))
    .catch(next);
});

app.post("/api/students", (req, res, next) => {
  Student.create(req.body)
    .then(student => res.status(201).send(student))
    .catch(next);
});

app.delete("/api/students/:id", (req, res, next) => {
  console.log("at delete route");
  Student.findByPk(req.params.id)
    .then(
      student => student.destroy()
      // Student.destroy({
      //   where: {
      //     id: student.id
      //   }
      // })
      // student.destroy()
    )
    .then(() => res.status(200))
    .catch(next);
});

app.put("/api/students/:id", (req, res, next) => {
  Student.findByPk(req.params.id)
    .then(student => 
      student.update(req.body))
    .then(() => res.status(200))
    .catch(next);
});

//return error message
app.use((err, req, res, next) => {
  res.status(500).send({ error: err });
});

module.exports = app;
