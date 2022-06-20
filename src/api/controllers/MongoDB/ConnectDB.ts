import mongoose from "mongoose";

export class ConnectDB {
  conectionDB() {
    const mongoDb = 'mongodb+srv://1nsanovDB1:1nsanovDB1123@cluster1.njwgl.mongodb.net/?retryWrites=true&w=majority'
    mongoose.connect(mongoDb).then(() => {
      console.log("Connected to MongoDB");
    }).catch((err) => { console.log("Error: ", err); });
  }
}
