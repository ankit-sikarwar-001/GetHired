import { User } from "../models/user.model.js";
import bcrypt from "bcryptJs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const {fullName, email, phoneNumber, password, role} = req.body;
    console.log("Register request body:", req.body);
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile:{
        profilePhoto:cloudResponse.secure_url,
      }
    });
    return res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role} = req.body;
    console.log("Login request body:", req.body);
    
    if ( !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }
    // check role
    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    // create token
    const tokenData = {
      userId: user._id,}
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
        _Id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile : user.profile,
    }

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      }).json({
        message: "Welcome back " + user.fullName,
        user,
        success: true,
      });
      
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
    try {
        res
        .clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        })
        .status(200)
        .json({ message: "Logout successfully", success: true });
    } catch (error) {
        console.log(error);
    }
    }

export const updateProfile = async (req, res) => {
  // res.send("update profile");
    try {
        const { fullName, email, phoneNumber, bio, skills} = req.body;
        // cloudinary aayega idhar 
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray ;
        if(skills) skillsArray = skills.split(",");
        console.log(req.id);
        const userId = req.id;
        let user = await User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", success: false });
        }
        // updating user
       
        if(fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;
        // resume come later here 
        if(cloudResponse){
          console.log("Cloudinary secure_url:", cloudResponse.secure_url);
        user.profile.resume = cloudResponse.secure_url;  // save the file
        user.profile.resumeOriginalName = file.originalname; // save the file name 
        }
        await user.save();

        user = {
            _Id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile : user.profile,
        }

        res
            .status(200)
            .json({ message: "Profile updated successfully",user, success: true });
    }
    catch (error) {
        console.log(error);
    }
}