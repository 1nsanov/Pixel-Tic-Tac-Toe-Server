"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose_1 = require("mongoose");
class ConnectDB {
    static async conectionDB() {
        const mongoDb = 'mongodb+srv://1nsanovAdmin:Admin1nsanov@cluster-pixelcheckers.bh4xj.mongodb.net/?retryWrites=true&w=majority';
        await mongoose_1.default.connect(mongoDb).then(() => {
            this.IsConnectDB = true;
            console.log("Connected to MongoDB", this.IsConnectDB);
        }).catch((err) => { console.log("Error: ", err); });
    }
}
exports.ConnectDB = ConnectDB;
ConnectDB.IsConnectDB = false;
