const mongoose = require('mongoose');
const User = require('../../models/User');
const ClassRoom = require('../../models/ClassRoom');
const config = require('../../config');
const createToken = require('../../helper/createToken');

//student user
const userId1 = new mongoose.Types.ObjectId();
const user1 = {
  _id: userId1,
  email: 'mike@example.com',
  password: '1234567!',
  positions: 'student',
  name: 'Mike',
  tokens: [createToken(userId1)]
};

//student user2
const userId2 = new mongoose.Types.ObjectId();
const user2 = {
  _id: userId2,
  email: 'bally@example.com',
  password: '1234567!',
  positions: 'student',
  name: 'Bally',
  tokens: [createToken(userId2)]
};

//teacheruser 1
const userId3 = new mongoose.Types.ObjectId();
const user3 = {
  _id: userId3,
  email:  'boy@gmail.com',
  password: '12321333t',
  positions: 'teacher',
  name: 'Boy',
  tokens: [createToken(userId3)]
}

//teacheruser 2
const userId4 = new mongoose.Types.ObjectId();
const user4 = {
  _id: userId4,
  email:  'pee@gmail.com',
  password: '12321333ta',
  positions: 'teacher',
  name: 'Pee',
  tokens: [createToken(userId4)]
}

//classroom Science
const classroomId1 = new mongoose.Types.ObjectId();
const classroom1 = {
  _id: classroomId1,
  name: 'Science',
  description: 'This is science',
  students: [userId1, userId2],
  teachers: [userId3, userId4]
}

const beforeEach = async () => {
  await User.deleteMany();
  await ClassRoom.deleteMany();
  await new ClassRoom(classroom1).save();
  await new User(user1).save();
  await new User(user2).save();
  await new User(user3).save();
};

const afterEach = async () => {
  await User.deleteMany();
  await ClassRoom.deleteMany();
}

module.exports = {
  beforeEach,
  user1,
  user3,
  classroom1,
  afterEach
};
