import ConnectionRequestModel from "../models/connectionRequest.js";
import UserModel from "../models/user.js";
export const sendConnection = async (req, res) => {
  try {
    const { status, toUserId } = req.params;
    const fromUserId = req.user._id;

    // Check if the status is valid
    const validStatuses = ["interested", "ignored"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    // Check if the user is trying to connect with themselves
    if (fromUserId.equals(toUserId)) {
      return res
        .status(400)
        .json({ message: "You cannot connect with yourself." });
    }

    // Find the user to whom the connection request is being sent
    const toUser = await UserModel.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found." });
    }

    const existingRequest = await ConnectionRequestModel.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "Connection request already exists." });
    }
    // Create a new connection request
    const connectionRequest = await ConnectionRequestModel.create({
      fromUserId,
      toUserId,
      status,
    });

    res.status(201).json({
      message: "Connection request sent successfully.",
      connectionRequest,
    });
  } catch (error) {
    console.error("Error in sendConnection:", error);
    res.status(500).json({ message: error.message });
  }
};
