import { User } from "../models/user.model.js";
import axios from "axios";
import { PDFParse } from "pdf-parse";

export const getAtsScore = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!user.profile.resume) {
      return res.status(400).json({
        message: "Resume not found",
        success: false,
      });
    }

    const response = await axios.get(user.profile.resume, {
      responseType: "arraybuffer",
    });

    // FIXED PDF PARSER
    const parser = new PDFParse({
      data: response.data,
    });

    const result = await parser.getText();

    const resumeText = result.text.toLowerCase();

    const keywords = [
      "javascript",
      "react",
      "node",
      "express",
      "mongodb",
      "java",
      "python",
      "sql",
      "git",
      "api",
      "project",
      "internship",
      "experience",
    ];

    let matched = 0;

    keywords.forEach((item) => {
      if (resumeText.includes(item)) {
        matched++;
      }
    });

    const score = Math.round((matched / keywords.length) * 100);

    return res.status(200).json({
      success: true,
      atsScore: score,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "ATS failed",
    });
  }
};
