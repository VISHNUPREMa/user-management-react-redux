const User = require("../MODEL/userSchema");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ name: username });
    if (existingUser) {
      return res.json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: username,
      email: email,
      password: hashedPassword
    });
    console.log("newUser:", newUser);
    res.json({ success: true, message: 'User signup successfully' });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ error: 'Signup failed' });
  }
};

const loginUserValidation = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ name: username });
    if (!user) {
      console.log("Invalid user");
      return res.json({ message: 'Invalid user' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log("Invalid password");
      return res.json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
      expiresIn: '1h',
    });
    console.log("token:", token);
    res.status(200).json({ success: true, token, user });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const filePath = req.file.filename;
    const username = req.body.username;
    console.log("req.file  : ",req.file);
    console.log("file path:", filePath); 
    console.log("username:", username); 
    const userDetails = await User.findOne({name : username});
    
    userDetails.image = filePath;
    await userDetails.save();
   


    res.status(200).json({ success: true, message: 'Image uploaded successfully', filePath,userDetails });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, message: 'Image upload failed' });
  }
};



const verifyAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await User.findOne({ name: username, isAdmin: 1 });
    console.log("admin : ",admin);

    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.password); 
      if (isPasswordValid) {
        console.log("a");
        
    const token = jwt.sign({ adminId: admin._id }, 'admin-secret-key', {
      expiresIn: '1h',
    });
    console.log("token:", token);
        res.status(200).json({ success: true, admin ,token});
      } else {
        console.log("b");
        res.status(401).json({ success: false, message: "Invalid password." });
      }
    } else {
      console.log("c");
      res.status(404).json({ success: false, message: "Admin not found." });
    }
  } catch (error) {
    console.log("verifyAdminLogin function error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
}


const accessUserData = async (req, res) => {
  console.log("abc");
  try {
    console.log("b");
    const allUsers = await User.find({});
    console.log("allUsers : ", allUsers);
    res.status(200).json(allUsers); // Send the user data as a JSON response
  } catch (error) {
    console.log("Error accessing user data: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const deleteUser = async (req,res) =>{
  try {
    const {userid} = req.body;
    console.log("user id : ",userid);
    await User.findByIdAndDelete(userid);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log("error : ",error);
  }
}

const editUser = async (req,res) =>{
  try {
    const {userid , name , email} = req.body;
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

    console.log([userid , name , email]);
    const userDetails = await User.findById(userid);
    if(name.trim() !== ""){
      userDetails.name = name;
    }

    if(email!=="" ){
      if(emailRegex.test(email)){
        userDetails.email = email;
      }else{
        res.status(400).json({message:"Invalid email id"})

      }

      
    }
    await userDetails.save();
    const allUsers = await User.find({})
    
    res.status(200).json({ message: 'User updated successfully',users:allUsers });
  
      
    

    
  } catch (error) {
    console.log("error : ",error);
    
  }
}



module.exports = {
  registerUser,
  loginUserValidation,
  uploadImage,
  verifyAdminLogin,
  accessUserData,
  deleteUser,
  editUser
};
