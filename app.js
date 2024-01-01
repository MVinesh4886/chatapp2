const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const db = require("./config/database");
const User = require("../chatapp2/model/User.js");
const Messages = require("../chatapp2/model/Chat.js");
const Group = require("../chatapp2/model/Group.js");
const GroupMember = require("../chatapp2/model/GroupMember.js");
const userRoute = require("../chatapp2/route/userRoute.js");
const chatRoute = require("../chatapp2/route/chatRoute.js");
const groupRoute = require("../chatapp2/route/GroupRoute.js");
const groupMemberRoute = require("../chatapp2/route/groupMemberRoute.js");

User.hasMany(Group); //a User can have multiple groups.
Group.belongsTo(User); //a group belongs to a single user.

Group.hasMany(GroupMember); //a group can have multiple group members.
GroupMember.belongsTo(User); //a group member belongs to a single user.

User.hasMany(Messages); //a user can have multiple messages.
Messages.belongsTo(Group); //messages belongs to a single group.

User.belongsToMany(Group, { through: "GroupMember" }); //a user can belong to multiple groups, and a group can have multiple users.
Group.belongsToMany(User, { through: "GroupMember" }); //a group can belong to multiple users, and a users can have multiple groups.

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    // methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use("/user", userRoute);
app.use("/api", chatRoute);
app.use("/api", groupRoute);
app.use("/api", groupMemberRoute);

const PORT = process.env.PORT;

db.sync()
  .then((result) => {
    // console.log(result);
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
