const express = require('express');
const Departmenttable = require("../models/Department")
const { middleware } = require("../utilfold/gentoken")

const departmentRoute = express.Router()

departmentRoute.post('/departments', middleware, async (req, res) => {
    const { departmentname } = req.body;
    // if(req.user.isAdmin){}

    const department = new Departmenttable({
        departmentname,
        user: req.user._id,
    });

    try {
        await department.save();
        res.send(department);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding department' });
    }
});

departmentRoute.delete('/departments/:id', middleware, async (req, res) => {

    // res.status(200).send({ message: "you delete successfully", paramid: req.params.id })
    try {
        // Verify user's authorization token
        const user = req.user;
        if (!user) {
            return res.status(401).json({ msg: 'Authorization token missing or invalid' });
        }

        // Delete department from the database
        const department = await Departmenttable.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ msg: 'Department not found' });
        }
        await department.remove();
        res.json({ msg: 'Department deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});



departmentRoute.get('/departments/getall', async (req, res) => {
    try {
        const records = await Departmenttable.find();
        if (records) {
            return res.status(200).json(records);
        }
        else {
            return res.status(400).json({ message: "record not found" });
        }

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
departmentRoute.put('/departments/:id', middleware, async (req, res) => {

    try {
        const { departmentname } = req.body
        console.log("deparmentname", departmentname)
        // res.send({ "message department value": departmentname ,"id":req.params.id})

        const _id = req.params.id
        const updater = await Departmenttable.findByIdAndUpdate({ _id }, {
            $set: {
                departmentname: departmentname
            }
        },
            {
                new: true,
            })
        if (updater) { return res.status(200).json({ message: "dataupdated", data: updater }) }

    }
    catch (error) {

        return res.status("404").json({ error: error.message })
    }

})





module.exports = departmentRoute 