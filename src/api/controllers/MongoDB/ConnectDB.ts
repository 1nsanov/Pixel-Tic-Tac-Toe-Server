import mongoose from "mongoose";

export class ConnectDB {
  public static IsConnectDB: boolean = false;

  public static async conectionDB() {
    const mongoDb = 'mongodb+srv://1nsanovAdmin:Admin1nsanov@cluster-pixelcheckers.bh4xj.mongodb.net/?retryWrites=true&w=majority'
    await mongoose.connect(mongoDb).then(() => {
      this.IsConnectDB = true;
      console.log("Connected to MongoDB", this.IsConnectDB);
    }).catch((err) => { console.log("Error: ", err); });
  }
}
