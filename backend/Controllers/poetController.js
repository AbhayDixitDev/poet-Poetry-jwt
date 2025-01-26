const bcrypt = require('bcrypt');
const PoetModel = require('../Models/poetModel');
const PoemModel = require('../Models/poemModel');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../Utils/cloudinary');
const ReviewModel = require('../Models/reviewModel');


const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const file = req.file;
  console.log(req.file)

    const existingPoet = await PoetModel.findOne({ email });

    if (existingPoet) {
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

    const poet = await PoetModel.create({ name, email, password: hash, avatar: result.secure_url });

    res.status(201).json({ message: 'Successfully registered' });
  
};


const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const poet = await PoetModel.findOne({ email });
    if (!poet) {
      return res.status(404).json({ message: 'Poet not found' });
    }

    const isMatch = await bcrypt.compare(password, poet.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: poet._id }, 'secret', { expiresIn: '1h' });

    res.status(200).cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' }).json({ message: 'Login successful', name: poet.name, avatar: poet.avatar , id: poet._id});
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

const AddPoem = async (req, res) => {
  const { title, description} = req.body;
  const file = req.file;
  try {
    console.log(req.cookies)
    const token = jwt.verify(req.cookies.token, 'secret')
    console.log(token.id);
    const result = await cloudinary.uploader.upload(file.path, {
      use_filename: true,
      unique_filename: false
    });
    // console.log('Cloudinary upload result:', result); 
  // console.log(result.secure_url);
  
  
  const newPoem = await PoemModel.create({
      title,
      description,
      poster: result.secure_url,
      poet: token.id
    });
  
  await PoetModel.findByIdAndUpdate(token.id,{$push:{poems:newPoem._id}})
  
    res.status(201).json({ message: 'Successfully added', poem:newPoem });
    fs.unlinkSync(file.path);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


const MyPoetry = async (req, res) => {
  const token = jwt.verify(req.cookies.token, 'secret')
  const poems = await PoemModel.find({ poet: token.id });
  res.status(200).json({ poems });
  console.log(poems)
  };


const AllPoems = async (req, res) => {
  const poems = await PoemModel.find();
  res.status(200).json({ poems });
  // console.log(poems)
  };

const AllUsers = async (req, res) => {
  const users = await PoetModel.find();
  res.status(200).json({ users });
  // console.log(users)
  };

const MyReviews = async (req, res) => {
  const token = jwt.verify(req.cookies.token, 'secret')
  const poemsfiltered = await PoemModel.find({poet:token.id})
  // console.log("poemsfiltered",poemsfiltered);
  
  const reviews = await ReviewModel.find({poem:{$in:poemsfiltered.map(poem => poem._id)}}).populate('poem').populate('visitor');
  console.log("reviews",reviews);
 

  res.status(200).json( reviews );
  };

module.exports = { Register, Login, Logout , AddPoem, MyPoetry, AllPoems, AllUsers, MyReviews};