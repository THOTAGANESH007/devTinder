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

export const reviewConnection = async (req, res) => {
  try {
    const { status, requestId } = req.params;
    const userId = req.user._id;
    console.log(status, requestId, userId);
    // Check if the status is valid
    const validStatuses = ["accepted", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    // Find the connection request
    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: userId,
      status: "interested",
    });
    console.log(connectionRequest);
    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found." });
    }

    //  Check if the user is authorized to review this request
    // if (!connectionRequest.toUserId.equals(userId)) {
    //   return res
    //     .status(403)
    //     .json({ message: "You are not authorized to review this request." });
    // }

    // Update the status of the connection request
    connectionRequest.status = status;
    await connectionRequest.save();

    res.status(200).json({
      message: `Connection request ${status} successfully.`,
      connectionRequest,
    });
  } catch (error) {
    console.error("Error in reviewConnection:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getConnectionRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    // Find all connection requests received by the user
    const connectionRequests = await ConnectionRequestModel.find({
      toUserId: userId,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName skills photoUrl age gender about"
    );
    const data = connectionRequests.map((request) => {
      if (request.fromUserId) {
        return request.fromUserId;
      }
      return null;
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getConnectionRequests:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAcceptedConnectionRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    // Find all connection requests sent by the user
    const sentConnectionRequests = await ConnectionRequestModel.find({
      $or: [{ fromUserId: userId }, { toUserId: userId }],
      status: "accepted",
    })
      .populate(
        "toUserId",
        "firstName lastName skills photoUrl age gender about"
      )
      .populate(
        "fromUserId",
        "firstName lastName skills photoUrl age gender about"
      );
    const data = sentConnectionRequests.map((request) => {
      if (request.fromUserId && request.toUserId) {
        return {
          fromUser: request.fromUserId,
          toUser: request.toUserId,
        };
      }
      return null;
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getSentConnectionRequests:", error);
    res.status(500).json({ message: error.message });
  }
};
