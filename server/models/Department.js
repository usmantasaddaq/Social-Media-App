const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    departmentname: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
)

const Departmenttable=mongoose.model("Departmenttable", departmentSchema)

module.exports = Departmenttable