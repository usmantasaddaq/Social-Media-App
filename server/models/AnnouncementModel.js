import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema(
  {
    message: {
      type: String,required:true
    },
  },
  {
    timestamps: true,
  }
);

const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);
export default AnnouncementModel;