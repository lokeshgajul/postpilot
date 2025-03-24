import mongoose from "mongoose";

export const DbConnect = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://Lokesh:gXBa0GczgbZDlQz5@postpilotcluster.e6tsl.mongodb.net/PostPilot?retryWrites=true&w=majority&appName=PostPilotCluster"
    );

    console.log("Db Connected Successfully.. ");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnect;
