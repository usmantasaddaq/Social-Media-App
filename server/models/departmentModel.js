import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
{
    title: {
        type: String,
    },
    content: {
        type: String,
    },
}, {
    timestamps: true
});

const DepartmentModel = mongoose.model("Note", NoteSchema);
export default DepartmentModel;