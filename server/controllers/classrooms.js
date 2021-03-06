const Classroom = require("../models/classrooms.model");
const Otp = ()=> { 
  var string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
  let OTP = '';
  var len = string.length; 
  for (let i = 0; i < 6; i++ ) { 
    OTP += string[Math.floor(Math.random() * len)]; 
  } 
  return OTP; 
} 

const Get = async (req, res) => {
  const { code } = req.params;
  try {
    const data = await Classroom.findOne({ code: code });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const GetClasses = async (req, res) => {
  const { user } = req.params;
  try {
    const data = await Classroom.find({ users: user });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Create = async (req, res) => {
  const { name, subcode, subject, instructor, users, image } = req.body;
  const code = Otp();
  const newClassroom = new Classroom({
    name,
    subcode,
    subject,
    code,
    instructor,
    users,
    image,
  });
  try {
    await newClassroom.save();
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const Edit = async (req, res) => {
  const { id } = req.params;
  const { name, subcode, subject } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id))
  return res.status(404).send(`No user with id: ${id}`);
  const editedClass = await Classroom.findByIdAndUpdate(
    id,
    {$set: {name : name, subcode: subcode, subject: subject} },
    { new: true }
  );
  res.json(editedClass);
};

const Join = async (req, res) => {
  const { code } = req.params;
  const { user } = req.body;
  const updatedClass = await Classroom.findOneAndUpdate(
    {code : code},
    { $push: { users: user } },
    { new: true }
  );
  res.json(updatedClass);
};

const Leave = async (req, res) => {
<<<<<<< HEAD
  const { code } = req.params;
  const { user } = req.body;
  const updatedUser = await Classroom.findOneAndUpdate(
    {code : code},
    { $pull: { users: user } },
=======
  const { id } = req.params;
  const { user } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No user with id: ${id}`);
  const updatedUser = await Classroom.findByIdAndUpdate(
    id,
    { $set: { users: user } },
>>>>>>> ba27d0fc3e1381d20891663e732383e8c90e6f1f
    { new: true }
  );
  res.json(updatedUser);
};

const Delete = async (req, res) => {
  const { code } = req.params;
  await Classroom.findOneAndRemove({code: code});
  res.json({ message: "Class deleted successfully." });
};

module.exports = { Get, GetClasses, Create, Edit, Join, Leave, Delete };
