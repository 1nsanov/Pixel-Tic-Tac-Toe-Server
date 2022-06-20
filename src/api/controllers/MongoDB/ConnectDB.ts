import mongoose from "mongoose";

export class ConnectDB {
  conectionDB() {
    const mongoDb = 'mongodb+srv://1nsanovAdmin:Admin1nsanov@cluster-pixelcheckers.bh4xj.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(mongoDb).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => { console.log("Error: ", err); });
  }
}
