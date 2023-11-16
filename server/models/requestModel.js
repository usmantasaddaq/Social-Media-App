import mongoose from "mongoose";

const RequestSchema = mongoose.Schema(
  {
    requestStatus: {
      type: String,
      required: "pending",
    },
    requestedName: {type: String},
    requestedId: {type: String},
    senderId:{type: String},
    senderName:{type: String},
    senderPic:{type: String},
  },
  { timestamps: true }
);

const RequestModel = mongoose.model("Request", RequestSchema);
export default RequestModel;
