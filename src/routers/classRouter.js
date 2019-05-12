const permissionMiddleware = require('../middlewares/permissionMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const ClassRoom = require('../models/ClassRoom');
const User = require('../models/User');

module.exports = (app) => {
  // teacher have only permission to add class
  app.post('/addClass', authMiddleware, permissionMiddleware, async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;

    if(!name || !description) {
      res.status(400).send({
        error: "you must fill in name and description"
      });
    }

    const response = await new ClassRoom({
      name,
      description,
      teachers: [req.user._id]
    }).save();
    res.status(201).send({
      messages: response
    });
  });

  // show all ClassRoom
  app.get('/classroom', async (req, res) => {
    const response = await ClassRoom.find();
    res.send({
      data: response
    });
  })

  // show specific classRoom
  app.get('/classroom/:id', async (req, res) => {
    const classroomId = req.params.id;
    const response = ClassRoom.findById(classroomId);
    response.exec(function(err, data) {
      if(err) {
        res.send(err)
      }
      res.send(data);
    });
  })

  //search
  app.get('/search', async (req, res) => {
    const name = req.query.name;
    const teacher = req.query.teacher;
    const regexName = new RegExp(name, "ig");
    const regexTeacher = new RegExp(teacher, "ig");

    if (name) {
      const response = ClassRoom.find({ name: regexName });
      response.exec((err, data) => {
        if(err) {
        res.status(500).send(err);
        }
        res.status(200).send(data);
      })
    }
    if (teacher) {
      const response = ClassRoom.find({ teachers: teacher });
      response.exec((err, data) => {
        if(err) {
          res.status(500).send(err);
        }
        res.status(200).send(data);
      })
    }
    if(!name && !teacher) {
      res.status(400).send({
        error: "you don't provide informations"
      });
    }
  })

  // delete classRoom
  app.delete('/delete/:id', async (req, res) => {
    const idClassroom = req.params.id;
    try {
      const classroom = await ClassRoom.findByIdAndRemove(idClassroom);
      if(!classroom) {
        res.status(404).send({
          message: "can't find this classroom"
        })
      } else {
        res.status(200).send({
          message: classroom
        })
      }
    } catch (err) {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "not found"
          });
      }
      return res.status(500).send({
          message: "Could not delete classroom"
      });
    }
  });

  // update
  // Find Book and update it
  app.put('/update/classroom/:id', authMiddleware, permissionMiddleware, async (req, res) => {
    const idClassroom = req.params.id;
    const name = req.body.name;
    const description = req.body.description;

    const response = await ClassRoom.findOne({ _id: idClassroom});
    const teacherToSting = response.teachers.map((data) => {
      return data.toString();
    });

    // teacher who created that class has permission to update
    if(teacherToSting.includes(req.user._id.toString())) {
      response.name = name;
      response.description = description;
      const response1 = await response.save();
      res.status(200).send({});
    } else {
      res.status(401).send({
        message: "you don't have permission"
      })
    }

    // try {
    //   const response = await ClassRoom.findOneAndUpdate({ _id : idClassroom }, {
    //     name: name,
    //     description: description
    //   }, {
    //
    //   });
    //   if(!response) {
    //     res.status(404).send({
    //       message: "cannot found"
    //     })
    //   } else {
    //     res.status(200).send({
    //       message: response
    //     })
    //   }
    // } catch(err) {
    //   res.status(500).send({
    //     message: "error"
    //   })
    // }
  })
};
