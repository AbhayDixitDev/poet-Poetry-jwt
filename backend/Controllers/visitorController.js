const bcrypt = require('bcrypt');
const VisitorModel = require('../Models/visitorModel');
const PoemModel = require('../Models/poemModel');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../Utils/cloudinary');


const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.file;
  console.log(req.file)

    const existingVisitor = await VisitorModel.findOne({ email });

    if (existingVisitor) {
      return res.status(400).json({ message: 'Poet already exists' });
    }

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    
      const result = await cloudinary.uploader.upload(file.path, {
        use_filename: true,
        unique_filename: false
      });
      console.log('Cloudinary upload result:', result); 
  console.log(result.secure_url);
  

    fs.unlinkSync(file.path);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const visitor = await VisitorModel.create({ name, email, password: hash, avatar: result.secure_url });

    res.status(201).json({ message: 'Successfully registered' });
  
};


const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const visitor = await VisitorModel.findOne({ email });
    if (!visitor) {
      return res.status(404).json({ message: 'Poet not found' });
    }

    const isMatch = await bcrypt.compare(password, visitor.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: visitor._id }, 'secret', { expiresIn: '1h' });

    res.status(200).cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', name: visitor.name, avatar: visitor.avatar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const Logout = async (req, res) => {
  try {
    console.log(req.cookies);
    
    res.clearCookie('token', { httpOnly: true });
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const AllPoems = async (req, res) => {
  try {
    const poems = await PoemModel.find({});
    res.status(200).json({ poems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const Likes = async (req, res) => {
  try {
    const visitor = await jwt.verify(req.cookies.token, 'secret')
    console.log(visitor)
    const { poemId } = req.body;
    await VisitorModel.findByIdAndUpdate(visitor.id, { $addToSet: { likes: poemId } }, { new: true });
    // res.status(200).json({ visitor });

    

    const poem = await PoemModel.findByIdAndUpdate(poemId, { $addToSet: { likes: visitor.id } }, { new: true });
    res.status(200).json({message:"Liked"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const LikedPoems = async (req, res) => {
  try {
    const visitor = await jwt.verify(req.cookies.token, 'secret')
    // console.log(visitor)
    const poems = await VisitorModel.findById(visitor.id).populate('likes')
    console.log(poems.likes);
    res.send(poems.likes)
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { Register, Login, Logout, AllPoems, Likes, LikedPoems }