const Notification = require("../models/Notification.model");
const User = require("../models/User.model");
const axios = require("axios");

module.exports = async (data) => {
  try {
    const { sender, post, receiverId, type } = data;
    const notificationData = {
      type,
      senderId: sender._id.toString(),
      receiverId: type === 3 ? receiverId.toString() : post.userId.toString(),
      senderUsername: sender.username,
      profileImageUrl: sender.profileImageUrl,
      title:
        type === 1
          ? "Post Like"
          : type === 2
          ? "Comment"
          : type === 3
          ? "Follow"
          : "",
      description:
        type === 1
          ? `${sender.username} liked your post`
          : type === 2
          ? `${sender.username} commented on your post`
          : type === 3
          ? `${sender.username} started following you`
          : "",
    };
    if (type !== 3) {
      notificationData.postId = post._id.toString();
    }
    if (type !== 3 && post.textBackImage) {
      notificationData.postImageUrl = post.textBackImage;
    }
    if (type !== 3 && post.blob.length) {
      notificationData.postImageUrl = post.blob[0].url;
    }
    if (type !== 3 && post.groupId) {
      notificationData.groupId = post.groupId;
    }
    if (type !== 3 && post.groupName) {
      notificationData.groupName = post.groupName;
    }
    if (type !== 3 && post.groupImageUrl) {
      notificationData.groupImageUrl = post.groupImageUrl;
    }
    if (notificationData.senderId === notificationData.receiverId) return false;
    const receiver = await User.findOne(
      { _id: notificationData.receiverId },
      { fcmToken: 1 }
    );
    if (!receiver.fcmToken) return false;
    await axios.post(
      "https://fcm.googleapis.com/fcm/send",
      {
        to: receiver.fcmToken,
        notification: {
          title: notificationData.title,
          body: notificationData.description,
        },
      },
      { headers: { authorization: `Bearer ${process.env.FCM_SERVER_KEY}` } }
    );
    const notification = new Notification(notificationData);
    return await notification.save();
  } catch (error) {
    return false;
  }
};
