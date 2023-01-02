const User = require("../models/User.model");
const RecentChat = require("../models/RecentChat.model");
const Message = require("../models/Message.model");
const uploadFile = require("../helpers/uploadFile");
const moment = require("moment");
const socketValidator = require("../validators/socketValidator");
const axios = require("axios");

module.exports = async (inputData) => {
  try {
    const result = await socketValidator.sendMessage.validateAsync(inputData);

    const creationDate = moment().unix();

    const messageData = {
      message: result.message,
      senderId: result.senderId,
      receiverId: result.receiverId,
      senderUsername: result.senderUsername,
      status: result.status,
      type: result.type,
      creationDate,
    };

    if (result.type === "location") {
      messageData.latitude = result.latitude;
      messageData.longitude = result.longitude;
    }
    if (result.type === "image") {
      const data = Buffer.from(result.picture, "binary");
      const file = { data, name: "image.png", type: "image/png" };
      const url = await uploadFile(file, "messageblobs");
      messageData.picture = url;
    }
    if (result.type === "video") {
      const data = Buffer.from(result.video, "binary");
      const file = { data, name: "video.mp4", type: "video/mp4" };
      const url = await uploadFile(file, "messageblobs");
      messageData.video = url;
    }
    if (result.type === "audio") {
      const data = Buffer.from(result.audio, "binary");
      const file = { data, name: "audio.mp3", type: "audio/mp3" };
      const url = await uploadFile(file, "messageblobs");
      messageData.audio = url;
    }

    const newMessage = new Message(messageData);
    await newMessage.save();

    const senderRecent = await RecentChat.findOneAndUpdate(
      { userId: result.senderId, withUserId: result.receiverId },
      {
        chatImageUrl: result.receiverImageUrl,
        lastMessage: result.message,
        members: [result.senderId, result.receiverId],
        type: result.type,
        userId: result.senderId,
        withUserId: result.receiverId,
        withUsername: result.receiverUsername,
        creationDate,
      },
      { upsert: true, new: true }
    );
    const receiverRecent = await RecentChat.findOneAndUpdate(
      { userId: result.receiverId, withUserId: result.senderId },
      {
        chatImageUrl: result.senderImageUrl,
        $inc: { counter: 1 },
        lastMessage: result.message,
        members: [result.senderId, result.receiverId],
        type: result.type,
        userId: result.receiverId,
        withUserId: result.senderId,
        withUsername: result.senderUsername,
        creationDate,
      },
      { upsert: true, new: true }
    );
    const receiver = await User.findOne(
      { _id: messageData.receiverId },
      { fcmToken: 1 }
    );
    if (receiver.fcmToken) {
      await axios.post(
        "https://fcm.googleapis.com/fcm/send",
        {
          to: receiver.fcmToken,
          notification: {
            title: `${messageData.senderUsername} sent a message`,
            body: messageData.message,
            click_action: "MESSAGE",
          },
          data: {
            userId: result.senderId,
            profileImageUrl: result.senderImageUrl,
            username: result.senderUsername,
          },
        },
        { headers: { authorization: `Bearer ${process.env.FCM_SERVER_KEY}` } }
      );
    }

    return {
      senderId: result.senderId,
      receiverId: result.receiverId,
      senderRecent,
      receiverRecent,
      newMessage,
      error: false,
    };
  } catch (error) {
    if (error.isJoi) error.status = 422;
    return { error };
  }
};
