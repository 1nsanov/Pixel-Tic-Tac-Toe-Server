"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose_1 = require("mongoose");
class ConnectDB {
    conectionDB() {
        const mongoDb = 'mongodb+srv://1nsanovAdmin:Admin1nsanov@cluster-pixelcheckers.bh4xj.mongodb.net/?retryWrites=true&w=majority';
        mongoose_1.default.connect(mongoDb).then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => { console.log("Error: ", err); });
    }
}
exports.ConnectDB = ConnectDB;
