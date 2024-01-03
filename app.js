const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./config/database");
const path = require("path");
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

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.json());

app.use(
  cors({
    origin: "http://54.196.136.82",
    // methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use("/user", userRoute);
app.use("/api", chatRoute);
app.use("/api", groupRoute);
app.use("/api", groupMemberRoute);

app.use((req, res) => {
  console.log(__dirname, req.url);
  res.sendFile(path.join(__dirname, `public/${req.url}`));
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // console.log(socket);
  console.log("Id of the socket: ", socket.id);
});

const PORT = process.env.PORT;

db.sync()
  .then((result) => {
    // console.log(result);
    console.log("Database and tables created!");
  })
  .catch((err) => {
    console.log(err);
  });

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
//npm i socket.io-client
