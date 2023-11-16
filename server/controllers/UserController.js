import UserModel from "../models/userModel.js";
import RequestModel from "../models/requestModel.js";
import Note from "../models/departmentModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
// Get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;
   

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get all users
export const getAllUsers = async (req, res) => {

  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc
      return otherDetails
    })
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// udpate a user

export const updateUser = async (req, res) => {
  const id = req.params.id;
  // console.log("Data Received", req.body)
  const { _id, currentUserAdmin, password } = req.body;

  if (id === _id) {
    try {
      // if we also have to update password then password will be bcrypted again
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      // have to change this
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { email: user.email, id: user._id },
        "JWTKEY",
        { expiresIn: "1h" }
      );
      console.log({ user, token })
      res.status(200).json({ user, token });
    } catch (error) {
      console.log("Error agya hy")
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json("Access Denied! You can update only your own Account.");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdmin } = req.body;

  if (currentUserId == id || currentUserAdmin) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Successfully!");
    } catch (error) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Access Denied!");
  }
};

// Follow a User
// changed
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  const requests = await RequestModel.find({requestStatus:"approve"});
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        if(requests){
          await RequestModel.deleteMany({requestStatus:"approve"});
        }
        
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }
};

// Unfollow a User
// changed
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden")
  }
  else {
    try {
      const unFollowUser = await UserModel.findById(id)
      const unFollowingUser = await UserModel.findById(_id)


      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } })
        await unFollowingUser.updateOne({ $pull: { following: id } })
        res.status(200).json("Unfollowed Successfully!")
      }
      else {
        res.status(403).json("You are not following this User")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
};


//following user
export const followingUser = async (req, res) => {
  const id = req.params.id;
  let result = [];
  try {
    const User = await UserModel.findById(id)
    for (const obj of User.followers) {
      const followingUsers = await UserModel.findById(obj)
      result.push(followingUsers)
    }
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json(error)
  }
};


// friendsuggestion
export const friendsuggestion = async (req, res) => {
  const id = req.params.id;
  let result = [];
  try {
    const User = await UserModel.findById(id)
    for (const obj of User.following) {
      const followingUsers = await UserModel.findById(obj)
      for (const ob of followingUsers.followers) {
        const followingUsers1 = await UserModel.findById(ob)
        let str = JSON.stringify(followingUsers1._id)
        str = str.replace(/^"|"$/g, '');
        if (req.params.id !== str) {
          result.push(followingUsers1)
        }
      }
    }
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json(error)
  }
};


//department

export const create = async (req, res) => {
  // Validate request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Create a Note
  const note = new Note({
    title: req.body.title || "Untitled Note",
    content: req.body.content
  });

  // Save Note in the database
  note.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note."
      });
    });
};


///////////
export const friendrequest = async (req, res) => {
  // Validate request
  if (!req.body.requestedId) {
    return res.status(400).send({
      message: "RequestedId can not be empty"
    });
  }
  const User = await RequestModel.findOne({ senderId: req.body.senderId });

  if (User && User.requestedId == req.body.requestedId && User.senderId == req.body.senderId && User.requestStatus == "pending") {
    return res.status(400).send({
      message: "Already Request send"
    });
  }
  //  console.log("user",User)
  //  if(User && User.requestedId == req.body.requestedId && User.senderId == req.body.senderId && User.requestStatus == "approve"){
  //    User.requestStatus = "pending";
  //    User.save()
  //    return res.status(200).send({
  //     message: "Done" 
  //   });
  //  }
  if (User == null) {
    // Create a Note
    const Request = new RequestModel({
      requestedName: req.body.requestedName,
      requestStatus: req.body.requestStatus,
      requestedId: req.body.requestedId,
      senderId: req.body.senderId,
      senderName: req.body.senderName,
      senderPic: req.body.senderPic,
    });
    Request.save()
      .then(data => {
        res.send(data);
      }).catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Note."
        });
      });
  }
};
///////////

export const getfindAll = async (req, res) => {
  Note.find()
    .then(notes => {
      res.send(notes);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};


export const getfriendrequest = async (req, res) => {
  let result = [];

  try {
    const User = await RequestModel.find({ requestedId: req.params.id })
    console.log("my user", req.params.id);
    for (const User1 of User) {
      if (User1.requestStatus === "pending") {
        result.push(User1)
      }
    }
    res.status(200).json(result)

  } catch (error) {
    res.status(500).json(error)
  }

};

export const update = async (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: "Note content can not be empty"
    });
  }

  // Find note and update it with the request body
  Note.findByIdAndUpdate(req.params.noteId, {
    title: req.body.title || "Untitled Note",
    content: req.body.content
  }, { new: true })
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send(note);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.noteId
      });
    });
};


export const responsefriendrequest = async (req, res) => {
  const User = await RequestModel.findOne({ requestedId: req.params.id, senderId: req.body.senderId })
  console.log("hey user", User)
  if (User && User.requestStatus) {
    User.requestStatus = "approve";
    User.save()
    return res.status(200).send({
      message: "Done"
    });
  }
  if (User == null) {
    return res.status(500).send({
      message: "Not found"
    });
  }
};

export const responsefriendrequests = async (req, res) => {
  const User = await RequestModel.findOne({ requestedId: req.params.id, senderId: req.body.senderId })
  if (User && User.requestStatus) {
    return res.status(200).json(User)
  }
  if (User == null) {
    return res.status(200).send({
      message: "Not found"
    });
  }
};

export const deletedepartment = async (req, res) => {
  Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      res.send({ message: "Note deleted successfully!" });
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Note not found with id " + req.params.noteId
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.noteId
      });
    });
};
