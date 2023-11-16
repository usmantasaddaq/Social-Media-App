import AnnouncementModel from "../models/AnnouncementModel.js";

// creating a post

export const createAnnouncements = async (req, res) => {
  const newAnnouncement = new AnnouncementModel(req.body);
    console.log(newAnnouncement);
  try {
    await newAnnouncement.save();
    res.status(200).json(newAnnouncement);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getAllAnnouncements = async (req, res) => {
  
    try {
      const annoucements = await AnnouncementModel.find();
      res.status(200).json(annoucements);
    } catch (error) {
      res.status(500).json(error);
    }
  };