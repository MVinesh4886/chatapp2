const Group = require("../model/Group");
const GroupMember = require("../model/GroupMember");

// Controller to create a new group
const createGroup = async (req, res) => {
  try {
    const { GroupName } = req.body;

    const userId = req.user.id;

    // We Create the group with a GroupName;
    const group = await Group.create({ GroupName, userId });

    // Add the group creator as a group member
    await GroupMember.create({ GroupId: group.id, userId, isAdmin: true });

    res.status(201).json({
      message: "Group created successfully",
      msg: "You are the creator of the group",
      // group,
      GroupId: group.id,
      GroupName: group.GroupName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getCreatedGroup = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all groups
    const groups = await Group.findAll();

    // Filter groups based on user's association
    const userGroups = await Promise.all(
      groups.map(async (group) => {
        const isMember = await GroupMember.findOne({
          where: { groupId: group.id, userId },
        });
        if (isMember) {
          return {
            GroupName: group.GroupName,
            GroupId: group.id,
          };
        }
      })
    );

    // Remove undefined values from the array
    const filteredGroups = userGroups.filter((group) => group);

    res.status(200).json({
      message: "Groups fetched successfully",
      groups: filteredGroups,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createGroup, getCreatedGroup };
